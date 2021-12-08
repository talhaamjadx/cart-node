const express = require("express");

const router = express.Router();

const { getCartController } = require("../controllers/cart")

router.get('/cart', getCartController)

module.exports = router;