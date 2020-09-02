#!/usr/bin/env node

const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const inquirerFile  = require('./lib/inquirer.ts');

clear();

const run = async () => {
  const credentials = await inquirerFile.askPreferences();
  // console.log(credentials);

  // chalk.keyword(credentials)
  
    console.log(
      chalk.keyword(credentials.color)(
        figlet.textSync(credentials.phrase, { horizontalLayout: 'full' })
      )
    )
  
};

run();

module.exports = run;