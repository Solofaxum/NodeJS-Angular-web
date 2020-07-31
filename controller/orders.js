
const Order = require("../model/orders");
const Customer = require("../model/customers");
const Farmer = require("../model/farmers");
const nodemailer = require("nodemailer");
const farmers = require("../model/farmers");


/**
 * functionality to post orders by customer
 */
exports.postOrder = async (req, res, next) => {
  try {
    await new Order({
      farmerId: req.body.farmerId,
      customerId: req.body.customerId,
      customerEmail: req.body.customerEmail,
      groundTotalPrice: req.body.groundTotalPrice,
      orderedProducts: req.body.orderedProducts
    }).save();

    const customer = await Customer.findOne({ customerId: req.body.customerId });
    const farmer = await Farmer.findOne({ farmerId: req.body.farmerId });

    console.log(customer);
    console.log(farmer);

    /**sending email middleware */
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
      }
    })
    const mailOptions = {
      from: customer.email,
      to: process.env.EMAIL,
      subject: "order set successfull",
      text: "Check your product"
    };
    transporter.sendMail(mailOptions, function (err, data) {
      if (err) {
        console.log(err);
        res.status(400).json({ success: false, data: err.message });
      } else {
        console.log("Email has been sent");
        res.send(info)
      }
    });

    res.status(201).json({ success: "OK", data: "succcesfull Order" })
  }
  catch (error) {
    res.status(400).json({
      success: false,
      data: error.message
    })
  }
};


/**
 * farmers getting list of orders from users
 */
exports.getOrders = async (req, res, next) => {
  console.log(req.farmer._id);
  try {
    let orderList = await Order.find({ farmerId: req.farmer._id });
    console.log(orderList);

    res.status(200).json({ success: true, data: orderList })
  } catch (error) {
    res.status(400).json({ success: false, data: error.message })
  }

}

/**
 * farmers update order status for a user
 */
exports.updateOrderStatus = async (req, res, next) => {
  try {

    await Order.updateOne(
      { _id: req.body.orderId }, { status: req.body.status },
      { upsert: true }
    );

    const customer = await Customer.findOne({ customerId: req.body.customerId });
    const farmer = await Farmer.findOne({ farmerId: req.body.farmerId });
    const order = await Order.findOne({ _id: req.body.id });

    console.log(customer);
    console.log(farmer);
    console.log(order);

    if (req.body.status == "ready") {

      /**sending email middleware */
      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD
        }
      })
      const mailOptions = {
        from: process.env.EMAIL,
        to: process.env.EMAIL,
        cc:process.env.EMAIL,
        subject: "This was my first message",
        text: "Check your product"
      };

      transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
          console.log(err);
          res.status(400).json({ success: false, data: err.message });
        } else {
          console.log("your order is ready to pick");
          res.send(data)
        }
      });

    } else {
      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD
        }
      })
      const mailOptions = {
        from: process.env.EMAIL,
        to: process.env.EMAIL,
        cc: process.env.EMAIL,
        subject: "This was my second message",
        text: "Order copleted, Thanks for joining us."
      };
      transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
          console.log(err);
          res.status(400).json({ success: false, data: err.message });
        } else {
          console.log("Email has been sent");
          res.send(info)
        }
      });
    }
    res.status(200).json({
      success: true, data: "status updated successfully"
    })
  } catch (error) {
    res.status(400).json({ success: false, data: error.message })
  }
}

/**make order */

exports.makeOrders = async (req, res, next) => {
  
  try {
    await Order.create({
      orderedProducts: req.body.carts,
      groundTotalPrice: req.body.totalPrice,
      customerEmail: req.customer.email,
      customerId: req.customer._id,
      farmerId: req.body.farmer
    })
    
    let newCustomer = await Customer.findOne({ _id: req.customer._id });

    let newFarmer = await Farmer.findOne({ _id: req.body.farmer })


    /**sending emails middleware */
    // let transporter = nodemailer.createTransport({
    //   service: "gmail",
    //   auth: {
    //     user: process.env.EMAIL,
    //     pass: process.env.PASSWORD
    //   }
    // })

    // const mailOptions = {
    //   from:  newCustomer.email,
    //   to: newFarmer.email,
    //   cc: newCustomer.email,
    //   subject: "This is to remind you about the product",
    //   text: "Check your product"
    // };

    // transporter.sendMail(mailOptions, function (err, data) {
    //   if (err) {
    //     console.log(err);
    //     res.status(400).json({ success: false, data: err.message });
    //   } else {
    //     console.log("your order is ready to pick");
    //     res.send(data)
    //   }
    // });
    res.status(200).json({ success: true, output: "Order Completed" })
  } catch (error) {
    res.status(204).json({ success: false, output: error.message })

  }
}