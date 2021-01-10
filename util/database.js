const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', 'you@ssef99', {
    dialect: 'mysql',
    host: 'localhost'
});


module.exports = sequelize;
