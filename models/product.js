const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      default: 0,
    },
    stock: {
      type: Number,
      default: 0,
    },
    totalSold: {
      type: Number,
      required: true,
      default: 0,
    },
    brand: {
      type: String,
    },
    category: {
      type: String,
      default: "ทั่วไป",
    },
    discount: {
      type: String,
      default: 0,
    },
    description: {
      type: String,
      default: 1,
    },
    supplier_id: {
      type: String,
    },
    status: {
      type: Number,
      default: 1,
    },
    image: {
      type: String,
      default: "-",
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;

// const Sequelize = require("sequelize");

// const Sequelize = require("sequelize");
// const sequelize = require("../db_instance");

// const product = sequelize.define(
//     "product",
//     {
//       name: {
//         type: Sequelize.STRING,
//         allowNull: false
//       },
//       image: {
//         type: Sequelize.STRING,
//         allowNull: false,
//         defaultValue: "-"
//       },
//       price: {
//         type: Sequelize.NUMBER
//         // allowNull defaults to true
//       },
//       stock: {
//         type: Sequelize.NUMBER
//         // allowNull defaults to true
//       }
//     },
//     {
//       // options
//     }
//   );

// (async () => {
//   await product.sync({ force: false });
// })();

// module.exports = product;
