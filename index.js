const axios = require("axios");
const inquirer = require("inquirer");

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
                message: "License: ",
                name: "license"
            }
        ]);

        const projectTitle = projectRequest.title;
        const projectDescription = projectRequest.description;
        const license = projectRequest.license;
        console.log(projectTitle + projectDescription + license);
        


    } catch (error) {
        console.error(error.response.status + ' ' + error.response.statusText + '. Try again.');
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