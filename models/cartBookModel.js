const { DataTypes } = require("sequelize")

const sequelize = require("../utils/database");

const CartBook = sequelize.define('cartbook', {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

module.exports = CartBook