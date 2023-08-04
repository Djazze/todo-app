// // db.js
// const mysql = require('mysql');

// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '1234',
//   database: 'todo_app'
// });

// connection.connect(err => {
//   if (err) throw err;
//   console.log('Connected to the database!');
// });

// module.exports = connection;

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('todo_app', 'root', '1234', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;
