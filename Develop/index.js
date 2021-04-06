// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');
const api = require('./utils/api.js');
const generateMarkdown = require('./utils/generateMarkdown.js');

// TODO: Create an array of questions for user input
const questions = [
    {
        type: "input",
        message: "What is the name of this project?",
        name: "title",
        validate: function (answer) {
            if (answer.length < 1) {
                return console.log("You must enter a title.");
            }
            return true;
        }
    },
    {
        type: "input",
        message: "What would you like to put in the description of the README?",
        name: "description",
        validate: function (answer) {
            if (answer.length < 1) {
                return console.log("You must enter a description");
            }
            return true;
        }
    },
    {
        type: "input",
        message: "How do you install this application?",
        name: "installation",
        validate: function (answer) {
            if (answer.length < 1) {
                return console.log("You must enter installation instructions.");
            }
            return true;
        }
    },
    {
        type: "input",
        message: "what is your github username?",
        name: "github",
        validate: function (answer) {
            if (answer.length < 1) {
                return console.log("You must enter a github account.");
            }
            return true;
        }
    },
    {
        type: "input",
        message: "What the the name of your github repository?",
        name: "repository",
        validate: function (answer) {
            if(answer.length < 1) {
                console.log("You must enter a name for your repository.")
            }return true;
        }
    },
    {
        type: "input",
        message: "enter your project instructions",
        name: "usage",
    },
    {
        type: "input",
        message: "What is the email you want to use?",
        name: "email",
        validate: function (answer) {
            if(answer.length < 1) {
                console.log("You must enter an email");
            }return true;
        }
    },
    {
        type: "list",
        message: "What license would you like to use?",
        name: "license",
        choices: ['apache-2.0', 'mit', 'afl-3.0']
    },
    {
        type: "input",
        message: "How can users contribute to your project?",
        name: "contribution"
    },

]

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, err => {
        if (err) {
            return console.log(err);
        }
        console.log('Your markdown file has been created.')
    });
}

const writeFileAsync = util.promisify(writeToFile);

// TODO: Create a function to initialize app
async function init() {
    try {
        
        const userResponses = await inquirer.prompt(questions);
        console.log("Your responses: ", userResponses);
        console.log("Your responses have been logged. Calling to GitHub...");

        const userInfo = await api.getUser(userResponses);
        console.log("Your GitHub user info: ", userInfo);

        console.log("Generating your markdown")
        const markdown = generateMarkdown(userResponses, userInfo);
        console.log(markdown);

        await writeFileAsync('ExampleREADME.md', markdown);

    } catch (error) {
        console.log(error);
    }
}

// Function call to initialize app
init();
