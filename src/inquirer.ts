import inquirer from 'inquirer';
import { menu } from './menu';
import { Result } from 'axe-core';

interface QuestionObj {
  askPath(): Promise<any>;
  askLoop(results: any): Promise<any>;
}

export const inquirerFile: QuestionObj = {
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

  askLoop: (data) => {
    // sort issues into common occurances
    const sorted = data.reduce((acc: any, cur: any) => {
      (acc[cur.impact]) ? acc[cur.impact].push(cur) : acc[cur.impact] = [ cur ];
      return acc;
    }, {});
    // process sorted issues into menu form
    const processed = Object.keys(sorted).map((issueLevel: any) => menu.create(issueLevel, sorted[issueLevel]));
    // compile an array of stringified menu options
    const options = processed.map((option: any) => menu.stringify(option));
    const questions = [
      {
        name: 'res',
        type: 'list',
        message: 'anything else?',
        choices: [
          'search again',
          'quit',
          ...options,
        ],
      }
    ]
    return inquirer.prompt(questions);
  }
};
