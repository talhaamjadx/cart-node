exports.getOrdersController = (req, res, next) => {
    req.user.getOrders({ include: ['books'] })
    .then(orders => {
        res.render("orders", {orders:orders})
    })
    .catch(err => {
        res.send(err)
    })
}

exports.createOrderController = (req, res, next) => {
    let fetchedCart;
    req.user.getCart()
    .then(cart => {
        fetchedCart = cart
        return cart.getBooks()
    })
    .then(books => {
        return req.user.createOrder()
        .then(order => {
            return order.addBooks(books.map(book => {
                book.orderbook = { quantity: book.cartbook.quantity }
                return book
            }))
        })
        .catch(err => {
            res.send(err)
        })
    })
    .then(() => {
        return fetchedCart.setBooks(null)
    })
    .then(() => {
        res.redirect("/orders")
    })
    .catch(err => {
        console.log(err)
        res.send(err)
    })
}