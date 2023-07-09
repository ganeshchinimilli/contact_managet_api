const express = require('express');
const {getContact,createContact,editContact,getSingleContact,deleteContact} = require('../controllers/contactController');
const vaildateToken = require('../middleware/validateToken');
const router = express.Router();
router.use(vaildateToken);
router.route('/').get(getContact).post(createContact);
router.route('/:id').put(editContact).get(getSingleContact).delete(deleteContact);



module.exports = router;


