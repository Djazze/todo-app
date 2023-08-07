const sequelize = require('../db'); // Your database connection
const { Model, DataTypes } = require('sequelize');

class User extends Model {}

User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true, // Automatically assign an ID
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true // Ensure usernames are unique
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  // Other fields as needed
}, {
  sequelize,
  modelName: 'User',
  timestamps: false, // Disable timestamps
});

module.exports = User;
