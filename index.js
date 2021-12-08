const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const sequelize = require('./utils/database');

const User = require("./models/usersModel")
const Book = require("./models/booksModel")
const Cart = require("./models/cartModel")
const CartBook = require("./models/cartBookModel")

const { DataTypes } = require("sequelize");

const path = require("path")

const mainRouter = require('./routes/main')

const booksRouter = require('./routes/books')

const CartRouter = require('./routes/cart')

app.use((req, res, next) => {
    User.findByPk(1)
        .then(user => {
            req.user = user
            next();
        })
        .catch(err => {
            res.send(err)
        })
})

app.use(express.static(path.join(__dirname, 'public')))

app.use(bodyParser.urlencoded({ extended: false }))

app.set("views", "views")

app.set("view engine", "ejs")

app.use('/books', booksRouter)

app.use(CartRouter)

app.use(mainRouter)

User.hasMany(Book, {
    constraints: true, onDelete: 'CASCADE', foreignKey: {
        allowNull: false
    }
})
Book.belongsTo(User)
Cart.belongsTo(User, {
    constraints: true, onDelete: 'CASCADE', foreignKey: {
        allowNull: false
    }
})
User.hasOne(Cart)
Cart.belongsToMany(Book, { through: CartBook })
Book.belongsToMany(Cart, { through: CartBook })

sequelize.sync().then(() => {
    return User.findByPk(1)
})
    .then(user => {
        if (!user)
            return User.create({
                email: "talhaamjadx@live.com",
                password: "iamnumber4"
            })
        return user
    })
    .then(() => {
        app.listen(4000, () => console.log("Server is running on port 4000"))
    })
    .catch(err => {
        console.log({ err })
    })
