import inquirer from 'inquirer';

interface QuestionObj {
  askPreferences(): Promise<any>;
  askLoop(results: any): Promise<any>;
  askError(): Promise<any>;
}

export const inquirerFile: QuestionObj = {
  askPreferences: () => {
    const questions = [
      {
        name: 'url',
        type: 'input',
        message: 'Input URL:',
      },
    ];
    return inquirer.prompt(questions);
  },

  askLoop: data => {
    const results = data.map((issue: any) => issue.description);
    const questions = [
      {
        name: 'res',
        type: 'list',
        message: 'anything else?',
        choices: ['search again', 'quit', ...results],
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
