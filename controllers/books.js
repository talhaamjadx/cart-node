const { populate } = require("../models/booksModel");
const Book = require("../models/booksModel");

exports.addBookController = (req, res, next) => {
    res.render("add-book")
}

exports.fetchBooksController = (req, res, next) => {
    Book.find()
    .populate('userId')
    .then(result => {
        console.log(result)
        res.render('all-books', { books: result})
    })
    .catch(err => {
        res.send(err)
    })
}

exports.bookByIdController = (req, res, next) => {
    Book.findById(req.params.id)
    .then(result => {
        res.render('single-book', { book: result })
    })
    .catch(err => {
        res.send(err)
    })
}

exports.editBookController = (req, res, next) => {
    res.render("edit-book", {book:req.body})
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
        res.redirect('/books/book/'+req.params.id)
    })
    .catch(err => {
        console.log(err)
        res.send(err)
    })
}

exports.deleteBookController = (req, res, next) => {
   Book.findByIdAndDelete(req.params.id)
   .then(() => {
       res.redirect('/books/all-books')
   })
   .catch(err => {
       res.send(err)
   })
}

exports.saveBookController = (req, res, next) => {
    const book = new Book({ name: req.body.bookName, author: req.body.bookAuthor, price: req.body.bookPrice, description: req.body.bookDescription, userId: req.user})
    book.save()
        .then(result => {
            console.log(result)
            res.redirect("/books/all-books")
        })
        .catch(err => {
            console.log(err)
            res.send(err)
        })
}