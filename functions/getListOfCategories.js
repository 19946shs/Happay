const Category = require('../models/categories');
const showDecisionPrompt = require('./util');
const showSpinnerOrNot = require('./util')

const getListOfCategories = async (showFunctionsPrompt) => {
    // showSpinnerOrNot(true)
    const categories = await Category.find()
    // showSpinnerOrNot(false)
    console.log('\n')
    if(categories?.length) {
        console.log('Categories:')
        categories.forEach((category, ix) => {
            console.log(`${ix + 1}. ${category.name} - ${category.id}`);
        })
    } else {
        console.log('No categories found')
    }
    console.log('\n')
    showDecisionPrompt(showFunctionsPrompt)
}

module.exports = getListOfCategories
