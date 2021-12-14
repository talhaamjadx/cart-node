const express = require("express")

const router = express.Router();

const { error500 } = require("../controllers/errors");

router.get("/error", error500)

module.exports = router