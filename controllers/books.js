const Book = require("../models/booksModel");

exports.addBookController = (req, res, next) => {
    res.render("add-book")
}

exports.fetchBooksController = (req, res, next) => {
    Book.find()
        .populate('userId')
        .then(result => {
            // let isLoggedIn = false
            // let cookies = req.get("Cookie").split(";")
            // for(let i = 0; i < cookies.length; i++){
            //     if(cookies[i].trim().split("=")[1] === "true")
            //         isLoggedIn = true
            // }
            res.render('all-books', { books: result })
        })
        .catch(err => {
            const error = new Error(err)
            error.httpStatusCode = 500
            return next(error)
        })
}

exports.bookByIdController = (req, res, next) => {
    Book.findById(req.params.id)
        .then(result => {
            res.render('single-book', { book: result })
        })
        .catch(err => {
            const error = new Error(err)
            error.httpStatusCode = 500
            return next(error)
        })
}

exports.editBookController = (req, res, next) => {
    res.render("edit-book", { book: req.body })
}

exports.getEditBookController = (req, res, next) => {
    Book.findById(req.params.id)
        .then(book => {
            book.name = req.body.name
            book.price = req.body.price
            book.author = req.body.author
            book.description = req.body.description
            return book.save()
        })
        .then(() => {
            res.redirect('/books/book/' + req.params.id)
        })
        .catch(err => {
            const error = new Error(err)
            error.httpStatusCode = 500
            return next(error)
        })
}

exports.deleteBookController = (req, res, next) => {
    Book.findByIdAndDelete(req.params.id)
        .then(() => {
            res.redirect('/books/all-books')
        })
        .catch(err => {
            const error = new Error(err)
            error.httpStatusCode = 500
            return next(error)
        })
}

exports.saveBookController = (req, res, next) => {
    const book = new Book({ name: req.body.bookName, author: req.body.bookAuthor, price: req.body.bookPrice, description: req.body.bookDescription, userId: req.user })
    book.save()
        .then(result => {
            console.log(result)
            res.redirect("/books/all-books")
        })
        .catch(err => {
            const error = new Error(err)
            error.httpStatusCode = 500
            return next(error)
        })
}