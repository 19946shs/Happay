const Author = require('../models/authors');
const showDecisionPrompt = require('./util');

const getAllAuthorName = async (showFunctionsPrompt) => {
    // showSpinnerOrNot(true)
    const authors = await Author.find()
    // showSpinnerOrNot(false)
    console.log('\n');
    if(authors) {
        console.log('Authors found:')
        for (let i=0; i<authors.length; i+=1) {
            console.log(`${i+1}. ${authors[i].name} - ${authors[i].id}`);
        }
    } else {
        console.log('No authors found')
    }
    console.log('\n');
    showDecisionPrompt(showFunctionsPrompt)
}

module.exports = getAllAuthorName
