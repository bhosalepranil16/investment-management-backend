const jwt = require("jsonwebtoken");

const { User } = require("../models/index");

const isUser = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    const { mobileNumber } = jwt.verify(token, process.env.SECRET);
    const user = await User.findOne({ where: { mobileNumber } });
    if (!user) {
      throw new Error("Invalid token, please login.");
    }
    req.activeUser = user.dataValues;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ msg: error.toString() });
  }
};

module.exports = { isUser };
