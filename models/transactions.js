const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//Generate random numbers for order
const randomTxt = Math.random().toString(36).substring(7).toLocaleUpperCase();
const randomNumbers = Math.floor(1000 + Math.random() * 90000);
const TransactionSchema = new Schema(
  {
    // user: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    //   required: true,
    // },
    tranactionItems: [
      {
        type: Object,
        required: true,
      },
    ],
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
const Transactions = mongoose.model("Transactions", TransactionSchema);

module.exports =  Transactions;
