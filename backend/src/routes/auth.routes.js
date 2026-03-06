const express = require("express");
const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

// Register a new user
router.post("/register", authController.register);

// Login a user
router.post("/login", authController.login);

// Logout a user
router.post("/logout", authController.logout);

// Get current user profile
router.get("/profile", authMiddleware, authController.getCurrentUser);

module.exports = router;