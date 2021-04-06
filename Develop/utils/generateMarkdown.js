// TODO: Create a function to generate markdown for README
function generateMarkdown(userResponses, userInfo) {

  let draftTable = '## Table of Contents';

  if (userResponses.installation !== '') { draftTable += `
  * [Installation](#installation)` };

  if (userResponses.usage !== '') { draftTable += `
  * [Usage](#usage)` };

  if (userResponses.contributing !== '') { draftTable += `
  * [Contributing](#contributing)` };

  let draftMarkdown = `
  # ${userResponses.title}
  
  ## Description

  ${userResponses.description}
  `
  draftMarkdown += draftTable;

  draftMarkdown += `
  
  *[license](#license)`;

  if (userResponses.installation !== '' ){

    draftMarkdown +=`

    ## Installation
    
    ${userResponses.installation}`
  };

  if (userResponses.usage !== ''){
    
    draftMarkdown +=`
    
    ## Usage
    
    ${userResponses.usage}`
  };

  if (userResponses.contributing !== ''){

    draftMarkdown +=`

    ## Contributing
    
    ${userResponses.contributing}`
  };

  draftMarkdown +=`

  ## License
  
  ${userResponses.license}`
  ;

  let draftDeveloper = `
  
  ## Questions?
  
  For any questions, please contact me with the information below:
 
  GitHub: [@${userInfo.login}](${userInfo.url})`;

  if (userInfo.email !== null) {
  
    draftDeveloper +=`
    
    Email: ${userInfo.email}`
  };

  draftMarkdown += draftDeveloper;

  return draftMarkdown;
};

module.exports = generateMarkdown;
