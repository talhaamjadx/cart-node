const Book = require("../models/booksModel");

exports.getCartController = (req, res, next) => {
    req.user.getCart()
        .then(books => {
            res.render('cart', { books: books })
        })
    .catch(err => {
        res.send(err)
    })
}

exports.cartItemRemoveController = (req, res, next) => {
    req.user.removeBookFromCart(req.params.id)
    .then(() => {
        res.redirect('/cart')
    })
    .catch(err => {
        res.send(err)
    })
}

exports.addBookToCartController = (req, res, next) => {
    Book.fetchOne(req.params.id)
        .then(book => {
            return req.user.addToCart(book)
        })
        .then(result => {
            console.log(result)
            res.redirect("/cart")
        })
        .catch(err => {
            console.log(err)
            res.send(err)
        })
}