const express = require('express');
const { createShortUrl, getUrls } = require('../controllers/urlController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/shorten', authMiddleware, createShortUrl);
router.get('/', authMiddleware, getUrls);

module.exports = router;
