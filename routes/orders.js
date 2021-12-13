const express = require("express");

const router = express.Router();

const isAuth = require("../middlelwares/auth-guard")

const { getOrdersController, createOrderController } = require("../controllers/orders")

router.get('/orders', isAuth, getOrdersController)

router.post('/orders/create', isAuth, createOrderController)

module.exports = router;