exports.getOrdersController = (req, res, next) => {
    req.user.populate({
        path: "orders.orderId",
        populate:{
            path: "books.bookId"
        }
    })
    .then(user => {
        console.log(user.orders[0].orderId.books)
        res.render("orders", { orders: user.orders })
    })
    .catch(err => {
        const error = new Error(err)
        error.httpStatusCode = 500
        return next(error)
    })
}

exports.createOrderController = (req, res, next) => {
    req.user.createOrder()
    .then(result => {
        console.log(result)
        res.redirect('/orders')
    })
    .catch(err => {
        const error = new Error(err)
        error.httpStatusCode = 500
        return next(error)
    })
}