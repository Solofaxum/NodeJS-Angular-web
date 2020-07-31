const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const farmerSchema = new Schema({

  farmname: {
    type: String,
    required: true
  },
  fullname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  acountstatus: {
    type: Boolean,
    default: true
  },
  role: {
    type: String,
    default: "farmer"
  },
  products: [{

    farmname: String,
    title: String,
    price: String,
    describtion: String,
    image: String
  }
  ],
});

module.exports = mongoose.model("Farmer", farmerSchema); 
