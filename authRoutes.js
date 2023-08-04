const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const users = require('./models/User');
const router = express.Router();
const User = require('./models/User');

// Registration endpoint
router.post('/api/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const user = await User.create({
      username,
      password: hashedPassword
    });

    // Respond with success
    res.status(200).json({ message: 'User registered successfully' });
  } catch (error) {
    // Handle error (e.g., username already exists)
    res.status(400).json({ error: error.message });
  }
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
