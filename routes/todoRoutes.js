const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');
const authenticateToken = require('../middleware/authMiddleware');

router.get('/all', authenticateToken, todoController.getAllTodo);
router.get('/', authenticateToken, todoController.getTodo);
router.post('/', authenticateToken, todoController.createTodo);
router.put('/:id', authenticateToken, todoController.updateTodo);
router.delete('/:id', authenticateToken, todoController.deleteTodo);

module.exports = router;
// domain/api/todos/