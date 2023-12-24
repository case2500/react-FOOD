// Create Prouct
const express = require("express");
const router = express.Router();
const BillOrder = require("../models/BillOrder");
const constants = require("../constant.js");
const formidable = require("formidable");
const Product = require("../models/product");

// const orderItems = [
//   {
//     _id: "65781eba32113d5b10efb353",
//     name: "case",
//     quantity: 2,
//   },
// ];

//// post  http://localhost:4000/api/billorder/
const createBillOrder = async (req, res) => {
  const billorder = new BillOrder({
    bill_No: 1002,
    status: "open",
    inputMoney: 0,
    returnMoney: 0,
    reduceMoney: 0,
    totalPrice: 0,
  })
  try {
    console.log("add billOrder");
    await billorder.save();

    res.json({
      msg: "add new billOrder"
    });
  } catch (err) {
    console.log(err);
  }
};
//http://localhost:4000/api/order/6583a2663f545d9626de16b1
const getSingleOrder = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const orders = await Order.find({ _id: id }).sort("-createdAt");
    // .select({ orderItems: 1, _id: 0 });
    if (!orders) {
      return res.status(404).json({ messsage: "orders Not FOund" });
    }
    res.json({
      result: orders,
      msg: "OK",
    });
  } catch (error) {
    return res.status(404).json({ messsage: "orders Not FOund", msg: "NO" });
  }
};

//http://localhost:4000/api/order/6583a2663f545d9626de16b1
const removeOrder = async (req, res) => {
  const id = req.params.id;
  Order.findOne({ _id: id }).then(async (order) => {
    if (!order) {
      return res.status(400).send({
        message: "No order found",
        data: {},
      });
    } else {
      await Order.deleteOne({ _id: id });
      return res.status(200).send({
        message: "order successfully deleted",
        data: {},
      });
    }
  });
};

//http://localhost:4000/api/order/6583a2663f545d9626de16b1
const endBillOrder = async (req, res) => {
  const id = req.params.id;
  BillOrder.findOne({ _id: id }).then(async (billorder) => {
    if (!billorder) {
      return res.status(400).send({
        message: "No order found",
        data: {},
      });
    } else {
      await BillOrder.updateOne(
        { _id: id },
        {status:"close"}
        );
      return res.status(200).send({
        message: "end Order successfully ",
        data: {},
      });
    }
  });
};



//http://localhost:4000/api/order/
const getOrder = async (req, res) => {
  try {
    const orders = await BillOrder.find({}).sort("-createdAt");
    // .select({ orderItems: 1, _id: 0 });
    if (!orders) {
      return res.status(404).json({ messsage: "orders Not FOund" });
    }
    res.json({
      result: orders,
    });
  } catch (error) {
    return res.status(404).json({ messsage: "orders Not FOund", msg: "NO" });
  }

  //  const allorder = orders.map(p =>
  //   p.orderItems.map(pp =>(
  //     console.log(pp.name + pp.quantity + "X" + pp.price)
  //   ))
  //   )

  // console.log(JSON.stringify(orders));
};

module.exports = {
  createBillOrder,
  getOrder,
  getSingleOrder,
  removeOrder,
  endBillOrder
};
