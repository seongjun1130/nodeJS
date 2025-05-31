const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('tesdb','admin','admin',{
    host: 'localhost',
    port: 3500,
    dialect:'mysql'
});

module.exports = sequelize;