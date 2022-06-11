const mongoose = require('mongoose')
const Schema = mongoose.Schema

const authorSchema = new Schema({
    id: {
        type: Number,
        required: false,
    },
    name: {
        type: String,
        required: true,
    },
    phonenumber: {
        type: String,
        required: false,
    },
    birthdate: {
        type: String,
        required: false,
    },
    deathdate: {
        type: String,
        required: false,
    },
})

const Author = mongoose.model('Author', authorSchema);
module.exports = Author;
