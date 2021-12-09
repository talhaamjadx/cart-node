const getDb = require("../utils/database").getDb
const { ObjectId } = require("mongodb")

class User {
    constructor(name, email, password, cart, orders, id) {
        this.name = name
        this.email = email
        this.password = password
        this.cart = cart
        this._id = id
        this.orders = orders
    }
    createOrder() {
        const db = getDb();
        let createdOrder;
        return this.getCart()
            .then(books => {
                const data = {
                    userId: this._id,
                    books: books
                }
                return db.collection("orders").insertOne(data)
            })
            .then(res => {
                createdOrder = res
                this.cart = { items: [] }
                return db.collection("users").updateOne({ _id: this._id }, { $set: { cart: this.cart } })
            })
            .then(() => {
                this.orders = [...this.orders, { orderId: createdOrder.insertedId }]
                return db.collection("users").updateOne({ _id: this._id }, { $set: { orders: this.orders } })
            })
            .catch(err => {
                return err
            })
    }
    getOrders() {
        const db = getDb()
        return db.collection("orders").find({ userId: new ObjectId(this._id) })
            .toArray()
    }
    addToCart(book) {
        const db = getDb();
        const fetchedBookIndex = this.cart.items.findIndex(b => {
            return b.bookId.equals(book._id)
        })
        if (fetchedBookIndex > -1) {
            const fetchedBook = this.cart.items[fetchedBookIndex]
            fetchedBook.quantity = fetchedBook.quantity + 1
            this.cart.items[fetchedBookIndex] = { bookId: fetchedBook.bookId, quantity: fetchedBook.quantity }
        }
        else {
            this.cart.items = [...this.cart.items, { bookId: book._id, quantity: 1 }]
        }
        return db.collection("users").updateOne({ _id: this._id }, { $set: { cart: this.cart } })
    }
    removeBookFromCart(bookId) {
        const db = getDb();
        const fetchedBookIndex = this.cart.items.findIndex(book => {
            return book.bookId.equals(new ObjectId(bookId))
        })
        if (fetchedBookIndex > -1) {
            this.cart.items.splice(fetchedBookIndex, 1)
            return db.collection("users").updateOne({ _id: this._id }, { $set: { cart: this.cart } })
        }
        else
            return new Promise((resolve, reject) => reject("Book not found"))
    }
    getCart() {
        const db = getDb()
        const bookIds = this.cart.items.map(book => book.bookId)
        return db.collection("books")
            .find({ _id: { $in: bookIds } })
            .toArray()
            .then(books => {
                return books.map(book => {
                    return {
                        ...book,
                        quantity: this.cart.items.find(b => b.bookId.equals(book._id)).quantity
                    }
                })
            })
            .catch(err => {
                return err
            })
    }
    save() {
        const db = getDb();
        return db.collection("users").insertOne(this)
    }
    static findAll() {
        const db = getDb()
        return db.collection("users").find().toArray()
    }
    static findById(id) {
        const db = getDb();
        return db.collection("users").find({ _id: new ObjectId(id) }).next()
    }
}

module.exports = User