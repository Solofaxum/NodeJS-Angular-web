
/**
 * functionality to redirect the page to login
 */
const Customer = require("../model/customers");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');

dotenv.config();

module.exports = async (req, res, next) => {
    // console.log(req.headers);
    
    let token;
    if (req.headers.authorization) {
        token = req.headers.authorization
        // console.log(token)
      }

      
    if (!token) {
        return res.status(404).json({
            success: false,
            data: "This is the first error in custom middle",
        });
    }
    
    try {
        const decodedData = jwt.verify(token, process.env.TOKEN_SECRET);
        // console.log("decoded data " + decodedData);
        req.customer = await Customer.findById(decodedData.id);
        // console.log("req.customer " + req.customer)
        return next();
    } catch (error) {
        return res.status(400).json({
            success: false,
            data: "try error from authorization",
        });
    }
};