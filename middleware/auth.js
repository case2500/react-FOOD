const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.auth = (req, res, next) => {
    // console.log("token"+req.headers["authtoken"]);
  try {
    const token = req.headers["authtoken"];
     console.log("token"+token);
    if (!token) {
      return res.status(401).send("no token , authorization denied");
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    // console.log("middleware", decoded);
    req.user  = decoded.user
    next()

  } catch (err) {
    console.log(err);
    res.status(401).send("Token Invavid!!");
  }
};

exports.adminCheck = async(req, res, next) => {
console.log(req.headers["authtoken"])
  try {
    const token = req.headers["authtoken"];
   if (!token) {
     return res.status(401).send("no token , authorization denied");
   }
   const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
   req.user  = decoded.id
 //console.log("middleware=="+ req.user);
    const { Userid } = req.user
 //console.log(" Useride=="+  req.user);
    const adminUser = await User.findOne({ Userid }).exec()
  //   console.log("middleware=" +adminUser);
    if(adminUser.role !== 'admin'){  
      res.status(403).send(err,'Admin Access denied')
    } else{
        console.log("middleware="+adminUser.role );
      next()
    }
  } catch (err) {
    console.log(err);
    res.status(401).send("Admin Access denied");
  }
};
