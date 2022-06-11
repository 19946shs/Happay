const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bookSchema = new Schema({
    id: {
        type: Number,
        required: false,
    },
    title: {
        type: String,
        required: true,
    },
    authorID: {
        type: Number,
        required: true,
    },
    publisher: {
        type: String,
        required: false,
    },
    publishDate: {
        type: String,
        required: false,
    },
    categoryID: {
        type: Number,
        required: false,
    },
    price: {
        type: Number,
        required: false,
        default: 0,
    },
    soldCount: {
        type: Number,
        required: false,
        default: 0,
    },
})

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;
