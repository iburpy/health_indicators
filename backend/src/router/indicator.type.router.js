const express = require('express');
const router = express.Router();

const {
    getIndicatorTypes,
    getIndicatorTypeById,
    createIndicatorType,
    updateIndicatorType,
    deleteIndicatorType
} = require('../controllers/indicator.type.controller.js');

router.get('/indicators/types', getIndicatorTypes);
router.get('/indicators/types/:id', getIndicatorTypeById);
router.post('/create/indicators/types', createIndicatorType);
router.put('/edit/indicators/types/:id', updateIndicatorType);
router.delete('/delete/indicators/types/:id', deleteIndicatorType);

module.exports = router;