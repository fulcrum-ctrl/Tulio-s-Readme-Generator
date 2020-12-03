// array of questions for user
const fs = require('fs');
const questions =  require ('inquirer');

questions
    .prompt([
        {
            type: "input",
            message: "What is the title of your app?",
            name: "Project Name",
        },
        {
            type:"input",
            message:"Enter project description: ",
            name: "Description"
        }
    ])
    .then((response) =>
    fs.writeFile('ReadMe.md', JSON.stringify(response), function (err) {
        if (err) return console.log(err);
        console.log('ReadMe Generated!');
      }));
  


// function to write README file
//function writeToFile(fileName, data) {
//}

// function to initialize program
//function init() {

//}

// function call to initialize program
//init();
