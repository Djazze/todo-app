// userModel.js
const bcrypt = require('bcrypt');
const connection = require('./db');

const users = {
  create: (username, password, callback) => {
    // ...
  },
  findByUsername: (username, callback) => {
    // ...
  }
};

module.exports = users;
