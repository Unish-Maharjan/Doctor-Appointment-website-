const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

function generateToken(userId) {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
}

async function registerUser(req, res) {
  try {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email and password are required" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    const newUser = new User({ name, email, password, phone });
    const savedUser = await newUser.save();

    const token = generateToken(savedUser._id);

    res.status(201).json({
      _id: savedUser._id,
      name: savedUser.name,
      email: savedUser.email,
      role: savedUser.role,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Registration failed", error: error.message });
  }
}

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error: error.message });
  }
}

async function getProfile(req, res) {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch profile", error: error.message });
  }
}

module.exports = {
  registerUser,
  loginUser,
  getProfile,
};
