import inquirer from 'inquirer';

interface QuestionObj {
  askPreferences(): Promise<any>;
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
};
