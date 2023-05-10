const orderModel=require("../models/orderModel");
const validator = require("../validations/validator");


const createOrder =  async function(req,res){
try{
let data = req.body;

if(!validator.isValidDetails(data)){
return res.status(400).send({status:false,message:"data is missing"});
}

let{order_id,item_name,cost,order_date,delivery_date} = data;


if(!validator.isValidValue(order_id)){
return res.status(400).send({status:false,message:"order_id is not a valid string value"});
}

    
if(!validator.isValidValue(item_name)){
return res.status(400).send({status:false,message:"item_name is not a valid string value"});
}

if(!validator.isValidValue(cost)){
    return res.status(400).send({status:false,message:"cost in not an not a valid string value"});
}

if(!validator.isValidValue(order_date)){
    return res.status(400).send({status:false,message:"cost in not an not a valid string value"});
}

if(!validator.isValidValue(delivery_date)){
    return res.status(400).send({status:false,message:"cost in not an not a valid string value"});
}


let duplicateExists = await orderModel.findOne({order_id : order_id});

if(duplicateExists) return res.status(409).send({status:false,message:"order_id is already exists"});


let newRecord = await orderModel.create(data);

return res.status(201).send({status:true,message:"new order is created successfully",data:newRecord});
}catch(error){
    return res.status(500).send({status:false,message:error.message});
}

}


const updateOrder =async function(req,res){
try{

let data = req.body;

if(!validator.isValidDetails(data)){
return res.status(400).send({status:false,message:"data is missing"});
}

let{order_id,delivery_date} = data;

if(!validator.isValidValue(order_id)){
return res.status(400).send({status:false,message:"order_id is not a valid string value"});
};

let orderIdExists = await orderModel.findOne({order_id : order_id});

if(!orderIdExists) return res.status(400).send({status:false,message:"order_id does not exists"});

if(!validator.isValidValue(delivery_date)){
return res.status(400).send({status:false,message:"delivery_date is not a valid string value"});
}


const updateRecord = await orderModel.findOneAndUpdate(
{order_id:order_id},
{$set:{delivery_date:delivery_date}},
{new:true,upsert:true}
);

return res.status(200).send({status:true,message:"record is updated successfully",data:updateRecord});

}catch(error){
    return res.status(500).send({status:false,message:error.message});
}

}


const listAllOrders = async function(req,res){
try{

let data = req.body;

if(!validator.isValidDetails(data)){
return res.status(400).send({status:false,message:"data is missing"});
}

let date=data.order_date;

let date1=date.split("/");
let year=date1[0];
let month=date1[1];
let dateOfTheMonth=date1[2];

let newDate = year.concat("-").concat(month).concat("-").concat(dateOfTheMonth);

let regEx = /^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;

if(!newDate.match(regEx)) return res.status(400).send({status:false,message:"invalid date format"});



if(!validator.isValidValue(date)){
return res.status(400).send({status:false,message:"date is not a valid string value"});
}

//  here we are considering that we want to get the records according to the //order_date.Thus writing code accordingly as it is not given in the task that// which date we have to consider order_date or delivery_date.



let records = await orderModel.find({order_date:date});

return res.status(200).send({status:true,message:records});

}catch(error){
    return res.status(500).send({status:false,message:error.message});
}

}


const listOrderByOrderId = async function(req,res){

try{
    
let data = req.body;

if(!validator.isValidDetails(data)){
return res.status(400).send({status:false,message:"data is missing"});
}

let orderId = data.order_id;

if(!validator.isValidValue(orderId)){
return res.status(400).send({status:false,message:"order_id is not a valid string value"});
}

let orderIdExists = await orderModel.findOne({order_id:orderId});

if(!orderIdExists){
return res.status(400).send({status:false,message:"order_id does not exist"});
}
else
return res.status(200).send({status:false,message:orderIdExists});

}catch(error){
    return res.status(500).send({status:false,message:error.message});
}

}


const deleteOrder = async function(req,res){

try{

let data = req.body;

if(!validator.isValidDetails(data)){
return res.status(400).send({status:false,message:"data is missing"});
}

    
let orderId = data.order_id;

if(!validator.isValidValue(orderId)){
return res.status(400).send({status:false,message:"order_id is not a valid string value"});
}


let orderIdExists = await orderModel.findOne({order_id:orderId});

if(!orderIdExists) return res.status.send({status:false,message:"order_id does not exist"});

let deleteOrder = await orderModel.deleteOne({order_id:orderId});

return res.status(200).send({status:false,message:"order is deleted successfully",data:deleteOrder});

}catch(error){
    return res.status(500).send({status:false,message:error.message});
}

}

module.exports = {createOrder,updateOrder,listAllOrders,listOrderByOrderId,deleteOrder}


