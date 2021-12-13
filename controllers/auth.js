const User = require("../models/usersModel");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const sendGridTransport = require("nodemailer-sendgrid-transport")

const transporter = nodemailer.createTransport(sendGridTransport({
    auth:{
        api_key: process.env.SENDGRID_KEY
    }
}))

exports.getLogin = (req, res, next) => {
    res.render("login")
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
    res.render("signup")
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
            return transporter.sendMail({
                to: req.body.email,
                from: "talhaamjadx@live.com",
                subject: "Testing email. Does it work?",
                html: "<h1>This is a heading</h1>"
            })
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