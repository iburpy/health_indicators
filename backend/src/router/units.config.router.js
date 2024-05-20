const express = require('express');
const router = express.Router();

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
router.post('/units/create', createUnit);
router.put('/units/edit/:id', updateUnit);
router.delete('/units/delete/:id', deleteUnit);

module.exports = router;