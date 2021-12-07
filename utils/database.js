const Sequelize = require("sequelize");

const sequelize = new Sequelize('new_schema', 'root', 'iamnumber4', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;