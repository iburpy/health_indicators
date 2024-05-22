const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    'id22201876_indicadores', 
    'id22201876_root', 
    '', 
    {
        host: '2a02:4780:bad:c0de::14',
        dialect: 'mysql',
        port: 3306
    }
);

module.exports = { sequelize };