#!/usr/bin/env node

import chalk from 'chalk';
import clear from 'clear';
import figlet from 'figlet';
import { inquirerFile } from './src/inquirer';

clear();

const run = async () => {
  const credentials = await inquirerFile.askPreferences();
  console.log(
    chalk.keyword(credentials.color)(
      figlet.textSync(credentials.phrase, { horizontalLayout: 'full' }),
    ),
  );
};

run();

// module.exports = run;
