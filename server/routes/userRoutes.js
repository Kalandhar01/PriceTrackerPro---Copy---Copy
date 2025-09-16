const express = require('express');
const { getBalance, updateBalance } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/balance', protect, getBalance);
router.post('/balance', protect, updateBalance);

module.exports = router;
