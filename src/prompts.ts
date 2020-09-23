import { prompt, Separator } from 'inquirer';
import { menu } from './menu';

interface Prompts {
  askPath(): Promise<{ url: string }>;
  askOptions(results: any, target?: string): Promise<{ res: string }>;
  askError(error: string): Promise<{ startOver: string }>;
}

export const prompts: Prompts = {
  askPath: () => {
    const questions = [
      {
        name: 'url',
        type: 'input',
        message: 'Input URL or path:',
      },
    ];
    return prompt(questions);
  },

  askOptions: (results, target) => {
    const paths = menu.askMenu(results, target);
    const questions = [
      {
        name: 'res',
        type: 'list',
        pageSize: 35,
        message: 'anything else?',
        choices: ['refresh', 'new url','quit', new Separator(), ...paths],
      },
    ];
    return prompt(questions);
  },

  askError: error => {
    const questions = [
      {
        name: 'startOver',
        type: 'list',
        message: `There was an error, do you want to try again? ${error}`,
        choices: ['search again', 'quit'],
      },
    ];
    return prompt(questions);
  },
};
