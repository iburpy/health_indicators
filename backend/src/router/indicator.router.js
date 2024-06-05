const express = require('express');
const router = express.Router();

const {
    getIndicators,
    getIndicatorById,
    getIndicatorsByNumDoc,
    createIndicator,
    updateIndicator,
    deleteIndicator
} = require('../controllers/indicator.controller.js');

router.use(express.json());

router.get('/indicators', getIndicators);
router.get('/indicators/:indicador_id', getIndicatorById);
router.get('/indicator/:num_doc', getIndicatorsByNumDoc);
router.post('/indicators/create', createIndicator);
router.put('/indicators/edit/:indicador_id', updateIndicator);
router.delete('/indicators/edit/:indicador_id', deleteIndicator);

module.exports = router;