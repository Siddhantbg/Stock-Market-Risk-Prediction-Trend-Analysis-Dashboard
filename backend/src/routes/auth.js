
const express = require('express');
const router = express.Router();
const { register, login, linking, details, update } = require('../controllers/authController.js');

router.post('/register', register);
router.post('/login', login);
router.post('/linking', linking);
router.post('/updatedet', update);

module.exports = router;
