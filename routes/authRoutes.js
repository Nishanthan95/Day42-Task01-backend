const express = require('express');
const { register, login, activateAccount } = require('../controllers/authController');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/activate/:token', activateAccount);

module.exports = router;
