const prompt = require('prompt');
const Author = require('../models/authors');
const Book = require('../models/books');
const showDecisionPrompt = require('./util');

const schema = {
    properties: {
        id: {
            pattern: /^[0-9]+$/,
            message: 'Enter a valid Author ID',
            required: true,
        },
    }
};

const getMostBooksSoldByAuthor = async (showFunctionsPrompt) => {
    prompt.start()
    prompt.get(schema, async (err, result) => {
        const { id } = result
        const pipeline = [
            // { $match: { authorID: id } },
            { $group: { _id: '$authorID', count: { $sum: '$soldCount' } } }
        ]
        console.log(id)
        const author = await Author.findOne({ id })
        const highestSoldBook = await Book.find({ authorID: id }).sort({ soldCount: -1 }).limit(1)
        const aggregate = await Book.aggregate(pipeline)
        const totalBooksSold = aggregate.filter((book) => parseInt(book._id) === parseInt(id))[0].count

        console.log('\n')
        console.log('Author: ', author.name)
        console.log('Highest sold book: ', highestSoldBook[0].title)
        console.log('Books sold: ', highestSoldBook[0].soldCount)
        console.log('\n')
        console.log('Total number of overall books: ', totalBooksSold)
        console.log('\n')
        showDecisionPrompt(showFunctionsPrompt)
    })
}

module.exports = getMostBooksSoldByAuthor
