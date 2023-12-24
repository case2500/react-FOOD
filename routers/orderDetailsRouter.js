const express = require("express");
const router = express.Router();

const {
  createOrderDetail,
  getOrderDetail,
  getSingleOrderDetail,
  removeOrderDetail,
  removeOrderDetailProduct
} = require("../controllers/orderDetailController.js");
const { remove } = require("fs-extra");

//http://localhost:4000/api/order/


router.post("/:id", createOrderDetail);
router.get("/:id",getSingleOrderDetail)
router.get("/", getOrderDetail);
router.delete("/:id",removeOrderDetail)
router.delete("/product/:id",removeOrderDetailProduct)
//id -> category
module.exports = router;
