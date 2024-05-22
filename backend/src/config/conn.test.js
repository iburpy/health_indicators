const { sequelize } = require('./db.js');

async function test_con() { 
    try {
        await sequelize.authenticate();
        console.log(`¡La conexión a la base de datos '${sequelize.config.database}' en '${sequelize.config.host}' ha sido existosa!`);  
    } catch (error) { 
        console.error(`¡Uy! Como que ha ocurrido un error al conectarse a la base de datos '${sequelize.config.database}'. Error: ${error}`);
    }
}

module.exports = { test_con };