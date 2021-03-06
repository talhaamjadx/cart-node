require('dotenv').config()
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const multer = require("multer");

const fileStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "images")
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname)
    }
})

const fileFilter = (req, file, callback) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        callback(null, true)
    }
    else
        callback(null, false)
}

const path = require("path")

const csrf = require("csurf");

const session = require("express-session");

const MongoDBStore = require("connect-mongodb-session")(session)

const MongoDBUri = process.env.MONGO_DB_KEY

const store = new MongoDBStore({
    uri: MongoDBUri,
    collection: "sessions"
})

const csrfProtection = csrf()

const mongoose = require("mongoose")

const User = require("./models/usersModel")

const mainRouter = require('./routes/main')

const booksRouter = require('./routes/books')

const authRouter = require('./routes/auth')

const paymentRouter = require('./routes/payment')

const errorRouter = require('./routes/errors')

// let globalUser = null;

// const User = require("./models/usersModel");
const CartRouter = require('./routes/cart')

const OrderRouter = require('./routes/orders')

// const mongoClient = require("./utils/database").mongoClient;

app.use(bodyParser.urlencoded({ extended: false }))

app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single('image'))

app.use(express.static(path.join(__dirname, 'public')))
app.use('/images', express.static(path.join(__dirname, 'images')))

//always add csrf protection middleware after the bodyparser middleware

app.use(session({
    secret: "monica belluci",
    resave: false,
    saveUninitialized: false,
    store: store
}))

app.use(csrfProtection)

app.use((req, res, next) => {
    res.locals.isLoggedIn = req.session.isLoggedIn
    res.locals.csrfToken = req.csrfToken()
    next()
})

app.set("views", "views")

app.set("view engine", "ejs")

app.use((req, res, next) => {
    if (req.session.user)
        User.findById(req.session.user._id)
            .then(user => {
                req.user = user
                next()
            })
            .catch(err => {
                res.send(err)
            })
    else
        next()
})

app.use('/books', booksRouter)

app.use(CartRouter)

app.use(OrderRouter)

app.use(authRouter)

app.use(paymentRouter)

app.use(errorRouter)

app.use(mainRouter)

//error middleware
app.use((error, req, res, next) => {
    console.log(error)
    res.redirect('/error')
})

mongoose.connect(MongoDBUri)
    .then(() => {
        app.listen(4000, () => console.log("Server is running on port 4000"))
    })
    .catch(err => {
        console.log(err)
    })