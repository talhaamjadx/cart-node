const express = require("express")

const router = express.Router()

const isAuth = require("../middlelwares/auth-guard")

const { addBookController, saveBookController, fetchBooksController, bookByIdController, editBookController, getEditBookController, deleteBookController } = require("../controllers/books")

router.get('/add-book', isAuth, addBookController);

router.get('/all-books', fetchBooksController);

router.post('/book/edit/:id', isAuth, editBookController);

router.post('/book/edit/:id/handle', isAuth, getEditBookController);

router.post('/add-book', isAuth, saveBookController);

router.post('/book/delete/:id', isAuth, deleteBookController);

router.get('/book/:id', bookByIdController);

module.exports = router