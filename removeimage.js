// Create Prouct
const express = require("express");
const router = express.Router();
const Product = require("./models/product.js");
const constants = require("./constant.js");
const formidable = require("formidable");
const path = require("path");
const fs = require("fs-extra");

// Upload Image
const removeimage = async (id) => {
  // const { id } = req.params;
  console.log(id)
 try {
  let result = await Product.find({  _id: id  });
  console.log(result[0].image)
  const p =path.resolve(__dirname + "/uploads") + "/" + result[0].image
  console.log(p)

  const ss =  p.replaceAll("uploads","");
  console.log(ss)
  await fs.remove(
    path.resolve(__dirname + "/uploads") + "/" + result[0].image
  );
  result = await Product.deleteOne({ _id:id });
console.log("success")
//  res.json({  message: JSON.stringify(result) });
} catch (error) {
  console.log("serror")
}
};

module.exports = removeimage;
