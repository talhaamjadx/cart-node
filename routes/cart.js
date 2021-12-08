const express = require("express");

const router = express.Router();

const { getCartController, addBookToCartController, cartItemRemoveController } = require("../controllers/cart")

router.get('/cart', getCartController)

router.post('/cart/add/:id', addBookToCartController)

router.post('/cart/remove-item/:id', cartItemRemoveController)

module.exports = router;