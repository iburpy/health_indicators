const { Sequelize } = require('sequelize');

const MySQL = {
    name: 'indicadores_salud',
    username: 'root',
    password: '',
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
}
const sequelize = new Sequelize(
    MySQL.name, 
    MySQL.username, 
    MySQL.password, {
      host: MySQL.host,
      dialect: MySQL.dialect,
});

module.exports = {
    MySQL,
    sequelize
}