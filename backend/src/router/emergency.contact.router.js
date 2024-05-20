const express = require('express');
const router = express.Router();

const {
    getContacts,
    getContactById,
    createContact,
    updateContact,
    deleteContact
} = require('../controllers/emergency.contact.controller.js');

router.use(express.json());

router.get('/contacts', getContacts);
router.get('/contacts/:num_doc', getContactById);
router.post('/contacts/create', createContact);
router.put('/contacts/edit/:num_doc', updateContact);
router.delete('/contacts/delete/:num_doc', deleteContact); 

module.exports = router;
