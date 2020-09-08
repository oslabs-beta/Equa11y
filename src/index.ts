#!/usr/bin/env node

import chalk from 'chalk';
import clear from 'clear';
import figlet from 'figlet';
import CLI from 'clui';
import { Result } from 'axe-core';
import { prompts } from './prompts';
import { puppet } from './puppeteer';

interface Program {
  start(): Promise<void>;
  loop(data: Result[], path: string, targetLevel?: string): Promise<void>;
}

const { Spinner } = CLI;
const spinner = new Spinner('Loading, please wait!');

export const program: Program = {
  start: async () => {
    // Heading creation
    clear();
    console.log(chalk.cyan(figlet.textSync('Equa11y', { horizontalLayout: 'full' })));
    // Ask for URL/localpath
    try {
      const inputURL = { url: 'http://www.google.com' }; // optional hardcoding for dev
      // const inputURL = await prompts.askPath(); // real prompt for publishing
      spinner.start();
      const data = await puppet(inputURL.url);
      spinner.stop();
      // Ask user for next step
      await program.loop(data, inputURL.url);
    } catch (error) {
      spinner.stop();
      const errors = await prompts.askError();
      if (errors.startOver === 'quit') process.exit(0);
      else if (errors.startOver === 'search again') program.start();
    }
  },

  loop: async (results, path, targetLevel) => {
    // Reset the display
    clear();
    console.log(chalk.cyan(figlet.textSync('Equa11y', { horizontalLayout: 'full' })));
    console.log(chalk.bold('Input URL:'), path);

    const options = await prompts.askOptions(results, targetLevel);
    if (options.res === 'quit') process.exit(0);
    else if (options.res === 'search again') program.start();
    // Parse leading arrow
    else {
      const arrow = options.res.trim()[0];
      if (arrow === '⇒') {
        const targetLevel = options.res.trim().split(' ')[1];
        // console.log(targetLevel);
        program.loop(results, path, targetLevel);
      } else {
        program.loop(results, path);
      }
    }
  },

}

program.start();
