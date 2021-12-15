const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY)

exports.getCheckout = (req, res, next) => {
    res.render("checkout")
}

exports.createPayment = async (req, res, next) => {
    stripe.charges.create({
        amount: 2000,
        currency: 'usd',
        source: req.body.token,
        description: 'My First Test Charge (created for API docs)',
    })
    .then(result => {
        res.send(result.status)
    })
    .catch(err => {
        const error = new Error(err)
        error.httpStatusCode = 500
        return next(error)
    })
}