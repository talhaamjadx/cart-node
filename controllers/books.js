const BookModel = require("../models/booksModel");

exports.addBookController = (req, res, next) => {
    res.render("add-book")
}

exports.fetchBooksController = (req, res, next) => {
    BookModel.getAll().then(([rows, columns]) => {
        res.send(rows)
    })
    .catch(err => res.send(err))
}

exports.bookByIdController = (req, res, next) => {
    BookModel.bookById(req.params.id)
    .then(([rows]) => {
        if(rows.length > 0)
            res.render('single-book', { book: rows[0]})
        else
            res.send('no book against this id')
    })
    .catch(err => {
        res.send(err)
    })
}

exports.saveBookController = (req, res, next) => {
    const book = new BookModel(req.body.bookName,req.body.bookAuthor,req.body.bookPrice,req.body.bookDescription)
    book.addBook().then(() => {
        res.redirect('/')
    })
    .catch(err => {
        res.send(err)
    })
}