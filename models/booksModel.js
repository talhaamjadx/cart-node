const mongoose = require("mongoose");

const Schema = mongoose.Schema

const bookSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    userId:{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    }
})

module.exports = mongoose.model("books", bookSchema)