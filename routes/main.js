const express = require("express")

const router = express.Router()

const { mainController, _404Controller } = require("../controllers/main")

router.get('/', mainController);

router.use(_404Controller);

module.exports = router