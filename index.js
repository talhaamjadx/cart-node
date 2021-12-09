const express = require('express');
const app = express();
const bodyParser = require('body-parser')

const path = require("path")

const mainRouter = require('./routes/main')

const booksRouter = require('./routes/books')

let user = null;

const User = require("./models/usersModel");
const CartRouter = require('./routes/cart')

const OrderRouter = require('./routes/orders')

const mongoClient = require("./utils/database").mongoClient;

app.use((req, res, next) => {
    req.user = user
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

mongoClient(() => {
    User.findAll()
        .then(res => {
            if (!res.length) {
                const newUser = new User("Talha", "talhaamjadx@live.com", "iamnumber4", { items: [] })
                return newUser.save()
                .then(res => {
                    return new User("Talha", "talhaamjadx@live.com", "iamnumber4", { items: [] }, [],  res.insertedId)
                })
                .catch(err => {
                    return err
                })
            }
            else {
                return new Promise((resolve, reject) => res[0] ? resolve(new User(res[0].name, res[0].email,res[0].password,res[0].cart, res[0].orders, res[0]._id)) : reject("User is null"))
            }
        })
        .then((res) => {
            user = res
            app.listen(4000, () => console.log("server is running on port 4000"))
        })
        .catch(err => {
            console.log(err)
        })
})