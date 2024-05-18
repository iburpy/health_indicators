const router = require('express').Router();

const {
    getHealthGoals,
    getHealthGoalById,
    createHealthGoal,
    updateHealthGoal,
    deleteHealthGoal
} = require('../controllers/health.goal.controller.js');

router.get('/goals', getHealthGoals);
router.get('/goals/:id', getHealthGoalById);
router.post('/goals/create', createHealthGoal);
router.put('/goals/edit/:id', updateHealthGoal);
router.delete('/goals/delete/:id', deleteHealthGoal);

module.exports = router;