"use strict";
var inquirer = require('inquirer');
module.exports = {
    askPreferences: function () {
        var questions = [
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
            }
        ];
        return inquirer.prompt(questions);
    },
};
