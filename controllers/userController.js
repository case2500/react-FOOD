const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const removeUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findOneAndDelete({ _id: id });
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
};

const changeRole = async (req, res) => {
  // const token = req.headers;
  console.log("req.body" + req.headers);
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.body.id },
      { role: req.body.role }
    );
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
};

// Update User
const updateuser = async (req, res) => {
  console.log("userid=>" + JSON.stringify(req.body));
  const { _id, name, email, phone, bio, role } = req.body;
  const user = await User.findById(req.body._id);
  if (user) {
    const updateduser = await User.findByIdAndUpdate(
      { _id: _id },
      {
        name,
        email,
        phone,
        bio,
        role,
      },
      {
        new: true,
        runValidators: true,
      }
    )
  } else {
    res.status(404);
    throw new Error("User not found");
  }
};

// ******* signup ******** //
const signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  console.log(req.body)
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
    console.log((existingUser))
  } catch (err) {
    console.log(err);
  }
  if (existingUser) {
    return res
      .status(400)
      .json({ message: "User already exists! Login Instead" });
  }
  const hashedPassword = bcrypt.hashSync(password);
  const user = new User({
    name,
    email,
    password: hashedPassword,
    bio:"",
    phone:"",

    // role:`admin`
  });
  try {
    await user.save();
  } catch (err) {
    console.log(err);
  }
  return res.status(201).json({ message: user });
};

// ******* login ******** //
const login = async (req, res, next) => {
  const { email, password } = req.body;
  console.log(req.body)
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email }).select({
      name: 1,
      bio: 1,
      email: 1,
      phone: 1,
      role: 1,
      password: 1,
    });
  } catch (err) {
    return new Error(err);
  }
  if (!existingUser) {
    return res.status(400).json({ message: "User not found. Signup Please" });
  }
  const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Inavlid Email / Password" });
  }
  const token = jwt.sign({ id: existingUser._id }, 'case2500', {
    expiresIn: "5d",
  });
  return res
    .status(200)
    .json({ message: "Successfully Logged In", user: existingUser, token });
};

const verifyToken = (req, res, next) => {
  const cookies = req.headers.cookie;
  console.log("cookies=>" + cookies);
  const token = cookies.split("=")[1];
  if (!token) {
    res.status(404).json({ message: "No token found" });
  }
  jwt.verify(String(token), 'case2500', (err, user) => {
    if (err) {
      return res.status(400).json({ message: "Invalid TOken" });
    }
    console.log(user.id);
    req.id = user.id;
  });
  next();
};

// ******* getUser ******** //
const getUser = async (req, res, next) => {
  const userId = req.params.id;
  let user;
  try {
    user = await User.findById(userId, "-password");
  } catch (err) {
    return new Error(err);
  }
  if (!user) {
    return res.status(404).json({ messsage: "User Not FOund" });
  }
  return res.status(200).json({ user });
};

const getUserlist = async (req, res, next) => {
  try {
    const user = await User.find();
    return res.status(200).json(user);
  } catch (err) {
    return new Error(err);
  }
};

exports.signup = signup;
exports.login = login;
exports.getUser = getUser;
exports.updateuser = updateuser;
exports.getUserlist = getUserlist;
exports.changeRole = changeRole;
exports.removeUser = removeUser;
