const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 3000;
const app = express();

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