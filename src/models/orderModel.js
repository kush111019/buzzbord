const mongoose = require("mongoose");


const orderSchema = new mongoose.Schema(
    {
      order_id:{type:String,required:true,uniqe:true,trim:true},
      item_name:{type:String,required:true,trim:true},
      cost:{type:String,required:true,trim:true},
      order_date:{type:String,required:true},
      delivery_date:{type:String,required:true}

    },
    {timestapms:true}
);

module.exports = mongoose.model("Orders", orderSchema);