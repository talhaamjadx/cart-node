const Book = require("../models/booksModel")

exports.getCartController = (req, res, next) => {
    console.log(req.user)
    req.user.getCart()
        .then(cart => {
            if (!cart) {
                return req.user.createCart()
                    .then(cart => {
                        return cart.getBooks()
                    })
                    .catch(err => {
                        res.send(err)
                    })
            }
            else
                return cart.getBooks()
        })
        .then(books => {
            console.log("in here")
            res.render('cart', { books: books })
        })
        .catch(err => {
            res.send(err)
        })
}

exports.cartItemRemoveController = (req, res, next) => {
    let fetchedCart;
    req.user.getCart()
        .then(cart => {
            fetchedCart = cart
            return cart.removeBook(req.params.id)
        })
        .then(() => {
            return fetchedCart.getBooks()
        })
        .then(books => {
            res.render('cart', { books: books })
        })
        .catch(err => {
            res.send(err)
        })
}

exports.addBookToCartController = (req, res, next) => {
    const bookId = req.params.id
    let fetchedCart;
    req.user.getCart()
        .then(cart => {
            fetchedCart = cart
            return cart.getBooks({ where: { id: bookId } })
        })
        .then(books => {
            let quantity;
            if (books[0]) {
                let book = books[0]
                quantity = book.cartbook.quantity
                return fetchedCart.addBook(book, { through: { quantity: quantity + 1 } })
            }
            else {
                return Book.findByPk(bookId)
                    .then(book => {
                        return fetchedCart.addBook(book, { through: { quantity: 1 } })
                    })
                    .then(() => {
                        res.redirect('/cart')
                    })
                    .catch(err => {
                        res.send(err)
                    })
            }
        })
        .then(() => {
            res.redirect('/cart')
        })
        .catch(err => res.send(err))
}