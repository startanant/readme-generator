const axios = require("axios");
const inquirer = require("inquirer");
const fs = require("fs");

async function main(){
    console.log( `README Generator` );

    const userRequest = await inquirer.prompt({
            type: "input",
            message: "What is your GitHub username?",
            name: "username"
          });

    // get the user info
    const gitName = userRequest.username;
    //console.log(gitName);
    const apiGitUrl = `https://api.github.com/users/${gitName}`;
    try {
        const userResponse = await axios.get( apiGitUrl );
        console.log(userResponse.data);
        const email = userResponse.data.email;
        const image = userResponse.data.avatar_url;
        const githubURL = userResponse.data.html_url;

        //Get project details
        const projectRequest = await inquirer.prompt([
            {
                type: "input",
                message: "--Enter Project details-- \n Project Title: ",
                name: "title"
            },
            {
                type: "input",
                message: "Description: ",
                name: "description"
            },
            {
                type: "input",
                message: "Installation: ",
                name: "installation"
            },
            {
                type: "input",
                message: "Usage: ",
                name: "usage"
            },
            {
                type: "list",
                message: "License: ",
                name: "license",
                choices: [
                    "GNU",
                    "BSD",
                    "MIT"
                ]
            }
        ]);

        const projectTitle = projectRequest.title;
        const projectDescription = projectRequest.description;
        const license = projectRequest.license;
        const installation = projectRequest.installation;
        const usage = projectRequest.usage;
        //console.log(projectTitle + projectDescription + license);
        
        //Build markdown output
        const output = (`# ${projectTitle}
        \n ${projectDescription}
        \n## Installation
        \n ${installation}
        \n## Usage
        \n ${usage}
        \n## License
        \n Licensed under ${license} license.
        \n## Author
        \n ![Profile Image](${image})
        \n [${gitName}](${githubURL})
        `);
        //console.log(output);

        //Write markdown output
        fs.writeFileSync('READ-ME.md', output);


    } catch (error) {
        //console.error(error.response.status + ' ' + error.response.statusText + '. Try again.');
        console.error(error);
    }
    
    



    //console.log(userResponse.data);
    
    
    // if(userResponse.data.id) {
    //     const email = userResponse.data.email;
    //     const image = userResponse.data.avatar_url;
    //     console.log("")
    //     const readmeBuilder = await inquirer.prompt([
    //     {
    //         type: "input",
    //         message: "What is your GitHub username?",
    //         name: "username"

    //     }
    //     ]);
    // } else {
    //     console.log("User not found.")
    // }
    



}

main();