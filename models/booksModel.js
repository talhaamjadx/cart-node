const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

const Book = sequelize.define('books', {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    author: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    price: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING(255),
        allowNull: false
    }
})

module.exports = Book