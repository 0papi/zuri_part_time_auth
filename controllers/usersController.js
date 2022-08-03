const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// @route POST /api/auth/register
// desc   Register User[admin, user, manager, staff]
// access Public
exports.registerUser = asyncHandler(async (req, res) => {
  // get user details from req body
  const { username, password, password2, email } = req.body;

  if (!username || !password || !password2 || !email) {
    res.status(400);
    throw new Error("Please provide all fields");
  }

  // check if user already exists
  const userExists = await User.findOne({ username });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // generate salt to hash password
  const salt = await bcrypt.genSalt(10);
  // create hashed password
  const hashedpwd = await bcrypt.hash(password, salt);

  //   create new user with details
  const user = await User.create({
    username,
    password: hashedpwd,
    email,
  });

  if (!user) {
    res.status(400);
    throw new Error("Trouble creating user");
  }

  if (user) {
    res.status(200).json(user);
  }
});

// @route POST /api/auth/register
// desc   Register User[admin, user, manager, staff]
// access Public

exports.loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  // check if username or password exists
  if (!username || !password) {
    res.status(400);
    throw new Error("Please provide all fields");
  }

  // check if user exists
  const user = await User.findOne({ username });

  // throw error if user does not exist
  if (!user) {
    res.status(400);
    throw new Error("User does not exist");
  }

  // check that user has correct password
  const passwordExists = await bcrypt.compare(password, user.password);
  if (!passwordExists) {
    res.status(400);
    throw new Error("Username or password invalid");
  }

  // generate token
  const token = jwt.sign(
    { username: user.username },
    process.env.TOKEN_SECRET,
    {
      expiresIn: "60s",
    }
  );

  res.status(200).json({ token });
});
