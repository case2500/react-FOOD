const express = require("express");
const app = express();

const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const path = require("path");
const productRoute = require("./routers/productRouter");
// const userRoutes = require("./routers/userRoutes");
const userrouter = require("./routes/userroutes.js");
const categoryRoute = require("./routers/categoryRoute.js");
const orderRouter = require("./routers/ordersRouter.js");

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static(__dirname + "public"));
// app.use(express.static(path.join(__dirname, '../public')));
// app.use(express.static(__dirname + "../../" +"/uploaded"));
// app.use("uploaded",express.static(path.join("uploaded")))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cors());

mongoose.connect("mongodb://localhost:27017/food", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// app.use("/api/authen/", require("./api_authen"));
app.use("/api/stock/", require("./api_stock"))

app.use("/api/category", categoryRoute);
app.use("/api/products", productRoute);
// app.use('/api/users', userRoutes);
app.use("/api/user", userrouter);
app.use("/api/order/", orderRouter);

app.listen(4000, () => {
  console.log("Backend is running.. 4000   mongodb://localhost:27017/food");
});
