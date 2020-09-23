import { menu } from '../src/menu';
import chalk from 'chalk';

// menu.processLevel() tests
describe('process objects', () => {
  describe('given only a level name', () => {
    const topObj = menu.processLevel('top level');
  
    it('should have a levelName', () => {
      expect(topObj.levelName).toBe('top level');
    })
    it('should have a subLevel array', () => {
      expect(topObj.subLevel).toStrictEqual([]);
    })
    it('should have an opened boolean', () => {
      expect(topObj.opened).toBe(false);
    })
    it('should have a nested number', () => {
      expect(topObj.nested).toBe(0);
    })
  })

  describe('given multiple arguments', () => {
    const bottomObj = menu.processLevel('bottom level', [], true, 2);
  
    it('should have a levelName', () => {
      expect(bottomObj.levelName).toBe('bottom level');
    })
    it('should have a subLevel', () => {
      expect(bottomObj.subLevel).toStrictEqual([]);
    })
    it('should have an opened boolean', () => {
      expect(bottomObj.opened).toBe(true);
    })
    it('should have a nested number', () => {
      expect(bottomObj.nested).toBe(2);
    })
  })
})

// menu.Stringify() tests
describe('stringify processed objets', () => {
  describe('top level objects', () => {
    const processedTop = {
      levelName: 'critical',
      subLevel: [],
      opened: false,
      nested: 0,
    }
    it('should stringify top level closed', () => {
      expect(menu.stringify(processedTop)).toBe(`⇒ ${chalk.hex('#FF0000')('critical')} (0) issues type(s), (0) total error location(s)`)
    })
    it('should stringify top level opened', () => {
      processedTop.opened = true;
      expect(menu.stringify(processedTop)).toBe(`⇓ ${chalk.hex('#FF0000')('critical')} (0) issues type(s), (0) total error location(s)`)
    })
  })

  describe('middle level objects', () => {
    const processedMiddle = {
      levelName: 'contrast is too low',
      subLevel: [[{ html: '' }]],
      opened: false,
      nested: 1,
    }
    it('should stringify middle level closed', () => {
      expect(menu.stringify(processedMiddle)).toBe(`${chalk.blueBright('  ⇒ contrast is too low - ENTER for (1) total error location(s)')}`)
    })
  })
  describe('bottom level objects', () => {
    const processedBottom = {
      levelName: '<header><h1>Hello World!</h1></header>',
      subLevel: [],
      opened: false,
      nested: 2,
    }
    it('should stringify bottom level', () => {
      expect(menu.stringify(processedBottom)).toBe('    <header><h1>Hello World!</h1></header>');
    })
  })
})
