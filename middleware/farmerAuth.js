/**
 * functionality to redirect the page to login
 */
const jwt = require("jsonwebtoken");
const Farmer = require("../model/farmers");

module.exports = async (req, res, next) => {
    // console.log(req.headers);
    
    let token;
    if (req.headers.authorization) {
        token = req.headers.authorization.split(" ")[1];
      }

      
    if (!token) {
        return res.status(401).json({
            success: false,
            data: "This is the first error",
        });
    }
    try {
        const decodedData = jwt.verify(token, process.env.TOKEN_SECRET);
        req.farmer = await Farmer.findById(decodedData.id);
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            data: error.message,
        });
    }
};