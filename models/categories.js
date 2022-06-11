const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categorySchema = new Schema({
    id: {
        type: Number,
        required: false,
    },
    name: {
        type: String,
        required: true,
    },
})

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;
