const BookModel = require("../models/booksModel");

exports.addBookController = (req, res, next) => {
    res.render("add-book")
}

exports.fetchBooksController = (req, res, next) => {
    BookModel.findAll()
    .then(result => {
        res.render('all-books', { books: result})
    })
    .catch(err => {
        res.send(err)
    })
}

exports.bookByIdController = (req, res, next) => {
    BookModel.findByPk(req.params.id)
    .then(result => {
        res.render('single-book', { book: result.dataValues })
    })
    .catch(err => {
        res.send(err)
    })
}

exports.editBookController = (req, res, next) => {
    res.render("edit-book", {book:req.body})
}

exports.getEditBookController = (req, res, next) => {
    BookModel.update(req.body, { where: { id: req.params.id } })
    .then(result => {
        res.redirect('/books/book/'+req.params.id)
    })
    .catch(err => {
        res.send(err)
    })
}

exports.deleteBookController = (req, res, next) => {
   BookModel.destroy({
       where: {
           id: req.params.id
       }
   })
   .then(() => {
       res.redirect('/books/all-books')
   })
   .catch(err => {
       res.send(err)
   })
}

exports.saveBookController = (req, res, next) => {
    req.user.createBook({
        name: req.body.bookName,
        author: req.body.bookAuthor,
        price: req.body.bookPrice,
        description: req.body.bookDescription
    })
    .then((result) => {
        res.redirect('/books/book/'+result.dataValues.id)
    })
    .catch(err => {
        res.send(err)
    })
}