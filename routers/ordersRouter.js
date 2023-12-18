const express = require("express");
const router = express.Router();

const {
  createOrder,
  getOrder
} = require("../controllers/orderController.js");

//http://localhost:4000/api/products/


router.post("/", createOrder);
router.get("/", getOrder);
//id -> category
module.exports = router;
