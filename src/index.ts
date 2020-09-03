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

const run = async () => {
  console.log(chalk.cyan(figlet.textSync('Equa11y', { horizontalLayout: 'full' })));

  const inputURL = await inquirerFile.askPreferences();
  spinner.start();
  const data = await puppet(inputURL.url);
  spinner.stop();
  console.log(data);
};

run();

// module.exports = run;
