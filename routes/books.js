const express = require("express")

const router = express.Router()

const { addBookController, saveBookController, fetchBooksController, bookByIdController, editBookController, getEditBookController, deleteBookController } = require("../controllers/books")

router.get('/add-book', addBookController);

router.get('/all-books', fetchBooksController);

router.post('/book/edit/:id', editBookController);

router.post('/book/edit/:id/handle', getEditBookController);

router.post('/add-book', saveBookController);

router.post('/book/delete/:id', deleteBookController);

router.get('/book/:id', bookByIdController);

module.exports = router