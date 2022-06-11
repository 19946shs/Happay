const prompt = require('prompt');
const Author = require('../models/authors');
const showDecisionPrompt = require('./util');

const schema = {
    properties: {
        name: {
            pattern: /^[a-zA-Z\s\-]+$/,
            message: 'Name must be only letters, spaces, or dashes',
            required: true
        },
        phonenumber: {
            pattern: /^[1-9][0-9]{9}$/,
            message: 'Enter a valid ten digit phone number',
            required: false,
        },
        birthdate: {
            required: false,
        },
        deathdate: {
            required: false,
        },
    }
};

const addAnAuthor = async (showFunctionsPrompt) => {
    prompt.start()
    prompt.get(schema, function (err, result) {
        const { name, phonenumber, birthdate, deathdate } = result
        let id
        Author.findOne().limit(1).sort({$natural:-1}).exec((err, res) => {
            id = res ? parseInt(res.id) : 0
            id += 1
            const author = new Author({
                id,
                name,
                phonenumber,
                birthdate,
                deathdate,
            })
            author.save()
                .then((res) => {
                    console.log(`\nAuthor added: ${author.name}}`);
                    console.log(`Author ID: ${author.id}\n`);
                    showDecisionPrompt(showFunctionsPrompt)
                })
                .catch((err) => {
                    console.log(err)
                    showDecisionPrompt(showFunctionsPrompt)
                })
    
        })
    })
}

module.exports = addAnAuthor
