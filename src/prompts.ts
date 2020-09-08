import inquirer from 'inquirer';
import { menu } from './menu';

interface Prompts {
  askPath(): Promise<{ url: string }>;
  askOptions(results: any, target?: string): Promise<{ res: string }>;
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

  askOptions: (results, target) => {
    const paths = menu.askMenu(results, target);
    const questions = [
      {
        name: 'res',
        type: 'list',
        pageSize: 100,
        message: 'anything else?',
        choices: ['search again', 'quit', ...paths],
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
