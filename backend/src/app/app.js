const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();

const { test_con } = require('../config/conn.test.js');
const health = require('../router/healthcheck.js');
const GenderRouter = require('../router/gender.router.js');
const EmergencyRouter = require('../router/emergency.contact.router.js');
const UserRouter = require('../router/user.router.js');
const HealthGoalRouter = require('../router/health.goal.router.js');
const IndicatorRouter = require('../router/indicator.router.js');
const IndicatorTypeRouter = require('../router/indicator.type.router.js');
const UnitsConfigRouter = require('../router/units.config.router.js');

app.get('/', (req, res) => { res.send(res.redirect('/api/health')) });
app.use(cors({ origin: 'http://localhost:5173',
    credentials: true
 })); //esto es para permitir que todos los dominios se puedan comunicar en el servidor

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
// Inicializador de Rutas
app.use('/api', health);
app.use('/api', UserRouter);
app.use('/api', GenderRouter);
app.use('/api', EmergencyRouter);
app.use('/api', HealthGoalRouter);
app.use('/api', IndicatorRouter);
app.use('/api', IndicatorTypeRouter);
app.use('/api', UnitsConfigRouter);

test_con();

module.exports = app;
