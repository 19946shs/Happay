const mongoose = require('mongoose')
const prompt = require('prompt')
const inquirer = require('inquirer')
const addAnAuthor = require('./functions/addAnAuthor')
const addBookToCatalog = require('./functions/addBookToCatalog')
const addCategory = require('./functions/addCategory')
const getListOfCategories = require('./functions/getListOfCategories')
const getAllAuthorName = require('./functions/getAllAuthorName')
const getMostBooksSoldByAuthor = require('./functions/getMostBooksSoldByAuthor')
const getMostBooksSoldByCategory = require('./functions/getMostBooksSoldByCategory')
const getBooksByAuthor = require('./functions/getBooksByAuthor')
const searchBook = require('./functions/searchBook')
const dbURI = `mongodb+srv://libraryuser:sgpWuUEk0Ur7iIG0@cluster0.odkfavf.mongodb.net/Library?retryWrites=true&w=majority`

mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})

const showFunctionsPrompt = () => {
    process.stdout.write('\033c')
    inquirer.prompt([
        {
          type: 'rawlist',
          name: 'function',
          message: 'Choose function',
          choices: ['addAnAuthor', 'addBookToCatalog', 'addCategory', 'getListOfCategories', 'getAllAuthorName', 'getMostBooksSoldByAuthor', 'getMostBooksSoldByCategory', 'searchBook', 'getBooksByAuthor'],
        },
      ])
      .then(functions => {
        console.info('Function:', functions.function);
        switch(functions.function) {
            case 'addAnAuthor': {
                addAnAuthor(showFunctionsPrompt)
                break;
            }
            case 'addBookToCatalog': {
                addBookToCatalog(showFunctionsPrompt)
                break;
            }
            case 'addCategory': {
                addCategory(showFunctionsPrompt)
                break;
            }
            case 'getListOfCategories': {
                getListOfCategories(showFunctionsPrompt)
                break;
            }
            case 'getAllAuthorName': {
                getAllAuthorName(showFunctionsPrompt)
                break;
            }
            case 'getMostBooksSoldByAuthor': {
                getMostBooksSoldByAuthor(showFunctionsPrompt)
                break;
            }
            case 'getMostBooksSoldByCategory': {
                getMostBooksSoldByCategory(showFunctionsPrompt)
                break;
            }
            case 'getBooksByAuthor': {
                getBooksByAuthor(showFunctionsPrompt)
                break;
            }
            case 'searchBook': {
                searchBook(showFunctionsPrompt)
                break;
            }
        }
      });
}

showFunctionsPrompt()
