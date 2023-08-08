const { Sequelize, DataTypes } = require('sequelize');
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
    }
},
{
    sequelize,
    modelName: 'Todo',
    timestamps: true, 
  });

module.exports = Todo;
