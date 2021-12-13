const express = require("express");

const router = express.Router();

const isAuth = require("../middlelwares/auth-guard")

const { getCartController, addBookToCartController, cartItemRemoveController } = require("../controllers/cart")

router.get('/cart', isAuth, getCartController)

router.post('/cart/add/:id', isAuth, addBookToCartController)

router.post('/cart/remove-item/:id', isAuth, cartItemRemoveController)

module.exports = router;