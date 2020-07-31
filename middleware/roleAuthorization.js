
/**
 * super user authentication
 */

module.exports = function (role) {
    return (req, res, next) => {
      if (role === req.farmer.role) {
        return next();
      } else {
        return res.status(400).send("Not authorized");
      }
    };
  };

