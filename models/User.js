const sequelize = require('../db'); // Your database connection
const { Model, DataTypes } = require('sequelize');

class User extends Model {}

User.init({
  username: DataTypes.STRING,
  password: DataTypes.STRING,
  // Other fields as needed
}, {
  sequelize,
  modelName: 'User',
  timestamps: false, // Disable timestamps
});

module.exports = User;

