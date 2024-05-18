const router = require('express').Router();
const express = require('express');
const {
    getContacts,
    getContactById,
    createContact,
    updateContact,
    deleteContact
} = require('../controllers/emergency.contact.controller.js');

router.use(express.json({ prettyPrint: true }));

router.get('/contacts', getContacts);
router.get('/contacts/:num_doc', getContactById);
router.post('/contacts/create', createContact);
router.put('/contacts/edit/:num_doc', updateContact);
router.delete('/contacts/delete/:num_doc', deleteContact); 

module.exports = router;
