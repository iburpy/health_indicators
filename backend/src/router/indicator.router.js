const express = require('express');
const router = express.Router();

const {
    getIndicators,
    getIndicatorById,
    createIndicator,
    updateIndicator,
    deleteIndicator
} = require('../controllers/indicator.controller.js');

router.get('/indicators', getIndicators);
router.get('/indicators/:id', getIndicatorById);
router.post('/create/indicators', createIndicator);
router.put('/edit/indicators/:id', updateIndicator);
router.delete('/delete/indicators/:id', deleteIndicator);

module.exports = router;