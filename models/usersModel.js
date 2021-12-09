const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Order = require("./orderModel");

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cart: {
        items: [
            {
                bookId: { type: Schema.Types.ObjectId, required: true, ref: 'books' },
                quantity: { type: Number, required: true }
            }
        ]
    },
    orders: [
        {
            orderId: {
                type: Schema.Types.ObjectId,
                required: true,
                ref: 'order'
            }
        }
    ]
})

UserSchema.methods.createOrder = function () {
    let createdOrder;
    const data = {
        userId: this._id,
        books: this.cart.items,
        testing: this.cart.items[0].bookId._doc
    }
    const order = new Order(data)
    return order.save()
        .then(res => {
            createdOrder = res
            res.populate()
            this.cart = { items: [] }
            return this.save()
        })
        .then(() => {
            this.orders = [...this.orders, { orderId: createdOrder._id }]
            return this.save()
        })
        .catch(err => {
            return err
        })
}

UserSchema.methods.removeBookFromCart = function (bookId) {
    const fetchedBookIndex = this.cart.items.findIndex(book => {
        return book.bookId.equals(bookId)
    })
    if (fetchedBookIndex > -1) {
        this.cart.items.splice(fetchedBookIndex, 1)
        return this.save()
    }
    else
        return new Promise((resolve, reject) => reject("Book not found"))
}

UserSchema.methods.addToCart = function (book) {
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
    this.save()
}


module.exports = mongoose.model("user", UserSchema)