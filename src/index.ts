#!/usr/bin/env node

import chalk from 'chalk';
import clear from 'clear';
import figlet from 'figlet';
import CLI from 'clui';
import { inquirerFile } from './inquirer';
import { puppet } from './tests';

clear();

const { Spinner } = CLI;
const spinner = new Spinner('Loading, please wait!');

console.log(chalk.cyan(figlet.textSync('Equa11y', { horizontalLayout: 'full' })));
const run = async () => {
  try {
    const inputURL = await inquirerFile.askPreferences();
    spinner.start();
    const data = await puppet(inputURL.url);

    spinner.stop();

    const loop = await inquirerFile.askLoop(data);
    if (loop.res === 'quit') process.exit(0);
    else if (loop.res === 'search again') run();
  } catch (error) {
    spinner.stop();
    const errors = await inquirerFile.askError();
    if (errors.startOver === 'quit') process.exit(0);
    else if (errors.startOver === 'search again') run();
  }
};

run();

// module.exports = run;
