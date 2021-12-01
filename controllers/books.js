const BookModel = require("../models/booksModel");

exports.addBookController = (req, res, next) => {
    res.render("add-book")
}

exports.saveBookController = (req, res, next) => {
    const book = new BookModel(req.body.bookName)
    book.addBook()
    res.redirect('/')
}