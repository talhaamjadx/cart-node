const User = require("../models/usersModel");
const crypto = require("crypto");

exports.getLogin = (req, res, next) => {
    res.render("login", { isLoggedIn: req.session.isLoggedIn })
}

exports.postLogin = (req, res, next) => {
    // res.setHeader("Set-Cookie", "loggedIn=true");
    User.findOne({ email: req.body.email })
        .then(user => {
            let encryptedPass = crypto.createHmac('sha256', "mumbojumbo").update(req.body.password).digest('hex');
            if (user.password === encryptedPass) {
                req.session.isLoggedIn = true
                req.session.user = user
                req.session.save((err) => {
                    if (!err) {
                        res.redirect("/")
                    }
                })
            }
            else
                throw new Error("Password is incorrect!")
        })
        .catch(err => {
            console.log(err)
            res.send(err)
        })
}

exports.getSignup = (req, res, next) => {
    res.render("signup", { isLoggedIn: req.session.isLoggedIn })
}

exports.postSignup = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(foundUser => {
            if (!foundUser) {
                let encryptedPass = crypto.createHmac('sha256', "mumbojumbo").update(req.body.password).digest('hex');
                const user = new User({ name: req.body.name, email: req.body.email, password: encryptedPass, cart: { items: [] }, orders: [] })
                return user.save()
            }
            else
                throw new Error("User already exists")
        })
        .then(result => {
            console.log(result)
            res.redirect("/login")
        })
        .catch(err => {
            console.log(err)
            res.send(err)
        })
}

exports.postLogout = (req, res, next) => {
    req.session.destroy(err => {
        console.log(err)
        res.redirect("/")
    })
}