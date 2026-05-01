const express = require('express');
const router = express.Router();
const { 
    getAllVlogs,
    
    createVlog,
    updateVlog,
    deleteVlog
} = require('../controllers/vlogsController');

// GET all vlogs
router.get('/vlogs', getAllVlogs);

// POST a new vlog
router.post('/postvlog', createVlog);

// PUT (update) an existing vlog
router.put('/vlogs/:id', updateVlog);

// DELETE a vlog
router.delete('/vlogs/:id', deleteVlog);

module.exports = router;
