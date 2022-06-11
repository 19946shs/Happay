const prompt = require('prompt');
const Book = require('../models/books');
const showDecisionPrompt = require('./util');

const schema = {
    properties: {
        id: {
            required: true,
        },
    }
};

const getMostBooksSoldByCategory = async (showFunctionsPrompt) => {
    prompt.start()
    prompt.get(schema, async (err, result) => {
        const { id } = result
        const pipeline = [
            // { $match: { authorID: id } },
            { $group: { _id: '$categoryID', count: { $sum: '$soldCount' } } }
        ]
        const highestSoldBook = await Book.find({ categoryID: id }).sort({ soldCount: -1 }).limit(1)
        const aggregate = await Book.aggregate(pipeline)
        const totalBooksSold = aggregate.filter((book) => parseInt(book._id) === parseInt(id))[0]?.count


        console.log('\n')
        if(highestSoldBook[0]) {
            console.log('Highest sold book: ', highestSoldBook[0]?.title)
            console.log('Books sold: ', highestSoldBook[0]?.soldCount)
            console.log('\n')
            console.log('Total number of overall books: ', totalBooksSold)
        } else {
            console.log('No books found')
        }
        console.log('\n')
        showDecisionPrompt(showFunctionsPrompt)
    })
}

module.exports = getMostBooksSoldByCategory
