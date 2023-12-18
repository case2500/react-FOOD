// Create Prouct
const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const constants = require("../constant.js");
const formidable = require("formidable");
const path = require("path");
const fs = require("fs-extra");
const uploadImage = require("../uploadImage.js");
const removeimage = require("../removeimage.js")

const removeProduct= async (req, res) => {
  const { id } = req.params;
  console.log(id)
  removeimage(id)
  // result = await Product.deleteOne({ _id:id });
  // result = await Product.deleteOne({ _id:id });
  // res.json({ result: constants.kResultOk, message: JSON.stringify(result) });
// try {
//   let result = await Product.find({  _id: id  });
//   console.log(result[0].image)
//   const p =path.resolve(__dirname + "/uploads") + "/" + result[0].image
//   console.log(p)
//   await fs.remove(
//     path.resolve(__dirname + "/uploads") + "/" + result[0].image
//   );
//   // result = await Product.deleteOne({ _id:id });
//   // res.json({ result: constants.kResultOk, message: JSON.stringify(result) });
// } catch (error) {
//   res.json({ result: constants.kResultNok, message: "Internal error" });
// }
  // try {
  //   console.log(req.params.id)
  //   const id = req.params.id;
  //   const product = await Product.findOneAndDelete({ _id: id });
  //   res.send(product);
  // } catch (err) {
  //   console.log(err);
  //   res.status(500).send("Server Error!");
  // }
};

// Delete Product
// router.deletes("/product/:id", async (req, res) => {
//   const { id } = req.params;
//     console.log(id)
//   try {
//     let result = await Product.find({  _id: id  });
//     console.log(result[0].image)
//     const p =path.resolve(__dirname + "/uploaded/images/") + "/" + result[0].image
  
//     await fs.remove(
//       path.resolve(__dirname + "/uploaded/images/") + "/" + result[0].image
//     );
//     result = await Product.deleteOne({ _id:id });
//     res.json({ result: constants.kResultOk, message: JSON.stringify(result) });
//   } catch (error) {
//     res.json({ result: constants.kResultNok, message: "Internal error" });
//   }
// });



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
  console.log("patch");
  // try {
    var form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
      // let result = await Product.update(fields, { where: { id: fields.id } });

      let result = await Product.updateOne(
        { _id: fields._id  },
        { name:fields.name  },
        { image:fields.image  },
        { stock:fields.stock  },
        { brand:fields.brand  },
        { description:fields.description  },
        { supplier_id:fields.supplier_id  },
        { status:fields.status  },
        { image:fields.image  },
        { new: true }
      );

      result = await uploadImage(files, fields);

      res.json({
        result: constants.kResultOk,
        message: JSON.stringify(result)
      });
    });
  // } catch (err) {
  //   res.json({ result: constants.kResultNok, message: JSON.stringify(err) });
  // }
};
// Update Product
// router.put("/product", async (req, res) => {
//   try {
//     var form = new formidable.IncomingForm();
//     form.parse(req, async (err, fields, files) => {
//       // let result = await Product.update(fields, { where: { id: fields.id } });

//       let result = await Product.updateOne(
//         { _id: fields._id  },
//         { name:fields.name  },
//         { namimage:fields.image  },
//         { price:fields.price  },
//         { new: true }
//       );

//       result = await uploadImage(files, fields);

//       res.json({
//         result: constants.kResultOk,
//         message: JSON.stringify(result)
//       });
//     });
//   } catch (err) {
//     res.json({ result: constants.kResultNok, message: JSON.stringify(err) });
//   }
// });

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
  removeProduct
};
