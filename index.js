const express = require('express');
const app = express();
const bodyParser = require('body-parser')

const path = require("path")

const mongoose = require("mongoose")

const User = require("./models/usersModel")

const mainRouter = require('./routes/main')

const booksRouter = require('./routes/books')

let globalUser = null;

// const User = require("./models/usersModel");
const CartRouter = require('./routes/cart')

const OrderRouter = require('./routes/orders')

// const mongoClient = require("./utils/database").mongoClient;

app.use((req, res, next) => {
    req.user = globalUser
    next()
})

app.use(express.static(path.join(__dirname, 'public')))

app.use(bodyParser.urlencoded({ extended: false }))

app.set("views", "views")

app.set("view engine", "ejs")

app.use('/books', booksRouter)

app.use(CartRouter)

app.use(OrderRouter)

app.use(mainRouter)

mongoose.connect('mongodb+srv://talha_789:iamnumber4@cluster0.jbkor.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
    .then(() => {
        return User.find()
        .then(users => {
            if(!users.length){
                const user = new User({
                    name: "Talha",
                    email: "talhaamjadx@live.com",
                    password: "iamnumber4",
                    cart: { items: [] },
                    orders: []
                })
                return user.save()
            }
            else{
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