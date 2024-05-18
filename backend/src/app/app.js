const express = require('express');
const morgan = require('morgan');
const app = express();

const health = require('../router/healthcheck.js');
const GenderRouter = require('../router/gender.router.js');
const EmergencyRouter = require('../router/emergency.contact.router.js');
const UserRouter = require('../router/user.router.js');
const HealthGoalRouter = require('../router/health.goal.router.js');
const IndicatorRouter = require('../router/indicator.router.js');
const IndicatorTypeRouter = require('../router/indicator.type.router.js');
const UnitsConfigRouter = require('../router/units.config.router.js');

app.get('/', (req, res) => {
    res.send('Hello! This is Express.');
});
app.use(morgan('dev'));
app.use(express.json());
app.use('/api', health);
//Inicializador de Rutas
app.use('/api', UserRouter);
app.use('/api', GenderRouter);
app.use('/api', EmergencyRouter);
app.use('/api', HealthGoalRouter);
app.use('/api', IndicatorRouter);
app.use('/api', IndicatorTypeRouter);
app.use('/api', UnitsConfigRouter);

module.exports = app;
