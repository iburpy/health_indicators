const express = require('express');
const router = express.Router();

const {
    getIndicators,
    getIndicatorById,
    createIndicator,
    updateIndicator,
    deleteIndicator
} = require('../controllers/indicator.controller.js');

router.use(express.json());

router.get('/indicators', getIndicators);
router.get('/indicators/:id', getIndicatorById);
router.post('/indicators/create', createIndicator);
router.put('/indicators/edit/:id', updateIndicator);
router.delete('/indicators/edit/:id', deleteIndicator);

module.exports = router;