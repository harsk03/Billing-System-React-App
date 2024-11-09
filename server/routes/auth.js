// server/routes/auth.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

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
    
    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      'your_jwt_secret', // Replace with actual secret from environment variables
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
    
    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      '0858669d071defea08c49f389071e5101cb55ef2c0cee3fb6a83a883eb532d78a1d5c55d822b8dfaaf8be9baf03b3df5fe600befd40967e16bbab3c37b99d44e', // Replace with actual secret from environment variables
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