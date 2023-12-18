const express = require("express");
const router = express.Router();
const {
  createCategory,
  getCategorys,
  getCategory,
  deleteCategory,
  updateCategory
} = require("../controllers/categoryController.js");


const {
  verifyToken,
  refreshToken,
} = require("../controllers/usercontroller");


const { auth,adminCheck } = require("../middleware/auth.js");

router.post("/",  createCategory);
router.put("/",  updateCategory);
router.get("/", getCategorys);
router.get("/:id", getCategory);
router.delete("/:id", deleteCategory);

module.exports = router;
