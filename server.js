const connectDB = require("./db/index");
const dotenv = require("dotenv").config();

connectDB();

console.log("Here is my server");
