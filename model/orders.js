
/**
 * requiring  third party modules
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


/**
 * creating order schema
 */
const orderSchema = new Schema({
 
  farmerId: { type: Schema.Types.ObjectId, ref: 'Farmer' },
  customerId: { type: Schema.Types.ObjectId, ref: 'Customer' },
  customerEmail: { type: String, ref: 'Customer' },
  status: { type: String, default: "pending" },
  orderedProducts: [  ]
});



/**
 * exporting order schema 
 */
module.exports = mongoose.model('Order', orderSchema);