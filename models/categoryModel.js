const mongoose = require("mongoose");

const category = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "1",
  },
  image: {
    type: String,
    required: true,
    default: "-",
  },
},
{
  timestamps: true,
}
);

const Category = mongoose.model("Category", category);
module.exports = Category;
