// Create Prouct
const express = require("express");
const router = express.Router();
const Order = require("../models/order");
const constants = require("../constant.js");
const formidable = require("formidable");
const Product = require("../models/product");

const createOrder = async (req, res) => {
  //   console.log(req.body);
  const { newOrder, subtotal } = req.body;
  const orders = newOrder.map((news) => ({
    _id: news._id,
    name: news.name,
    price: news.price,
    quantity: news.quantity,
    toppings: news.toppings,
  }));
 console.log(JSON.stringify(newOrder) );

 const  orderItems =[
  {
    "_id": "65781eba32113d5b10efb353",
    "name": "case",
    "quantity":2
  }]

 //Update the product qty
 const products = await Product.find({ _id: { $in: orders } });

 orders?.map(async (order) => {
   const product = products?.find((product) => {
     return product?._id?.toString() === order?._id?.toString();
   });
   if (product) {
    product.totalSold += Number(order.quantity);
    console.log(JSON.stringify(product))
    console.log("product="+product.totalSold)
   }
   await product.save();
 });
  //Place/create order - save into DB
  const order = await Order.create({
    orderItems: orders,
    totalPrice: subtotal,
  });

  res.json({
    result: order,
  });
};

const getOrder = async (req, res) => {
  const orders = await Order.find().sort("-createdAt").select({ "orderItems": 1, "_id": 0});
  console.log(JSON.stringify(orders));
  if (orders != null) {
    var arr = [];
    orders.forEach(function (p) {
      console.log(p.orderItems);
      const  p_id = p.orderItems.map(pp =>(
        
        (pp._id)
      
        ))
        arr = (p_id)

       const products = Product.find({ _id: p_id});
console.log(JSON.stringify(products))
      // var qty = 0;
      // var con = {
      //   _id: p._id
      // }
      // const orders = Product.find({_id:[p_id]});
      // console.log(JSON.stringify(orders))
      // res.json({
      //   result: orders,
      // });
    })
    
    
  }
};

module.exports = {
  createOrder,
  getOrder,
};
