const express = require('express');
const app = express();
const bodyParser = require('body-parser')

const path = require("path")

const session = require("express-session");

const MongoDBStore = require("connect-mongodb-session")(session)

const MongoDBUri = "mongodb+srv://talha_789:iamnumber4@cluster0.jbkor.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

const store = new MongoDBStore({
    uri: MongoDBUri,
    collection: "sessions"
})

const mongoose = require("mongoose")

const User = require("./models/usersModel")

const mainRouter = require('./routes/main')

const booksRouter = require('./routes/books')

const authRouter = require('./routes/auth')

let globalUser = null;

// const User = require("./models/usersModel");
const CartRouter = require('./routes/cart')

const OrderRouter = require('./routes/orders')

// const mongoClient = require("./utils/database").mongoClient;

app.use(session({
    secret: "monica belluci",
    resave: false,
    saveUninitialized: false,
    store: store
}))

app.use(express.static(path.join(__dirname, 'public')))

app.use(bodyParser.urlencoded({ extended: false }))

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

app.use(mainRouter)

mongoose.connect(MongoDBUri)
    .then(() => {
        return User.find()
            .then(users => {
                if (!users.length) {
                    const user = new User({
                        name: "Talha",
                        email: "talhaamjadx@live.com",
                        password: "iamnumber4",
                        cart: { items: [] },
                        orders: []
                    })
                    return user.save()
                }
                else {
                    return new Promise(resolve => resolve(users[0]))
                }
            })
            .then(user => {
                globalUser = user
            })
            .catch(err => {
                return new Promise((resolve, reject) => reject(err))
            })
    })
    .then(() => {
        app.listen(4000, () => console.log("Server is running on port 4000"))
    })
    .catch(err => {
        console.log(err)
    })