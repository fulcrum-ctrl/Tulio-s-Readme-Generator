//external packages
const fs = require('fs');
const inquirer =  require ('inquirer');
const util = require ('util');


const api = require('./utils/api.js');
const generateMarkdown = require('./utils/generateMarkdown.js');
//list of questions that would be prompted in console
//answers would then be used to write readme sections
const questions = [
    {
        type: 'input',
        message: "What is your GitHub username? (No @ needed)",
        name: 'username',
        default: 'fulcrum-ctrl',
        validate: function (answer) {
            if (answer.length < 1) {
                return console.log("A valid GitHub username is required.");
            }
            return true;
        }
    },
    {
        type: 'input',
        message: "What is the name of your GitHub repo?",
        name: 'repo',
        default: 'readme-generator',
        validate: function (answer) {
            if (answer.length < 1) {
                return console.log("A valid GitHub repo is required for a badge.");
            }
            return true;
        }
    },
    {
        type: "input",
        message: "What is the project's name?",
        name: "title",
        default: "Project title",
        validate: function (answer){
            if (answer.length < 1) {
                return console.log("A valid entry is required.");
            }
            return true;
        }
    },
    {
        type: "input",
        message: "Enter project description description: ",
        name: "description",
        default: "This project is awesome",
        validate: function (answer){
            if (answer.length < 1) {
                return console.log("A valid entry is required.");
            }
            return true;
        }
    },
    {
        type: "input",
        message: "If applicable, define the steps required to install this application: ",
        name: "installation"
    },
    {
        type: "input",
        message: "If applicable, define the steps required for other users to contribute to this project: ",
        name: "contribution"
    },
    {
        type: "input",
        message: "If applicable, enter the tests done for this project and how to run them again: ",
        name: "test"
    },
    {
        type: "list",
        message: "Choose a license for your project.",
        choices: ['GNU AGPLv3', 'GNU GPLv3', 'GNU LGPLv3', 'Mozilla Public License 2.0', 'Apache License 2.0', 'MIT License', 'Boost Software License 1.0', 'The Unlicense'],
        name: "license"
    }
];
    

function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, err => {
        if (err) {
          return console.log(err);
        }
      
        console.log("Success! Your README.md file has been generated")
    });
}

const writeFileAsync = util.promisify(writeToFile);


// Main function
async function init() {
    try {

        // Prompt Inquirer questions
        const userResponses = await inquirer.prompt(questions);
        console.log("Your responses: ", userResponses);
        console.log("Thank you for your responses! Fetching your GitHub data next...");
    
        // Call GitHub api for user info
        const userInfo = await api.getUser(userResponses);
        console.log("Your GitHub user info: ", userInfo);
    
        // Pass Inquirer userResponses and GitHub userInfo to generateMarkdown
        console.log("Generating your README next...")
        const markdown = generateMarkdown(userResponses, userInfo);
        console.log(markdown);
    
        // Write markdown to file
        await writeFileAsync('ExampleREADME.md', markdown);

    } catch (error) {
        console.log(error);
    }
};

init();
 


// function to write README file
//function writeToFile(fileName, data) {
//}

// function to initialize program
//function init() {

//}

// function call to initialize program
//init();
