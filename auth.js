const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("./models/User");
const { jwtSecret } = require("./config");

const authRouter = express.Router();

// Function to generate JWT token
function generateToken(userId) {
  return jwt.sign({ userId }, jwtSecret, { expiresIn: "1h" });
}

// Register route
authRouter.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    // Check if user with the provided email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create a new user
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();
    // Generate JWT token
    const token = generateToken(newUser._id);
    res.status(201).json({ message: "User registered successfully.", token });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).send("Registration failed.");
  }
});

// Login route
authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "User is not registered" });
    }
    // Compare passwords
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    // Generate JWT token
    const token = generateToken(user._id);
    res.json({ message: "Login successful.", token });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).send("Login failed.");
  }
});

module.exports = authRouter;
