const express = require('express');
const router = express.Router();
const { createAdmin, loginAdmin, getAdmin, logoutAdmin } = require('../controllers/adminLoginController');

router.post('/register', createAdmin);
router.post('/login', loginAdmin);
router.get('/admin', getAdmin);
router.post('/logout', logoutAdmin);

module.exports = router;
