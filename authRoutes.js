const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const users = require('./userModel');
const router = express.Router();
import axios from './axios-config';


// Registration endpoint
router.post('/api/register', (req, res) => {
    const { username, password } = req.body;

    // Validate input (you can add more validation logic here)
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    // Check if the user already exists
    users.findByUsername(username, (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            return res.status(409).json({ error: 'Username already exists' });
        }

        // Create the user
        users.create(username, password, (err, results) => {
            if (err) throw err;
            res.json({ message: 'User registered successfully' });
        });
    });
});

// Login endpoint
router.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    users.findByUsername(username, (err, results) => {
      if (err) throw err;
      const user = results[0];
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({ username: user.username }, 'SECRET_KEY', { expiresIn: '1h' });
        res.json({ token });
      } else {
        res.status(401).json({ error: 'Invalid username or password' });
      }
    });
});

// You can add more authentication-related endpoints here, such as registration

module.exports = router;
