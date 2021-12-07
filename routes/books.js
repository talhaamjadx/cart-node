const express = require("express")

const router = express.Router()

const { addBookController, saveBookController, fetchBooksController, bookByIdController } = require("../controllers/books")

router.get('/add-book', addBookController);

router.get('/all-books', fetchBooksController);

router.post('/add-book', saveBookController);

router.get('/book/:id', bookByIdController);

module.exports = router