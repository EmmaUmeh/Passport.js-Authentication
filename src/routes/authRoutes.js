const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');




router.app.post('/login', authController.login);
router.app.post('/register', authController.register);


module.exports = router;
