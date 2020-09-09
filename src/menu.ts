import { ParsedData, IssueInfo } from './dataParser';

// type issueLevel = typeof issueLevel<keyof typeof issueLevel>

export interface MenuContents {
  levelName: string;
  opened: boolean;
  nested: boolean;
  arrows: string[];
  subLevel: any[];
}

interface Dropdown {
  askMenu(results: ParsedData, level?: string): string[];
  processLevel(levelName: string, subLevel?: IssueInfo[], opened?: boolean, nested?: boolean): MenuContents;
  stringify(levelObj: any, nested: boolean): string;
}

export const menu: Dropdown = {
  askMenu: (results, targetLevel) => {
    // process sorted issues into menu form
    const processed: MenuContents[] = [];
    (Object.keys(results) as Array<keyof ParsedData>).forEach((issueLevel) => {
      // Middle level check
      if (issueLevel === targetLevel) {
        processed.push(menu.processLevel(issueLevel, results[issueLevel], true));
        (results[issueLevel] as Array<keyof IssueInfo>).forEach((issue: any) => {
          processed.push(menu.processLevel(issue.quickFix, issue.specificIssues, false, true));
        });
      // } else if () {
        
        // 
      } else processed.push(menu.processLevel(issueLevel, results[issueLevel]));
    });
    // compile an array of stringified menu options
    const options = processed.map((option: MenuContents) => menu.stringify(option, option.nested));
    // options.push(...prepopulatedManualTests);
    return options;
  },

  processLevel: (levelName, subLevel = [], opened = false, nested = false) => {
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
