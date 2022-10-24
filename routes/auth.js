const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const authValidation = require('../validations/authValidation');
const isAuth = require('../middleware/is-auth');

// PUT /auth/signup 
router.put('/signup', authValidation.signUp, authController.signUp);

// POST /auth/login 
router.post('/login', authController.logIn);

// GET /auth/status 
router.get('/status', isAuth, authController.getStatus);

// PATCH /auth/status 
router.patch('/status', isAuth, authValidation.changeStatus, authController.changeUserStatus);

module.exports = router;