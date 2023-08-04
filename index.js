const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 3000;
const app = express();
const todoRoutes = require('./todoRoutes'); // Import the todo routes
const authRoutes = require('./authRoutes'); // Import the authentication routes
const session = require('express-session');

// Configure session middleware
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    // Other options as needed
}));

// Database connection (if you've moved this to a separate file)
require('./db');

// Middleware Configuration
app.use(bodyParser.json());
app.use(cors());

// Use the imported routes
app.use(todoRoutes);
app.use(authRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
