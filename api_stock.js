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
    var fileExtention = files.image.name.split(".")[1];
    doc.image = `${doc._id}.${fileExtention}`;
    console.log(JSON.stringify( doc.image))
    var newpath =path.resolve(__dirname + "/uploaded/images/") + "/" + doc.image;
    if (fs.exists(newpath)) {
      await fs.remove(newpath);
    }
    await fs.moveSync(files.image.path, newpath);

    const result = await Product.updateOne(
      { _id: doc._id },
      { image: doc.image },
      { new: true }
    );
     return result;
  }
 

// Get Products
router.get("/product", async (req, res) => {
  let result = await Product.find({  });
  res.json(result);
});

// Add Product
router.post("/product", async (req, res) => {

  try {
    const form = new formidable.IncomingForm();
    form.parse(req, async (error, fields, files) => {
      let result = await Product.create(fields);
      // console.log(JSON.stringify(result))
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
router.put("/", async (req, res) => {
  // try {
    var form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
      // let result = await Product.update(fields, { where: { id: fields.id } });
console.log(fields._id)
console.log(fields.price)
console.log(fields.name)
console.log(JSON.stringify(fields))
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

      // result = await uploadImage(files, fields);

      res.json({
        result: constants.kResultOk,
        message: JSON.stringify(result)
      });
    });
  // } catch (err) {
  //   res.json({ result: constants.kResultNok, message: JSON.stringify(err) });
  // }
});

// Delete Product
router.delete("/product/:id", async (req, res) => {
  const { id } = req.params;
    console.log(id)
  try {
    let result = await Product.find({  _id: id  });
    console.log(result[0].image)
    const p =path.resolve(__dirname + "/uploaded/images/") + "/" + result[0].image
  
    await fs.remove(
      path.resolve(__dirname + "/uploaded/images/") + "/" + result[0].image
    );
    result = await Product.deleteOne({ _id:id });
    res.json({ result: constants.kResultOk, message: JSON.stringify(result) });
  } catch (error) {
    res.json({ result: constants.kResultNok, message: "Internal error" });
  }
});

// Get Product by Id
router.get("/product/:id", async (req, res)=>{
  let result = await Product.findOne({_id: req.params.id})
  if (result){
    res.json(result);
  }else{
    res.json({});
  }  
})


// Get Products by Keyword
router.get("/product/keyword/:keyword", async (req, res) => {
  const { keyword } = req.params;
  console.log(keyword)

  const result = await Product.find({ name: { $regex: new RegExp(keyword, 'i') } });
  res.json(result);
});

module.exports = router;
