const express = require("express");
const router = express.Router();

const{
    createOrder,
    getOrders,
    updateOrderStatus,
    getAllOrders
}=require("../controllers/orderController");

router.post("/", createOrder);
router.get("/admin", getAllOrders);
router.get("/", getOrders);
router.put("/:id", updateOrderStatus);

module.exports = router;