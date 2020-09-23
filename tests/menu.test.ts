import { menu } from '../src/menu';

// menu.processLevel() tests
describe('process objects', () => {
  describe('given only a levelName', () => {
    const topObj = menu.processLevel('top level');
  
    it('should have a levelName', () => {
      expect(topObj.levelName).toBe('top level');
    })
    it('should have a subLevel', () => {
      expect(topObj.subLevel).toStrictEqual([]);
    })
    // tests for opened, and nested
  })

  describe('given multiple arguments', () => {
    const bottomObj = menu.processLevel('bottom level', [], false, 2);
  
    it('should have a levelName', () => {
      expect(bottomObj.levelName).toBe('bottom level');
    })
    it('should have a subLevel', () => {
      expect(bottomObj.subLevel).toStrictEqual([]);
    })
  })
})


const mockProcessedTop = {}
describe('stringifies processed objets', () => {
  describe('top level objects', () => {})
  describe('middle level objects', () => {})
  describe('bottom level objects', () => {})
})

// menu.stringify test
// describe('it should stringify a processed level', () => {})

// menu.askMenu test --> menu "Unit test"
// describe('it should return an array of strings containing menu items', () => {})