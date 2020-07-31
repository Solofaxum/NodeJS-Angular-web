const Farmer = require("../model/farmers");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

/**farmer signup */
exports.farmerSignup = async (req, res, next) => {
  const { farmname, fullname, password, email } = req.body;
  let user = await Farmer.findOne({ email: email });
  if (user) {
    res.status(422).json({
      status: "error",
      data: "email already registered"
    });

  } else {
    // bcrypt.hash(req.body.password, 10).then((hash) => {
    let output = await Farmer.create({
      farmname,
      fullname,
      password,
      email
    });
    res.status(201).json({
      status: "Successfully Registered with the following information",
      data: output
    });
  }
};

/**farmer log in */
exports.farmerLogin = async (req, res, next) => {
  // console.log(req.body);
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(412).json({
      status: "error",
      data: "Please provide email or password",
    });
  }
  let farmer = await Farmer.findOne({ email });
  if (!farmer) {
    return res.status(406).json({
      status: "error",
      data: "email does not exist",
    });
  }
  const validpass = bcrypt.compare(req.body.password, farmer.password);
  console.log(farmer.password)
  if (!validpass) {
    return res.status(400).json({
      status: "error",
      data: "invalid password"
    });
  }
  let token = jwt.sign({ id: farmer._id }, process.env.TOKEN_SECRET);
  res.status(200).json({
    success: true,
    token: token
  });
};

/**get list of farmers */
exports.getFarmers = async (req, res, next) => {
  try {
    let farmerList = await Farmer.find({})
    res.status(200).json({ success: true, output: farmerList})
  
  } catch (error) {
    res.status(204).json({ success: false, output: "access error" })
  }
}

/**farmers data update by super user */
exports.updateFarmer = async (req, res, next) => {
  console.log("Check my id   " + req.farmer._id)
  try {
   
   await Farmer.update({ _id: req.farmer._id}, { farmer: req.body.farmer },
    { upsert: true });
   

    res.status(200).json({ success: true, data: "farmers data updated" })
  } catch (error) {
    res.status(400).json({ success: false, data: error.message })
  }
}

/**farmers update order status for a user */
exports.updateFarmStatus = async (req, res, next) => {
  // console.log(req.param.farmId);
  console.log(req.body);
  try {
    await Farmer.update({ _id: req.body.id }, { acountstatus: req.body.myboolean },
      { upsert: true }
    );
    res.status(200).json({
      success: true, data: "status updated successfully"
    })
  } catch (error) {
    res.status(400).json({ success: false, data: error.message })
  }
}



