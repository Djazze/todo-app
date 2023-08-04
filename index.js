const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 3000;
const app = express();
const mysql = require('mysql');
const bcrypt = require('bcrypt');

const connection = mysql.createConnection({
  host: 'localhost',
  user: '',
  password: '1234',
  database: 'todo_app'
});

connection.connect(err => {
  if (err) throw err;
  console.log('Connected to the database!');
});

const users = {
  create: (username, password, callback) => {
    const hashedPassword = bcrypt.hashSync(password, 10);
    const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
    connection.query(query, [username, hashedPassword], callback);
  },
  findByUsername: (username, callback) => {
    const query = 'SELECT * FROM users WHERE username = ?';
    connection.query(query, [username], callback);
  }
};


app.use(bodyParser.json());
app.use(cors());


let todoItems = [];

// Get all to-do items
app.get('/api/todo', (req, res) => {
    res.json(todoItems);
});

// Create a new to-do item
app.post('/api/todo', (req, res) => {
    const newTodo = req.body;
    todoItems.push(newTodo);
    res.json(newTodo);
});

// Update an existing to-do item
app.put('/api/todo/:id', (req, res) => {
    const id = req.params.id;
    const updatedTodo = req.body;
    todoItems[id] = updatedTodo;
    res.json(updatedTodo);
});

// Delete a to-do item
app.delete('/api/todo/:id', (req, res) => {
    const id = req.params.id;
    todoItems.splice(id, 1);
    res.json({ message: 'Todo item deleted successfully.' });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    users.findByUsername(username, (err, results) => {
      if (err) throw err;
      const user = results[0];
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({ username: user.username }, 'SECRET_KEY', { expiresIn: '1h' });
        res.json({ token });
      } else {
        res.status(401).json({ error: 'Invalid username or password' });
      }
    });
  });
  