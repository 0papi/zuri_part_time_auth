const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/User");
require("dotenv").config();

const verifyToken = asyncHandler(async (req, res, next) => {
  let token;

  // check for headers
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decode = jwt.verify(token, process.env.TOKEN_SECRET);

      console.log(decode);

      // Get user from the token
      req.user = await User.findById(decode.id).select("-password");

      console.log(req.user);
      next();
    } catch (error) {
      res.status(401);
      throw new Error("User not authorized");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("No token, user not allowed");
  }
});

module.exports = verifyToken;
