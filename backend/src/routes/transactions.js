
const express = require('express');
const { addTransaction, getTransactions, deleteTransaction } = require('../controllers/transactionController.js');
const authMiddleware = require('../middleware/authMiddleware.js');

const router = express.Router();

router.post('/', authMiddleware, addTransaction);
router.get('/', authMiddleware, getTransactions);
router.delete('/:id', authMiddleware, deleteTransaction);

module.exports = router;
