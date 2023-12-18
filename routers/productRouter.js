const express = require("express");
const router = express.Router();

const {
  getProducts,
  createProduct,
  getProduct,
  updateProduct,
  removeProduct
  // getProductCategory,
  // getProductSearch
} = require("../controllers/productController");

//http://localhost:4000/api/products/

router.get("/", getProducts);
router.get("/product/:id", getProduct);
router.post("/", createProduct);
router.put("/", updateProduct);
router.delete("/:id",  removeProduct);
//id -> category
module.exports = router;
