const express = require('express');
const db = require('./db'); // Assuming db.js is where you establish your MySQL connection

const router = express.Router();

// Create a new task
router.post('/tasks', (req, res) => {
    const { title, dueDate, completed } = req.body;
    const sql = 'INSERT INTO tasks (title, due_date, completed) VALUES (?, ?, ?)';
    db.query(sql, [title, dueDate, completed], (err, result) => {
        if (err) throw err;
        res.send({ id: result.insertId, ...req.body });
    });
});

// Get all tasks
router.get('/tasks', (req, res) => {
    const sql = 'SELECT * FROM tasks';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

// Update a task
router.put('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const { title, dueDate, completed } = req.body;
    const sql = 'UPDATE tasks SET title = ?, due_date = ?, completed = ? WHERE id = ?';
    db.query(sql, [title, dueDate, completed, id], (err, result) => {
        if (err) throw err;
        res.send({ id, ...req.body });
    });
});

// Delete a task
router.delete('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM tasks WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) throw err;
        res.send({ message: 'Task deleted successfully.' });
    });
});

module.exports = router;
