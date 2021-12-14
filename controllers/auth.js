const User = require("../models/usersModel");
const ResetToken = require("../models/resetTokensModel");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const sendGridTransport = require("nodemailer-sendgrid-transport")

const { validationResult } = require("express-validator")

const transporter = nodemailer.createTransport(sendGridTransport({
    auth: {
        api_key: process.env.SENDGRID_KEY
    }
}))

exports.getLogin = (req, res, next) => {
    res.render("login")
}

exports.postLogin = (req, res, next) => {
    const errors = validationResult(req)
    // res.setHeader("Set-Cookie", "loggedIn=true");
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }
    User.findOne({ email: req.body.email })
        .then(user => {
            let encryptedPass = crypto.createHmac('sha256', process.env.ENCRYPTION_KEY).update(req.body.password).digest('hex');
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
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }
    User.findOne({ email: req.body.email })
        .then(foundUser => {
            if (!foundUser) {
                let encryptedPass = crypto.createHmac('sha256', process.env.ENCRYPTION_KEY).update(req.body.password).digest('hex');
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

exports.getResetPassword = (req, res, next) => {
    res.render("reset-password")
}

exports.postNewPassword = (req, res, next) => {
    let email = ""
    ResetToken.findOne({ token: req.body.token })
        .then((result) => {
            if (!result)
                return res.send("Reset token is invalid!")
            else {
                email = result.email
                return User.findOne({ email: result.email })
            }
        })
        .then(user => {
            user.password = crypto.createHmac('sha256', process.env.ENCRYPTION_KEY).update(req.body.new_password).digest('hex');
            return user.save()
        })
        .then(() => {
            return ResetToken.deleteMany({ email: email })
        })
        .then(() => {
            res.send("password updated")
        })
        .catch(err => {
            console.log(err)
        })
}

exports.getNewPassword = (req, res, next) => {
    res.render("new-password", { token: req.query.token })
}

exports.postResetPassword = async (req, res, next) => {
    let token = await new Promise((resolve, reject) => {
        crypto.randomBytes(32, (err, buff) => {
            if (!err)
                resolve(buff.toString('hex'))
            else
                reject("error in hashing token")
        })
    })
    const resetToken = new ResetToken({
        token: token,
        email: req.body.email
    })
    resetToken.save()
        .then(() => {
            transporter.sendMail({
                to: req.body.email,
                from: "talhaamjadx@live.com",
                subject: "Password Reset",
                html: `<div><p>Click here to reset your password</p><a href='http://localhost:4000/new-password?token=${token}' target='_blank'>Reset Password!</a></div>`
            })
            res.send("An email has been sent to your email!")
        })
        .catch(err => {
            res.send(err)
        })
}