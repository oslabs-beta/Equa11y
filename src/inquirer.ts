import inquirer from 'inquirer';

module.exports = {
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
        // validate: function(value: string) {
        //   if (value.length) {
        //     return true;
        //   } else {
        //     return 'Please enter your phrase.';
        //   }
        // }
      },
    ];
    return inquirer.prompt(questions);
  },
};
