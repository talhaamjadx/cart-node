exports.mainController = (req, res, next) => {
    console.log(req.session, "session")
    res.render('index')
}

exports._404Controller = (req, res, next) => {
    res.render('404')
}


