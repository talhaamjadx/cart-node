exports.mainController = (req, res, next) => {
    res.render('index')
}

exports._404Controller = (req, res, next) => {
    res.render('404')
}


