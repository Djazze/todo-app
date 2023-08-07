const express = require('express');
const router = express.Router();
const authenticateJWT = require('./authenticateJWT');
const Todo = require('./models/Todo'); // Import the Todo model

// Get all to-do items
router.get('/api/todo', authenticateJWT, async (req, res) => {
    const todos = await Todo.findAll({ where: { userId: req.user.id } });
    res.json(todos);
});

// Create a new to-do item
router.post('/api/todo', authenticateJWT, async (req, res) => {
    const newTodo = await Todo.create({ ...req.body, userId: req.user.id });
    res.json(newTodo);
});

// Update an existing to-do item
router.put('/api/todo/:id', authenticateJWT, async (req, res) => {
    const id = req.params.id;
    const updatedTodo = await Todo.update(req.body, { where: { id, userId: req.user.id } });
    res.json(updatedTodo);
});

// Delete a to-do item
router.delete('/api/todo/:id', authenticateJWT, async (req, res) => {
    const id = req.params.id;
    await Todo.destroy({ where: { id, userId: req.user.id } });
    res.json({ message: 'Todo item deleted successfully.' });
});

module.exports = router;
