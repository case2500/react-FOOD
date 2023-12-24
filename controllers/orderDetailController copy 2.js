// Create Prouct
const express = require("express");
const router = express.Router();
const OrderDetail = require("../models/orderDetailModel");
const constants = require("../constant.js");
const formidable = require("formidable");
const Product = require("../models/product");

// {
//     "orderDetail_NO": 1000,
//     "product_id": "6576a31dc5efde1fd1bfe858",
//     "productname": "computer",
//     "price": "2500",
//     "quanlity": "1",
//     "discount": "100",
//     "toppings": ["case","hp"]
// }

//// post  http://localhost:4000/api/orderDetail/
const createOrderDetail = async (req, res) => {
    
  try {
    const orderDetails = {
      orderDetail_NO: req.body.orderDetail_NO,
      product_id: req.body.product_id,
      productname: req.body.productname,
      price: req.body.price,
      quanlity: req.body.quanlity,
      discount: req.body.discount,
      toppings: req.body.toppings,
      // image: req.body.image,
    };

    const products = await Product.find({ _id: req.body.product_id });
    const { totalSold } = products[0];
    console.log("stock products=" + totalSold);
    if (products) {
      products[0].totalSold += Number(req.body.quanlity);
      let result = await Product.updateMany(
        { _id: req.body.product_id },
        {
          totalSold: products[0].totalSold,
        },
        { new: true }
      );
    }
    console.log("new stock products=" + products[0].totalSold);
    const orderDetail = await OrderDetail.create(
      orderDetails
      // totalPrice: subtotal,
    );
    console.log("orderDetails=" + JSON.stringify(orderDetails));
    res.json({
      result: orderDetail,
    });
  } catch (error) {
    res.json({
      msg: "create orderDetail error",
    });
  }
};

//http://localhost:4000/api/OrderDetail/1000
const getSingleOrderDetail = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const orderOrderDetails = await OrderDetail.find({
      orderDetail_NO: id,
    }).sort("-createdAt");
    // .select({ orderItems: 1, _id: 0 });
    if (!orderOrderDetails) {
      return res.status(404).json({ messsage: "orderOrderDetails Not FOund" });
    }
    res.json({
      result: orderOrderDetails,
      msg: "OK",
    });
  } catch (error) {
    return res
      .status(404)
      .json({ messsage: "orderOrderDetails Not FOund", msg: "NO" });
  }
};

//http://localhost:4000/api/order/6583a2663f545d9626de16b1
const removeOrderDetail = async (req, res) => {
  const id = req.params.id;
  OrderDetail.findOne({ _id: id }).then(async (order) => {
    if (!order) {
      return res.status(400).send({
        message: "No order found",
        data: {},
      });
    } else {
      await OrderDetail.deleteOne({ _id: id });
      return res.status(200).send({
        message: "order successfully deleted",
        data: {},
      });
    }
  });
};

//http://localhost:4000/api/orderDetail/product/65856c76d17b24e58a7be382
const removeOrderDetailProduct = async (req, res) => {
//   const id = req.params.id;
console.log(req.params.id)
  var con = { status: "open"};
  var id = (req.params.id);
  OrderDetail.findOne(con).then(async (findOrder) => {
    if (!findOrder) {
      return res.status(400).send({
        message: "No bill open found",
        data: {},
      });
    } else {
        var conn = { _id: id};
      OrderDetail.findOne(conn).then(
        async (order) => {
          if (!order) {
            return res.status(400).send({
              message: "No order found",
              data: {},
            });
          } else {
            await OrderDetail.deleteOne({ _id: id });
            return res.status(200).send({
              message: "order successfully deleted",
              data: {},
            });
          }
        }
      );
    }
  });
};

//http://localhost:4000/api/orderDetail/
const getOrderDetail = async (req, res) => {
  try {
    const orders = await OrderDetail.find({}).sort("-createdAt");
    // .select({ orderItems: 1, _id: 0 });
    if (!orders) {
      return res.status(404).json({ messsage: "orderdetails Not FOund" });
    }
    res.json({
      result: orders,
    });
  } catch (error) {
    return res
      .status(404)
      .json({ messsage: "ordersdetail Not FOund", msg: "NO" });
  }

  //  const allorder = orders.map(p =>
  //   p.orderItems.map(pp =>(
  //     console.log(pp.name + pp.quantity + "X" + pp.price)
  //   ))
  //   )

  // console.log(JSON.stringify(orders));
};

module.exports = {
  createOrderDetail,
  getOrderDetail,
  getSingleOrderDetail,
  removeOrderDetail,
  removeOrderDetailProduct
};
