const express = require('express');
const router = express.Router();
const { uploadPdf } = require('../helpers/upload');
const { getLatestCV, uploadCV, downloadLatestCV } = require('../controllers/cvController');

router.get('/latest', getLatestCV);
router.get('/download', downloadLatestCV);
router.patch('/', uploadPdf.single('cv'), uploadCV);
router.post('/upload', uploadPdf.single('cv'), uploadCV);

module.exports = router;
