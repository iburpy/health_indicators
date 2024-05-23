const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    'indicadores_supposedug', 
    'indicadores_supposedug', 
    '55d2615c3db0da611f60454b193bd10792679050', 
    {
        host: 'chw.h.filess.io',
        dialect: 'mysql',
        port: 3307
    }
);

module.exports = { sequelize };