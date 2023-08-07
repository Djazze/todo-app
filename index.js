const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 3000;
const app = express();
const todoRoutes = require('./todoRoutes'); // Import the todo routes
const authRoutes = require('./authRoutes'); // Import the authentication routes
const session = require('express-session');
require('dotenv').config();
const secretKey = process.env.SECRET_KEY;

// Configure session middleware
app.use(session({
    secret: secretKey,
    resave: false,
    saveUninitialized: false,
    // Other options as needed
}));

const sequelize = require('./db');
const User = require('./models/User');
const Todo = require('./models/Todo');
require('./models/relationships'); // Define the relationships

sequelize.sync(); 

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
