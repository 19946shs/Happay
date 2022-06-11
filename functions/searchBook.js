const prompt = require('prompt');
const Author = require('../models/authors');
const Book = require('../models/books');
const showDecisionPrompt = require('./util');

const schema = {
    properties: {
        title: {
            required: false,
        },
        author: {
            required: false,
        },
    }
};

const authorToBookMapper = (books, authorsMap) => {
    const mappedBooks = books.reduce((bookArr, book) => {
        bookArr.push({
            title: book.title,
            author: authorsMap.get(book.id)
        })
        return bookArr
    }, [])
    return mappedBooks
}

const authorIDToAuthorMapper = (authors) => {
    const authorsMap = new Map()
    authors.forEach((author) => authorsMap.set(author.id, author.name))
    return authorsMap
}

const searchBook = async (showFunctionsPrompt) => {
    prompt.start()
    prompt.get(schema, async (err, result) => {
        const { title, author } = result
        const titleSearchKey = new RegExp(title, 'i')
        const authorSearchKey = new RegExp(author, 'i')

        const searchedBooks = [...await Book.find({ title: titleSearchKey })]
        const searchedAuthors = [...await Author.find({ name: authorSearchKey })]
        const searchedAuthorsIDs = searchedAuthors.map((author) => author.id)

        const allBookAuthorsIDs = [...searchedBooks.map((book) => book.authorID)]
        const allBookAuthors = [...await Author.find({ id: { $in: [...allBookAuthorsIDs] } })]

        let displayBooks = []

        console.log('\n');

        if(titleSearchKey && authorSearchKey) {
            const authorsMap = authorIDToAuthorMapper(searchedAuthors)
            const filteredBooks = searchedBooks.filter((book) => searchedAuthorsIDs.includes(book.authorID))
            displayBooks = authorToBookMapper(filteredBooks, authorsMap)
        } else if (authorSearchKey) {
            const authorsMap = authorIDToAuthorMapper(searchedAuthors)
            const authorsBooks = [...await Book.find({ authorID: { $in: [...searchedAuthorsIDs] } })]
            displayBooks = authorToBookMapper(authorsBooks, authorsMap)
        } else {
            const authorsMap = authorIDToAuthorMapper(allBookAuthors)
            displayBooks = authorToBookMapper(searchedBooks, authorsMap)
        }
        
        console.log('\n');
        if (displayBooks?.length) {
            console.log('Books found:');
            for(let i = 0; i < displayBooks?.length; i+=1) {
                console.log(`${i+1}. ${displayBooks[i].title} - ${displayBooks[i].author} `)
            }
        } else {
            console.log('No books found');
        }
        console.log('\n');
        showDecisionPrompt(showFunctionsPrompt)
    })
}

module.exports = searchBook
