const express = require('express');
const router = express.Router();
const authenticateJWT = require('./authenticateJWT');

let todoItems = [];

// Get all to-do items
router.get('/api/todo', authenticateJWT, (req, res) => {
    res.json(todoItems);
});

// Create a new to-do item
router.post('/api/todo', authenticateJWT, (req, res) => {
    const newTodo = req.body;
    todoItems.push(newTodo);
    res.json(newTodo);
});

// Update an existing to-do item
router.put('/api/todo/:id', authenticateJWT, (req, res) => {
    const id = req.params.id;
    const updatedTodo = req.body;
    todoItems[id] = updatedTodo;
    res.json(updatedTodo);
});

// Delete a to-do item
router.delete('/api/todo/:id', authenticateJWT, (req, res) => {
    const id = req.params.id;
    todoItems.splice(id, 1);
    res.json({ message: 'Todo item deleted successfully.' });
});

module.exports = router;
