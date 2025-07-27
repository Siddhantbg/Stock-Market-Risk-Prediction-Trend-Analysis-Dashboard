const express = require('express');
const { FLHistoryRead, FLHistoryWrite } = require('../controllers/flashLoanController.js');

const router = express.Router();

// router.post('/statusRead', FLStatusRead);
// router.post('/statusWrite', FLStatusWrite);
router.post('/historyRead', FLHistoryRead);
router.post('/historyWrite', FLHistoryWrite);

module.exports = router;