const mongoose = require("mongoose")

const Schema = mongoose.Schema

const OrderSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    books: [
        {
            bookId: {
                type: Schema.Types.ObjectId,
                required: true,
                ref: 'books'
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ],
    testing: Object
})

module.exports = mongoose.model("order", OrderSchema)