// Create Prouct
const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const constants = require("../constant.js");
const formidable = require("formidable");
const path = require("path");
const fs = require("fs-extra");
const uploadImage = require("../uploadImage.js");
const removeimage = require("../removeimage.js");

const removeProduct = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  // removeimage(id)
  // result = await Product.deleteOne({ _id:id });
  // result = await Product.deleteOne({ _id:id });
  // res.json({ result: constants.kResultOk, message: JSON.stringify(result) });
  try {
    let result = await Product.find({ _id: id });
    // console.log(result[0].image);
    const pa = path.resolve(__dirname + "/uploads") + "/" + result[0].image;

    const removePath = pa.replaceAll("\\controllers", "");

    console.log(removePath);
    await fs.remove(path.resolve(removePath));
    result = await Product.deleteOne({ _id: id });
    res.json({ result: constants.kResultOk, message: JSON.stringify(result) });
  } catch (error) {
    res.json({ result: constants.kResultNok, message: "Internal error" });
  }
};


const createProduct = async (req, res) => {
  try {
    const form = new formidable.IncomingForm();
    form.parse(req, async (error, fields, files) => {
      console.log(files);
      let result = await Product.create(fields);
      console.log(JSON.stringify(result));
      result = await uploadImage(files, result);
      res.json({
        result: constants.kResultOk,
        message: JSON.stringify(result),
      });
    });
  } catch (error) {
    res.json({ result: constants.kResultNok, message: JSON.stringify(error) });
  }
};
// Get all Products
const getProduct = async (req, res) => {
  const { id } = req.params;
  // console.log("para" + req.params);
  const products = await Product.find({ _id: id }).sort("-createdAt");
  res.status(200).json(products);
};

const updateProduct = async (req, res) => {
  try {
    var form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
      // let result = await Product.update(fields, { where: { id: fields.id } });
      // console.log(fields._id);
      const products = await Product.find({ _id: fields._id });

      // console.log(" products.image=" + products[0].image);
      const oldImage = products[0].image;
      let result = await Product.updateMany(
        { _id: fields._id },
        {
          price: fields.price,
          name: fields.name,
          stock: fields.stock,
          brand: fields.brand,
          category:fields.category,
          description: fields.description,
          supplier_id: fields.supplier_id,
          status: fields.status,
          image: oldImage,
          totalSold:0
        },
        { new: true }
      );
      if (files.image) {
        result = await uploadImage(files, fields);
      } else {
        console.log("no image file upload");
      }
      res.json({
        result: constants.kResultOk,
        message: JSON.stringify(result),
      });
    });
  } catch (err) {
    res.json({ result: constants.kResultNok, message: JSON.stringify(err) });
  }
};

// Get all Products
const getProducts = async (req, res) => {
  // console.log("object");
  const products = await Product.find().sort("-createdAt");
  res.status(200).json(products);
};
module.exports = {
  getProducts,
  createProduct,
  getProduct,
  updateProduct,
  removeProduct,
};
