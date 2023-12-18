const express = require("express");
const {
  signup,
  login,
  getUser,
  updateuser,
  getUserlist,
  changeRole,
  removeUser

} = require("../controllers/usercontroller.js");

const router = express.Router();
// middleware
const { auth,adminCheck } = require("../middleware/auth.js");
// ******* http://localhost:4000/api/user/signup ******** //
// ******* http://localhost:4000/api/user/login ******** //
// ******* http://localhost:4000/api/user/ ******** //
// ******* http://localhost:4000/api/users/ ******** //
// ******* http://localhost:4000/api/user/:id ******** //
// ******* http://localhost:4000/api/user/logout ******** //
router.post("/signup", signup);
router.post("/login", login);
router.get("/user/:id", auth,getUser)
router.get("/users",adminCheck,getUserlist);
router.delete("/user/:id",auth,adminCheck, removeUser)
router.patch("/updateuser",auth,adminCheck, updateuser);
router.post("/change-role",auth,adminCheck, changeRole);
module.exports = router;
