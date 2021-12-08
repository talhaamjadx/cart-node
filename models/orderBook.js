const { DataTypes } = require("sequelize")

const sequelize = require("../utils/database");

const OrderBook = sequelize.define('orderbook', {
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

module.exports = OrderBook