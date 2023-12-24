const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//Generate random numbers for order

const billOrderSchema = new Schema(
  {
    bill_No:{
      type: Number,
      default: 100000
    },
    
    status: {
      type: String,
      default: "open",
    },
 
    inputMoney: {
      type: Number,
    },
    returnMoney: {
      type: Number,
    },
    reduceMoney: {
      type: Number,
    },
    totalPrice: {
      type: Number,
      default: 0.0,
    },
  },
  {
    timestamps: true,
  }
);

//compile to form model
const BillOrder = mongoose.model("BillOrder", billOrderSchema);

module.exports = BillOrder;
