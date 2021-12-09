exports.getOrdersController = (req, res, next) => {
    req.user.getOrders()
    .then(orders => {
        res.render("orders", { orders: orders })
    })
    .catch(err => {
        res.send(err)
    })
}

exports.createOrderController = (req, res, next) => {
    req.user.createOrder()
    .then(result => {
        console.log(result)
        res.redirect('/orders')
    })
    .catch(err => {
        console.log(err)
        res.send(err)
    })
}