const prompt = require('prompt')
const Book = require('../models/books');
const showDecisionPrompt = require('./util');

const schema = {
    properties: {
        id: {
            required: true,
        },
    }
};

const getBooksByAuthor = async (showFunctionsPrompt) => {
    prompt.start()
    prompt.get(schema, async (err, result) => {
        const { id } = result
        const books = await Book.find({ authorID: id })
        console.log('\n');
        if(books?.length) {
            console.log('Books found:')
            books.forEach((book, ix) => {
                console.log(`${ix + 1}. ${book.title}`)
            })
        } else {
            console.log('No books found')
        }
        console.log('\n');
        showDecisionPrompt(showFunctionsPrompt)
    })
}

module.exports = getBooksByAuthor
