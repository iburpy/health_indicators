const app = require('./app/app.js');
const port = 3001;
const healthcheck = 'api/health';
app.listen(port, () => {
        console.log(`
                Servidor corriendo en puerto ${port}
                Enlace \thttp://localhost:${port} 
                Estado \thttp://localhost:${port}/${healthcheck}`);
});
