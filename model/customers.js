const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const customerSchema = new Schema({
  firstname: String,
  lastname: String,
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: String,
  role: { type: String, default: "user" },
  acountstatus: {
    type: Boolean,
    default: true
  },
  cart: [{
    title: String,
    price: Number,
    image: String,
    quantity: {type:Number, default:1},
    totalprice: {type:Number, default:0}
  }],
});

module.exports = mongoose.model("Customer", customerSchema); 
