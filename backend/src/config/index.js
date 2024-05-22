const app = require('../app/app.js');

const url = {
        host: 'http://localhost',
        port: 3001,
        health: '/api/health'
};

app.listen(url.port, () => {console.log(`Servidor corriendo en puerto en ${url.port}\n`, `- Enlace\t${url.host}:${url.port}${url.health}`);});