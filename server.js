const express = require("express");
const connectDB = require("./db/index");
const errorHandler = require("./middleware/error");
const roleChecker = require("./middleware/roleChecker");
const verifyToken = require("./middleware/tokenChecker");
const userRoutes = require("./routes/userRoutes");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
// initialize express
const app = express();

// accept json and other form fields
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// extract db uri from env file
const uri = process.env.MONGO_URI;

// execute db connector function
connectDB(uri);

// use api routes
app.use("/", userRoutes);

app.get("/user", verifyToken, roleChecker("user"), (req, res) => {
  res.send("Hello world, I am a user");
});

app.get("/admin", verifyToken, roleChecker("admin"), (req, res) => {
  res.send("Hello world, I am an admin");
});

app.get("/", (req, res) => {
  res.send("Hello from the backed");
});

// use error middleware
app.use(errorHandler);

// start server
app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
