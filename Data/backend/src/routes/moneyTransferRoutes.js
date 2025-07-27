const express = require('express');
const { RequestMoney, allRequestMoney, allrequest, createMoneyTransfer, getMoneyTransfers } = require('../controllers/moneyTransferController.js');
const authMiddleware = require('../middleware/authMiddleware.js');

const router = express.Router();

router.post('/create', authMiddleware, createMoneyTransfer);
router.get('/', authMiddleware, getMoneyTransfers);
router.post('/money-requested', authMiddleware, RequestMoney);
router.get('/request', allrequest);
router.get('/all-request-money', authMiddleware, allRequestMoney);

module.exports = router;