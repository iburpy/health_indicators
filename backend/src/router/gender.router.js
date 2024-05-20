const express = require('express');
const router = express.Router();

const { 
        getGenders, 
        getGenderById,
        createGender,
        updateGender,
        deleteGender

    } = require('../controllers/gender.controller.js');

router.use(express.json());

router.get('/genders', getGenders);
router.get('/genders/:id', getGenderById);
router.post('/create/genders', createGender);
router.put('/edit/genders/:id', updateGender);
router.delete('/delete/genders/:id', deleteGender);

module.exports = router;