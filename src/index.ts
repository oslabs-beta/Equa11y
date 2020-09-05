#!/usr/bin/env node

import chalk from 'chalk';
import clear from 'clear';
import figlet from 'figlet';
import CLI from 'clui';
import { prompts } from './prompts';
import { puppet } from './puppeteer';

clear();

const { Spinner } = CLI;
const spinner = new Spinner('Loading, please wait!');

console.log(chalk.cyan(figlet.textSync('Equa11y', { horizontalLayout: 'full' })));
const run = async () => {
  try {
    const inputURL = await prompts.askPath();
    spinner.start();
    const data = await puppet(inputURL.url); // real prompt for publishing
    // const data = await puppet('http://www.google.com'); // optional hardcoding for dev
    spinner.stop();

    const loop = await prompts.askLoop(data);
    if (loop.res === 'quit') process.exit(0);
    else if (loop.res === 'search again') run();
  } catch (error) {
    spinner.stop();
    const errors = await prompts.askError();
    if (errors.startOver === 'quit') process.exit(0);
    else if (errors.startOver === 'search again') run();
  }
};

run();

// module.exports = run;
