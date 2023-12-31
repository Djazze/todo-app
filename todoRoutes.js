const express = require('express');
const router = express.Router();
const authenticateJWT = require('./authenticateJWT');
const Todo = require('./models/Todo');

// Get all to-do items
router.get('/api/todo', authenticateJWT, async (req, res) => {
  // console.log('User in route handler:', req.user); // Log the user
  try {
    const todos = await Todo.findAll({ where: { userId: req.user.id } });
    res.json(todos);
  } catch (err) {
    console.error('Error:', err);
    res.sendStatus(500);
  }
});

// Create a new to-do item
router.post('/api/todo', authenticateJWT, async (req, res) => {
  const newTodo = await Todo.create({ ...req.body, userId: req.user.id, status: 'Pending' }); // Default to 'Pending'
  res.json(newTodo);
});

// Update an existing to-do item
router.put('/api/todo/:id', authenticateJWT, async (req, res) => {
  try {
    const { id: todoId } = req.params; // Get the id from the request parameters
    const { task, column, status } = req.body; // Get the updated task from the request body
    const { id: userId } = req.user; // Get the id from the authenticated user and rename it to userId

    console.log('User in route handler:', req.user.id); // Log the user
    console.log('userId in route handler:', userId); // Log the userId

    // Update the Todo instance with the given id and userId
    await Todo.update({ task, column, status }, { where: { id: todoId, userId } });

    res.json({ message: 'Todo item updated successfully.' });
  } catch (err) {
    console.error('Error:', err);
    res.sendStatus(500);
  }
});

// Delete a to-do item
router.delete('/api/todo/:id', authenticateJWT, async (req, res) => {
  const id = req.params.id;
  await Todo.destroy({ where: { id, userId: req.user.id } });
  res.json({ message: 'Todo item deleted successfully.' });
});

module.exports = router;
