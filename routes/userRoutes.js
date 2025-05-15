const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateToken = require('../middleware/authMiddleware');

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.post('/refresh-token', userController.refreshToken);
router.get('/get', authenticateToken, userController.getAllUsers);



module.exports = router;

// domain/api/users/