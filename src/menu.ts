import { Result } from 'axe-core';

export interface MenuContents {
  levelName: string;
  opened: boolean;
  nested: boolean;
  arrows: string[];
  subLevel: any[];
}

interface Dropdown {
  askMenu(results: Result[], level?: string): string[];
  processLevel(levelName: string, subLevel: [], opened?: boolean, nested?: boolean): MenuContents;
  stringify(levelObj: any, nested: boolean): string;
}

export const menu: Dropdown = {
  askMenu: (results: any, targetLevel) => {
    // process sorted issues into menu form
    const processed: any = [];
    Object.keys(results).forEach((issueLevel: string) => {
      // Middle level check
      if (issueLevel === targetLevel) {
        processed.push(menu.processLevel(issueLevel, results[issueLevel], true));
        results[issueLevel].forEach((issue: any) => {
          processed.push(menu.processLevel(issue.help, issue.nodes, false, true));
        });
      // } else if () {
        
        // 
      } else processed.push(menu.processLevel(issueLevel, results[issueLevel]));
    });
    // compile an array of stringified menu options
    const options = processed.map((option: MenuContents) => menu.stringify(option, option.nested));
    return options;
  },

  processLevel: (levelName, subLevel, opened = false, nested = false) => {
    return {
      levelName,
      opened,
      nested,
      arrows: ['⇒', '⇓', '⇨', '⇩'],
      subLevel,
    };
  },

  stringify: (levelObj, nested) => {
    let option = '';
    if (nested) option += '  ';
    option += levelObj.opened ? levelObj.arrows[1] : levelObj.arrows[0];
    option += ` ${levelObj.levelName} (${levelObj.subLevel.length}) issues types: TBD total sub issues`;
    return option;
  },
};
