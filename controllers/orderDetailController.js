// Create Prouct
const express = require("express");
const router = express.Router();
const OrderDetail = require("../models/orderDetailModel");
const constants = require("../constant.js");
const formidable = require("formidable");
const Product = require("../models/product");
const BillOrder = require("../models/BillOrder");
// {
//     "orderDetail_NO": 1000,
//     "productname": "computer CPU AMD",
//     "price": "1501",
//     "quanlity": "1",
//     "discount": "100",
//     "toppings": ["case","hp"]
// }

//// post  localhost:4000/api/orderDetail/65781e7c32113d5b10efb34f  =>  product_id
const createOrderDetail = async (req, res) => {
  var con = { status: "open" };
  var id = req.params.id;

  const { quanlity, productname, orderDetail_NO, price } = req.body;
  // console.log(req.params.id);
  BillOrder.findOne(con).then(async (findOrder) => {
    if (!findOrder) {
      return res.status(400).send({
        message: "No bill open found",
      });
    } else {
      var conn = {
        billorder_id: findOrder._id,
        product_id: req.params.id,
      };
      // console.log(conn);
 
      try {
        const orderOrderDetails = await OrderDetail.findOne(conn);
             // console.log(JSON.stringify(orderOrderDetails));
      if (orderOrderDetails != null) {
        console.log(
          "not null orderOrderDetails.quanlity=" + orderOrderDetails.quanlity
        );
        const { quanlity } = orderOrderDetails;
        // console.log(quanlity);
        let result = await OrderDetail.updateMany(
          { product_id: id },
          {
            quanlity: quanlity + 1,
            productname: productname,
            orderDetail_NO: orderDetail_NO,
            price: price,
          }
        );
        console.log(result);

        res.json({
          msg: "เพิ่มจำนวน success ",
          result: quanlity
      
        });
      } else {
        console.log(" null add new product");
        const orderdetail = new OrderDetail({
          billorder_id: findOrder._id,
          orderDetail_NO: orderDetail_NO,
          quanlity: quanlity+1,
          product_id: id,
          productname: productname,
          price: price,
        });
        const or = await orderdetail.save();
        res.json({
          msg: "เพิ่มสินค่าใหม่",
          result: quanlity
        });
      }
      } catch (error) {
        res.json({
          result: "ไม่พบ รายการสินค้า",
        });
      }
    }
  });
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
  console.log(req.params.id);
  var con = { status: "open" };
  var id = req.params.id;
  BillOrder.findOne(con).then(async (findOrder) => {
    if (!findOrder) {
      return res.status(400).send({
        message: "No bill open found",
        });
    } else {
      console.log(findOrder._id);
      var conn = {
        billorder_id: findOrder._id,
        product_id: req.params.id,
      };
      console.log(conn)
      OrderDetail.findOne(conn).then(async (order) => {
        if (!order) {
          return res.status(400).send({
            message: "No order found",
          });
        } else {
          await OrderDetail.deleteOne({ product_id: id });
          return res.status(200).send({
            message: "del product order successfully ",
          
          });
        }
      });
    }
  });
};

//http://localhost:4000/api/orderDetail/
const getOrderDetail = async (req, res) => {
  var con = { status: "open" };
  try {
    const orders = await OrderDetail.find(con).sort("-createdAt");
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
  removeOrderDetailProduct,
};
