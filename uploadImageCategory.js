// Create Prouct
const express = require("express");
const router = express.Router();
const Product = require("./models/product.js");
const constants = require("./constant.js");
const formidable = require("formidable");
const path = require("path");
const fs = require("fs-extra");
const Category = require("./models/categoryModel");
// Upload Image
uploadImageCategory = async (files, doc) => {
  // if (files.image != null) {
  var fileExtention = files.image.name.split(".")[1];
  doc.image = `${doc._id}.${fileExtention}`;

  // console.log("doc.image"+JSON.stringify(doc.image));
  var newpath = path.resolve(__dirname + "/uploads") + "/category/" + doc.image;
  console.log(newpath);
  if (fs.exists(newpath)) {
    await fs.remove(newpath);
  }
  await fs.moveSync(files.image.path, newpath);

  const result = await Category.updateOne(
    { _id: doc._id },
    { image: doc.image },
    { new: true }
  );
  return result;
};

module.exports = uploadImageCategory;
