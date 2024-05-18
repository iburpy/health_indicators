const router = require('express').Router();
const express = require('express');
const { 
    getUnits, 
    getUnitById,
    createUnit,
    updateUnit,
    deleteUnit
 } = require('../controllers/units.config.controller');

router.use(express.json({ prettyPrint: true }));

router.get('/units', getUnits);
router.get('/units/:id', getUnitById);
router.post('/create/units', createUnit);
router.put('/edit/units/:id', updateUnit);
router.delete('/delete/units/:id', deleteUnit);

module.exports = router;