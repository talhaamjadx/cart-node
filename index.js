const express = require('express');
const app = express();
const bodyParser = require('body-parser')

const path = require("path")

const mainRouter = require('./routes/main')

const booksRouter = require('./routes/books')

app.use(express.static(path.join(__dirname, 'public')))

app.use(bodyParser.urlencoded({extended: false}))

app.set("views", "views")

app.set("view engine", "ejs")

app.use('/books', booksRouter)

app.use(mainRouter)

app.listen(4000, () => console.log("Server is running on port 4000"))