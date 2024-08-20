const express = require('express');
const router = express.Router();
const authController = require('../controllers/authControllers');

router.post('/login', authController.login);
router.post('/refresh-token', authController.refreshToken);

module.exports = router;
