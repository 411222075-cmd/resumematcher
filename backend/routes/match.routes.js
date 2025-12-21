const express = require('express');
const router = express.Router();
const matchController = require('../controllers/match.controller');
const authMiddleware = require('../middleware/auth');

router.post('/match', authMiddleware, matchController.matchResume);
router.get('/history', authMiddleware, matchController.getHistory);

module.exports = router;


module.exports = router;