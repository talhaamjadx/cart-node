const User = require("../models/usersModel");

exports.getLogin = (req, res, next) => {
    res.render("login", { isLoggedIn: req.session.isLoggedIn })
}

exports.postLogin = (req, res, next) => {
    // res.setHeader("Set-Cookie", "loggedIn=true");
    User.findById("61b6f6f3e9a437ce225ca143")
        .then(user => {
            req.session.isLoggedIn = true
            req.session.user = user
            req.session.save((err) => {
                if (!err) {
                    res.redirect("/")
                }
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