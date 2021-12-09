const { ExclusionConstraintError } = require("sequelize/dist");
const Book = require("../models/booksModel");

exports.getCartController = (req, res, next) => {
    req.user.populate('cart.items.bookId')
    .then(user => {
        res.render("cart", {books: user.cart.items})
    })    
    .catch(err => {
        console.log(err)
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
    Book.findById(req.params.id)
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