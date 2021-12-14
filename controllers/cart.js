const Book = require("../models/booksModel");

exports.getCartController = (req, res, next) => {
    req.user.populate('cart.items.bookId')
    .then(user => {
        res.render("cart", {books: user.cart.items})
    })    
    .catch(err => {
        const error = new Error(err)
        error.httpStatusCode = 500
        return next(error)
    })
}

exports.cartItemRemoveController = (req, res, next) => {
    req.user.removeBookFromCart(req.params.id)
    .then(() => {
        res.redirect('/cart')
    })
    .catch(err => {
        const error = new Error(err)
        error.httpStatusCode = 500
        return next(error)
    })
}

exports.addBookToCartController = (req, res, next) => {
    Book.findById(req.params.id)
        .then(book => {
            console.log(req.user, "user")
            return req.user.addToCart(book)
        })
        .then(result => {
            console.log(result)
            res.redirect("/cart")
        })
        .catch(err => {
            const error = new Error(err)
            error.httpStatusCode = 500
            return next(error)
        })
}