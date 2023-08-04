const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const users = require('./models/User');
const router = express.Router();
const User = require('./models/User');

// Registration endpoint
router.post('/api/register', async (req, res) => {
  try {
    // Extract and validate data from request
    const { username, password } = req.body;

    // Hash the password
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Insert into Users table
    await User.create({
      username,
      password: hashedPassword
    });

    // Respond with success
    res.status(200).json({ message: 'User registered successfully' });
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Error:', err); // Log the error
    // Handle error (e.g., username already exists)
    res.status(400).json({ err: err.message });
  }
});

// Login endpoint
router.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user by username
    const user = await User.findOne({ where: { username } });

    // Check if the user exists and the password is correct
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign({ username: user.username }, 'SECRET_KEY', { expiresIn: '1h' });
      res.json({ token });
    } else {
      res.status(401).json({ error: 'Invalid username or password' });
    }
  } catch (err) {
    // Handle error
    res.status(500).json({ error: err.message });
  }
});

// You can add more authentication-related endpoints here, such as registration

module.exports = router;
