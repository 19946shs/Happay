const prompt = require('prompt');
const Book = require('../models/books');
const Category = require('../models/categories');
const showDecisionPrompt = require('./util');

const schema = {
    properties: {
        title: {
            required: true
        },
        authorID: {
            pattern: /^[0-9]+$/,
            required: true,
        },
        publisher: {
            required: false,
        },
        publishDate: {
            required: false,
        },
        categoryID: {
            required: false,
        },
        price: {
            pattern: /^[0-9]*$/,
            required: false,
        },
        soldCount: {
            pattern: /^[0-9]*$/,
            required: false,
        },
    }
};

const addBookToCatalog = async (showFunctionsPrompt) => {
    prompt.start()
    prompt.get(schema, async (err, result) => {
        const { title, authorID, publisher, publishDate, categoryID, price, soldCount } = result
        let id
        const category = await Category.findOne({ id: categoryID })
        if(category) {
            Book.findOne().sort({ created_at: -1 }).exec((err, res) => {
                id = res ? parseInt(res.id) : 0
                id += 1
                const book = new Book({
                    id,
                    title,
                    authorID,
                    publisher,
                    publishDate,
                    categoryID,
                    price,
                    soldCount
                })

                book.save()
                    .then((res) => {
                        console.log('\nBook added to catalog\n');
                        showDecisionPrompt(showFunctionsPrompt)
                    })
                    .catch((err) => {
                        console.log(err)
                        showDecisionPrompt(showFunctionsPrompt)
                    })
            })
        } else { 
            console.log(`Category ID: ${categoryID} does not exist\n`)
            showDecisionPrompt(showFunctionsPrompt)
        }
        
    })
}

module.exports = addBookToCatalog
