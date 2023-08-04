const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db.js'); // Update with the correct path
const User = require('./User.js'); // Update with the correct path

const Todo = sequelize.define('Todo', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    task: {
        type: DataTypes.STRING,
        allowNull: false
    },
    completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User, // Reference to the User model
            key: 'id'
        },
        allowNull: false
    }
});

// Define the relationship between User and Todo
User.hasMany(Todo, { foreignKey: 'userId' });
Todo.belongsTo(User, { foreignKey: 'userId' });

module.exports = Todo;
