const express=require('express');
const router=express.Router();
const orderController = require("../controllers/orderController");


router.post("/orders/create",orderController.createOrder);

router.post("/orders/update",orderController.updateOrder);

router.get("/orders/list",orderController.listAllOrders);

router.get("/orders/search",orderController.listOrderByOrderId);

router.delete("/orders/delete",orderController.deleteOrder);



module.exports = router;