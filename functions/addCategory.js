const prompt = require('prompt');
const Category = require('../models/categories');
const showDecisionPrompt = require('./util');

const schema = {
    properties: {
        name: {
            required: true,
        },
    }
};

const addCategory = async (showFunctionsPrompt) => {
    prompt.start()
    prompt.get(schema, (err, result) => {
        const { name } = result
        let id
        Category.findOne().limit(1).sort({$natural:-1}).exec((err, res) => {
            id = res ? parseInt(res.id) : 0
            id += 1
            const category = new Category({
                id,
                name
            })
            category.save()
                .then((res) => {
                    console.log('\nNew Category added');
                    console.log(`Category ID: ${category.id}\n`);
                    showDecisionPrompt(showFunctionsPrompt)
                })
                .catch((err) => {
                    console.log(err)
                    showDecisionPrompt(showFunctionsPrompt)
                })
        })
    })
}

module.exports = addCategory
