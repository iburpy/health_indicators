const express = require('express');
const router = express.Router();

router.get('/health', (req, res) => {
    const formattedDate = new Date( new Date().toUTCString() ).toLocaleString()
    const epoch_s = (Date.now() / 1000).toFixed(2);
    const health = {
        estado_servidor: 'OK',
        tiempo_activo: `${process.uptime().toFixed(2)}s`,
        epoch: `${epoch_s}s`,
        fecha: formattedDate
    };

    try {
        // JSON Prettify
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(health, null, 2));
    } catch (error) {
        health.estado_servidor = error;
        res.status(503).send(health);
    }
})

module.exports = router;