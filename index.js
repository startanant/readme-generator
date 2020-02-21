const axios = require("axios");
const inquirer = require("inquirer");

async function main(){
    console.log( `README Generator` );
    const userRequest = await inquirer.prompt({
            type: "input",
            message: "What is your GitHub username?",
            name: "username"
          })

    // get the user info
    const gitName = userRequest.username;
    console.log(gitName);
    const apiGitUrl = `https://api.github.com/users/${gitName}`;
    const userResponse = await axios.get( apiGitUrl );
    console.log(userResponse.data);
}

main();