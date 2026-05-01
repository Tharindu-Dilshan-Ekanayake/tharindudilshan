const express = require('express');
const router = express.Router();
const { upload } = require('../helpers/upload');
const { 
    getAllVlogs,
    
    createVlog,
    updateVlog,
    deleteVlog
} = require('../controllers/vlogsController');

// GET all vlogs
router.get('/vlogs', getAllVlogs);

// POST a new vlog
router.post('/postvlog', upload.single('cover_image'), createVlog);

// PUT (update) an existing vlog
router.put('/vlogs/:id', upload.single('cover_image'), updateVlog);

// DELETE a vlog
router.delete('/vlogs/:id', deleteVlog);

module.exports = router;
