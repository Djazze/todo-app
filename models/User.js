const sequelize = require('../db'); // Your database connection
const { Model, DataTypes } = require('sequelize');
const Todo = require('./Todo.js'); // Update with the correct path

class User extends Model {}

User.init({
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

// Define the relationship between User and Todo
User.hasMany(Todo, { foreignKey: 'userId' });
Todo.belongsTo(User, { foreignKey: 'userId' });

module.exports = User;
