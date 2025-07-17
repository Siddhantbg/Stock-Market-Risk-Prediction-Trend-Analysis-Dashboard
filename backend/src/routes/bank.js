
const express = require('express');
const { addBankDetails, getAllUsers, linking, getLoggedUserDetails } = require('../controllers/bankcontoller.js');
const authMiddleware = require('../middleware/authMiddleware.js');

const router = express.Router();

router.post('/add',authMiddleware, addBankDetails);
router.get('/all-users',authMiddleware, getAllUsers);
router.get('/user-details',authMiddleware, getLoggedUserDetails);
router.post('/linking', authMiddleware,linking);

module.exports = router;