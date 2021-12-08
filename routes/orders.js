const express = require("express");

const router = express.Router();

const { getOrdersController, createOrderController } = require("../controllers/orders")

router.get('/orders', getOrdersController)

router.post('/orders/create', createOrderController)

module.exports = router;