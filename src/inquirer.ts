import inquirer from 'inquirer';

interface QuestionObj {
  askPreferences(): Promise<any>;
}

export const inquirerFile: QuestionObj = {
  askPreferences: () => {
    const questions = [
      {
        name: 'color',
        type: 'list',
        message: 'Choose your color:',
        choices: ['green', 'yellow', 'cyan', 'magenta'],
      },
      {
        name: 'phrase',
        type: 'input',
        message: 'Enter your phrase:',
      },
    ];
    return inquirer.prompt(questions);
  },
};
