import inquirer from 'inquirer';
import { Result } from 'axe-core';

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
    const descriptions = results.map(result => result.description);
    const questions = [
      {
        name: 'res',
        type: 'list',
        message: 'anything else?',
        choices: ['search again', 'quit', ...descriptions],
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
