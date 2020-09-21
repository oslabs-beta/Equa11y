#!/usr/bin/env node
import chalk from 'chalk';
import clear from 'clear';
import CFonts from 'cfonts';
import CLI from 'clui';
import open from 'open';
import stripColor from 'strip-color';
import { prompts } from './prompts';
import { puppet } from './puppeteer';
import { dataParser, ParsedData } from './dataParser';

interface Program {
  start(path?: string): Promise<void>;
  loop(parsed: ParsedData, path: string, targetLevel?: string): Promise<void>;
}

const { Spinner } = CLI;
const spinner = new Spinner('Loading, please wait!');

export const program: Program = {
  start: async (path) => {
    // Heading creation
    clear();
    CFonts.say('equa11y', {
      font: 'simple3d',
      space: false,
      gradient: ['#ff3333', 'magenta', '#00bebe'],
      transitionGradient: true,
    });
    // Ask for URL/localpath
    try {
      // const inputURL = { url: 'http://codesmith.io' }; // optional hardcoding for dev
      const inputURL = (path) ? { url: path } : await prompts.askPath(); // real prompt for publishing
      spinner.start();
      const data = await puppet(inputURL.url);
      const parsed = dataParser(data);
      spinner.stop();

      // Ask user for next step
      await program.loop(parsed, inputURL.url);
    } catch (error) {
      spinner.stop();

      const errors = await prompts.askError(error);
      if (errors.startOver === 'quit') process.exit(0);
      else if (errors.startOver === 'new url') program.start();
    }
  },

  loop: async (parsed, path, targetLevel) => {
    // Reset the display
    clear();
    CFonts.say('equa11y', {
      font: 'simple3d',
      space: false,
      gradient: ['#ff3333', 'magenta', '#00bebe'],
      transitionGradient: true,
    });
    console.log(chalk.bold('Input URL:'), path);

    const options = await prompts.askOptions(parsed, targetLevel);
    // remove color for processing
    options.res = stripColor(options.res);
    if (options.res === 'quit') process.exit(0);
    // check to see if selection is a link
    else if (options.res.trim().slice(0, 4) === 'http') {
      open(options.res.trim());
      program.loop(parsed, path);
    } else if (options.res === 'new url') program.start();
    else if (options.res === 'refresh') program.start(path);
    // check if nested
    else if (options.res[0] === ' ') {
      // grabs string between arrow and '(n) issues types: TBD total sub issues'
      const id = options.res.trim().split(' ').slice(1, -7).join(' ');
      program.loop(parsed, path, id);
    }
    // Parse leading arrow
    else {
      const arrow = options.res.trim()[0];
      if (arrow === '⇒') {
        const targetLevel = options.res.trim().split(' ')[1];
        program.loop(parsed, path, targetLevel);
      } else {
        program.loop(parsed, path);
      }
    }
  },
};

program.start();
