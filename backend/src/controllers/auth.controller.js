const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


// -------- Controller to handle user registration --------
async function register(req, res) {
  const { email, username, password, type } = req.body;
  if (!email || !username || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const existingUser = await userModel.findOne({
      $or: [{ email }, { username }],
    });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Email or username already exists" });
    }
    const newUser = new userModel({
      email,
      username,
      password,
      type,
    });
    await newUser.save();
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
    });
    res.status(201).json({
      message: "User registered successfully",
      email: newUser.email,
      username: newUser.username,
      type: newUser.type,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

// -------- Controller to handle user login --------
async function login(req, res) {
  const { email, username, passowrd } = req.body;
  if (!email && !username) {
    return res.status(400).json({ message: "Email or username is required" });
  }
  if (!passowrd) {
    return res.status(400).json({ message: "Password is required" });
  }
  try {
    const user = await userModel.findOne({
      $or: [{ email }, { username }],
    });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(passowrd, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
    });
    res.json({
      message: "Login successful",
      email: user.email,
      username: user.username,
      type: user.type,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

// -------- Controller to handle user logout --------
async function logout(req, res) {
  res.clearCookie("token");
  res.json({ message: "Logout successful" });
}

// -------- Controller to get current user details --------
async function getCurrentUser(req, res) {
  const user = req.user;
  res.json({
    email: user.email,
    username: user.username,
    type: user.type,
  });
}

module.exports = {
  register,
  login,
  logout,
  getCurrentUser,
};
