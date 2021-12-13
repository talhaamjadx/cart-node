exports.mainController = (req, res, next) => {
    console.log(req.session, "session")
    res.render('index', { isLoggedIn: req.session.isLoggedIn })
}

exports._404Controller = (req, res, next) => {
    res.render('404')
}


