const express = require("express");
const router = express.Router();
const Product = require("./models/product");
const Sequelize = require("sequelize");
const constants = require("./constant");
const formidable = require("formidable");
const path = require("path");
const fs = require("fs-extra");
const Op = Sequelize.Op;

// Upload Image
uploadImage = async (files, doc) => {
  // if (files.image != null) {
  //   var fileExtention = files.image.name.split(".")[1];
  //   doc.image = `${doc.id}.${fileExtention}`;
  //   var newpath =
  //     path.resolve(__dirname + "/uploaded/images/") + "/" + doc.image;
  //   if (fs.exists(newpath)) {
  //     await fs.remove(newpath);
  //   }
  //   await fs.moveSync(files.image.path, newpath);

  //   // Update database
  //   let result = Product.update(
  //     { image: doc.image },
  //     { where: { id: doc.id } }
  //   );
  //   return result;
  console.log("object")
  }
 

// Get Products
router.get("/product", async (req, res) => {
  let result = await Product.findAll({  });
  res.json(result);
});

// Add Product
router.post("/product", async (req, res) => {

  try {
    const form = new formidable.IncomingForm();
    form.parse(req, async (error, fields, files) => {
      let result = await Product.create(fields);
      result = await uploadImage(files, result);
      res.json({
        result: constants.kResultOk,
        message: JSON.stringify(result)
      });
    });
  } catch (error) {
    res.json({ result: constants.kResultNok, message: JSON.stringify(error) });
  }
});

// Update Product
router.put("/product", async (req, res) => {
  try {
    var form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
      let result = await Product.update(fields, { where: { id: fields.id } });
      result = await uploadImage(files, fields);

      res.json({
        result: constants.kResultOk,
        message: JSON.stringify(result)
      });
    });
  } catch (err) {
    res.json({ result: constants.kResultNok, message: JSON.stringify(err) });
  }
});

// Delete Product
router.delete("/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let result = await Product.findOne({ where: { id: id } });
    await fs.remove(
      path.resolve(__dirname + "/uploaded/images/") + "/" + result.image
    );
    result = await Product.destroy({ where: { id: id } });
    res.json({ result: constants.kResultOk, message: JSON.stringify(result) });
  } catch (error) {
    res.json({ result: constants.kResultNok, message: "Internal error" });
  }
});

// Get Product by Id
router.get("/product/:id", async (req, res)=>{
  let result = await Product.findOne({where:{id: req.params.id}})
  if (result){
    res.json(result);
  }else{
    res.json({});
  }  
})


// Get Products by Keyword
router.get("/product/keyword/:keyword", async (req, res) => {
  const { keyword } = req.params;
  let result = await Product.findAll({ where: { name: {[Op.like]: `%${keyword}%`} } });
  res.json(result);
});

module.exports = router;
