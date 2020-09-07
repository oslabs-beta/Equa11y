import inquirer from 'inquirer';
import { Result } from 'axe-core';
import { menu } from './menu';

interface Prompts {
  askPath(): Promise<{ url: string }>;
  askLoop(results: Result[]): Promise<{ res: string }>;
  askError(): Promise<{ startOver: string }>;
}

export const prompts: Prompts = {
  askPath: () => {
    const questions = [
      {
        name: 'url',
        type: 'input',
        message: 'Input URL:',
      },
    ];
    return inquirer.prompt(questions);
  },

  askLoop: results => {
    // sort issues into common occurances
    const sorted = results.reduce((acc: any, cur: any) => {
      if (acc[cur.impact]) {
        acc[cur.impact].push(cur);
      } else {
        acc[cur.impact] = [cur];
      }
      return acc;
    }, {});
    // process sorted issues into menu form
    const processed = Object.keys(sorted).map((issueLevel: any) =>
      menu.create(issueLevel, sorted[issueLevel]),
    );
    // compile an array of stringified menu options
    const options = processed.map((option: any) => menu.stringify(option));
    const questions = [
      {
        name: 'res',
        type: 'list',
        message: 'anything else?',
        choices: ['search again', 'quit', ...options],
      },
    ];
    return inquirer.prompt(questions);
  },

  askError: () => {
    const questions = [
      {
        name: 'startOver',
        type: 'list',
        message: 'There was an error, do you want to try again?',
        choices: ['search again', 'quit'],
      },
    ];
    return inquirer.prompt(questions);
  },
};
