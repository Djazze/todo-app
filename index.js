const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const syncModels = require('./syncModels');
require('dotenv').config();

const app = express();
const port = 3000;

// Configure session middleware
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
}));

syncModels();

// Middleware Configuration
app.use(bodyParser.json());
app.use(cors());

// Import and use the routes
app.use(require('./todoRoutes'));
app.use(require('./authRoutes'));

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
