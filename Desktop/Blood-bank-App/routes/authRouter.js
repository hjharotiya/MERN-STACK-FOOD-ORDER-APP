const express = require("express");
const {
  registerController,
  loginController,
  currentUserController,
} = require("../controller/authController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Routes
// REGISTER || Post
router.post("/register", registerController);

// Login || Post
router.post("/login", loginController);

// Get Current User || GET
router.get("/current-user", authMiddleware, currentUserController);

module.exports = router;
