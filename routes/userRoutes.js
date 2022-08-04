const router = require("express").Router();
const usersController = require("../controllers/usersController");

// declare user auth routes
router.post("/api/auth/login", usersController.loginUser);
router.post("/api/auth/register", usersController.registerUser);
router.post("/api/auth/resetpassword", usersController.resetPassword);
router.post(
  "/api/auth/resetpassword/user/:id",
  usersController.completeResetPassword
);

module.exports = router;
