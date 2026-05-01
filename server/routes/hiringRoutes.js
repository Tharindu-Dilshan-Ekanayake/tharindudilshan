const express = require('express');
const router = express.Router();
const { postmessage, getallmessage, getreadmessage, getunreadmessage, deletemessage, setMessageAsRead } = require('../controllers/hiringController')

router.post('/hiremepost', postmessage);
router.get('/getmessage', getallmessage);

router.get('/getreadmessage', getreadmessage);
router.get('/getunreadmessage', getunreadmessage);

router.delete('/deletemessage/:id', deletemessage)

router.put('/putread/:id', setMessageAsRead)

module.exports = router;
