const express = require("express")

const router = express.Router();

const { getCheckout, createPayment } = require("../controllers/payment");

router.get("/checkout", getCheckout)

router.post("/checkout", createPayment)

module.exports = router