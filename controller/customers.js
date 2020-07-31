const Customer = require("../model/customers");
const Farmer = require("../model/farmers");
// const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');

dotenv.config();

/**User signup */
exports.customerSignup = async (req, res, next) => {
  console.log(req.body);
  const { firstname, lastname, email, password } = req.body;
  let user = await Customer.findOne({ email: email });
  if (user) {
    res.status(422).json({
      status: "error",
      data: "email already registered"
    });
  } else {
    // bcrypt.hash(req.body.password, 10).then((hash) => {
    Customer.create({
      firstname,
      lastname,
      email,
      password,
      role: "user"
    });
    res.status(201).json({
      status: "Ok",
      data: "customer created successfully"
    });
    // })  
  }
};


/**User login */
exports.customerLogin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    
    return res.status(412).json({
      status: "error",
      data: "Please provide email or password"
    });

  }
  let customer = await Customer.findOne({ email: email });
  if (!customer || password != customer.password) {
    res.status(422).json({
      status: "error",
      data: "Invalid Credential",
    });
  }
// const payload = {customer:{id:customer.id}}

// console.log(payload);

  let token = await jwt.sign({id:customer._id}, process.env.TOKEN_SECRET);
  res.status(200).json({ success: true, token: token });
};

/**Get users list for admin */
exports.getCustomers = async (req, res, next) => {
  try {
    let customerList = await Customer.find({})
    res.status(200).json({ success: true, data: customerList })
  } catch (error) {
    res.status(204).json({ success: false })
  }
}


/**get list of farmers */
exports.getFarmerList = async (req, res, next) => {
  try {
    let farmerList = await Farmer.find({})
    res.status(200).json({ success: true, output: farmerList })

  } catch (error) {
    res.status(204).json({ success: false, output: "access error" })
  }
}

/**get cart */
exports.addCart = async (req, res, next) => {

  console.log("this is done custom" + req.customer._id);
  console.log(req.body);
  try {
   
    let customer = await Customer.findOne({ _id: req.customer._id })
    
    // console.log("Find my customer" + customer);
    customer.cart.push(req.body)
    await customer.save();
    res.status(200).json({ success: true, output: customer })
  } catch (error) {
    res.status(204).json({ success: false, output: "cart error" })

  }
}


/**get carts */
exports.getcarts = async (req, res, next) => { 

  // console.log("customer", req.customer._id);
  try {
    let customer = await Customer.findOne({ _id: req.customer._id })
    res.status(200).json({ success: true, output: customer.cart })
  } catch (error) {
    res.status(204).json({ success: false, output: "get cart error" })
  }
}


/**farmers update order status for a user */
exports.updateCustomersStatus = async (req, res, next) => {
  // console.log(req.param.farmId);
  console.log(req.body);
  try {
    await Customer.update({ _id: req.body.id }, { acountstatus: req.body.myboolean },
      { upsert: true }
    );
    res.status(200).json({
      success: true, data: "status updated successfully"
    })
  } catch (error) {
    res.status(400).json({ success: false, data: "status update error" })
  }
}

/**customer data update by super user */
exports.updateCustomer = async (req, res, next) => {
  // console.log("Check my id   " , req.customer._id)
  try {
   
   await Customer.update({ _id: req.customer._id}, { customer: req.body.customer },
    { upsert: true });
   
    res.status(200).json({ success: true, data: "customer data updated" })
  } catch (error) {
    res.status(400).json({ success: false, data: error.message })
  }
}



