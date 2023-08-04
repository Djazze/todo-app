const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // Your database connection

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  // Other fields as needed
});

module.exports = User;
