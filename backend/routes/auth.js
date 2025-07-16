// routes/auth.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// ✅ LOGIN Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  console.log('📥 Incoming login:', email, password); // Log login attempt

  try {
    const user = await User.findOne({ email });
    console.log('🔍 Fetched user from DB:', user); // Log user object

    if (!user || user.password !== password) {
      console.log('❌ Password mismatch or user not found');
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, 'secret123', { expiresIn: '1h' });

    console.log('✅ Login successful, token generated');
    res.json({ token });
  } catch (err) {
    console.error('❌ Server error during login:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ✅ REGISTER Route
router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const newUser = new User({ email, password }); // 🔒 No hashing yet
    await newUser.save();

    console.log('✅ Registered user:', email);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('❌ Error in registration:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;





