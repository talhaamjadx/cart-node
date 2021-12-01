exports.mainController = (req, res, next) => {
    res.send("hello from main controller");
}

exports._404Controller = (req, res, next) => {
    res.send("<h1>404 page not found</h1>");
}


