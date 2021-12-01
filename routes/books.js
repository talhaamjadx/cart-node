const express = require("express")

const router = express.Router()

const { addBookController, saveBookController } = require("../controllers/books")

router.get('/add-book', addBookController);

router.post('/add-book', saveBookController);

module.exports = router