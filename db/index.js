// import packages
const mongoose = require("mongoose");

// connect db here
const connectDB = async (uri) => {
  try {
    const conn = await mongoose.connect(uri);
    console.log(`Database connect at ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
