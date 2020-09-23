import inquirer from 'inquirer';
import { prompts } from '../src/prompts';
import { prompt } from 'inquirer';

// prompts.askPath() tests
it('should ask user for a path', () => {
  const question = [
    {
      name: 'url',
      type: 'input',
      message: 'Input URL or path:',
    },
  ]
  expect(prompts.askPath()).toMatchObject(prompt(question));
})
