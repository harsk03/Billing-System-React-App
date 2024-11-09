// server/routes/auth.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();

router.post('/register', async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    
    const existingUser = await User.findOne({
      $or: [{ email }, { username }]
    });
    
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
    const user = new User({
      username,
      email,
      password,
      role
    });
    
    await user.save();
    
    // Generate JWT token using the secret from the environment variable
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET, // Use secret from .env
      { expiresIn: '24h' }
    );
    
    res.status(201).json({
      message: 'User registered successfully',
      token,
      role: user.role
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    const user = await User.findOne({ username });
    
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    if (password !== user.password) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    // Generate JWT token using the secret from the environment variable
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET, // Use secret from .env
      { expiresIn: '24h' }
    );
    
    res.status(200).json({
      message: 'Login successful',
      token,
      role: user.role
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
