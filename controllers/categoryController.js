const Category = require("../models/categoryModel");
const express = require("express");
const router = express.Router();
const constants = require("../constant.js");
const formidable = require("formidable");
const path = require("path");
const fs = require("fs-extra");

// const removeimage = require("../removeimage.js");
const uploadImageCategory = require("../uploadImageCategory.js");
// Create Prouct
const createCategory = async (req, res) => {
  try {
    const form = new formidable.IncomingForm();
    form.parse(req, async (error, fields, files) => {
      //   console.log(files);
      let result = await Category.create(fields);
      result = await uploadImageCategory(files, result);
      res.json({
        result: constants.kResultOk,
        message: JSON.stringify(result),
      });
    });
  } catch (error) {
    res.json({ result: constants.kResultNok, message: JSON.stringify(error) });
  }
};

// ********************** Get all Products
const getCategorys = async (req, res) => {
  const categorys = await Category.find().sort("-createdAt");
  res.status(200).json(categorys);
};

// Get single product
const getCategory = async (req, res) => {
  const category = await Category.findById(req.params.id);
  // if product doesnt exist
  if (!category) {
    res.status(404);
    console.log("category not found");
  } 
    console.log(category);
    res.status(200).json(category);
  
};

const deleteCategory = async (req, res) => {
  const { id } = req.params;
  // console.log(id);
  try {
    let result = await Category.find({ _id: id });
    const pa =
      path.resolve(__dirname + "/uploads/category") + "/" + result[0].image;
    const removePath = pa.replaceAll("\\controllers", "");
    console.log(removePath);
    await fs.remove(path.resolve(removePath));
    result = await Category.deleteOne({ _id: id });
    res.json({ result: constants.kResultOk, message: JSON.stringify(result) });
  } catch (error) {
    res.json({ result: constants.kResultNok, message: "Internal error" });
  }
};

// ********************** update category
const updateCategory = async (req, res) => {
  try {
    var form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
      const category = await Category.find({ _id: fields._id });
      console.log(fields._id)
      const oldImage = category[0].image;
      let result = await Category.updateMany(
        { _id: fields._id },
        {
          name: fields.name,
          image: oldImage,
        },
        { new: true }
      );
      console.log(JSON.stringify(fields))
      if (files.image) {
        result = await uploadImageCategory(files, fields);
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

module.exports = {
  createCategory,
  getCategorys,
  getCategory,
  deleteCategory,
  updateCategory,
};
