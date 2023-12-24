const express = require("express");
const router = express.Router();

const {
  createBillOrder,
  endBillOrder,
  getOrder,
  getSingleOrder,
  removeOrder
} = require("../controllers/billorderController.js");
const { remove } = require("fs-extra");

//http://localhost:4000/api/order/


router.post("/", createBillOrder);
router.post("/:id", endBillOrder);
router.get("/:id",getSingleOrder)
router.get("/", getOrder);
router.delete("/:id",removeOrder)
//id -> category
module.exports = router;
