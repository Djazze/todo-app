const { DataTypes } = require('sequelize');
const sequelize = require('../db.js');
const User = require('./User.js');

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
    },
    description: {
        type: DataTypes.STRING, // New description field
        allowNull: false,

    },
    column: {
        type: DataTypes.STRING, // New column field
        allowNull: true, // Assuming it's optional
    },
    status: {
        type: DataTypes.ENUM('Pending', 'In Progress', 'Completed'), // New status field
        defaultValue: 'Pending',
        allowNull: false
    }

},
    {
        sequelize,
        modelName: 'Todo',
        timestamps: true,
    });

module.exports = Todo;
