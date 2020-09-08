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
  askMenu: (results, targetLevel) => {
    // sort issues into common occurances i.e. { critical: [resultItem1, resultItem2], severe: [resultItem3]}
    const sorted = results.reduce((acc: any, cur: any) => {
      if (acc[cur.impact]) acc[cur.impact].push(cur);
      else acc[cur.impact] = [cur];
      return acc;
    }, {});
    // process sorted issues into menu form
    const processed: any = [];
    Object.keys(sorted).forEach((issueLevel: string) => {
      if (issueLevel === targetLevel) {
        processed.push(menu.processLevel(issueLevel, sorted[issueLevel], true));
        sorted[issueLevel].forEach((issue: any) => {
          processed.push(menu.processLevel(issue, issue.nodes, false, true));
        });
      } else processed.push(menu.processLevel(issueLevel, sorted[issueLevel]));
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
