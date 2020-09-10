import { ParsedData, IssueInfo } from './dataParser';

// type issueLevel = typeof issueLevel<keyof typeof issueLevel>

export interface MenuContents {
  levelName: string;
  opened: boolean;
  nested: number;
  arrows: string[];
  subLevel: any[];
}

interface Dropdown {
  askMenu(results: ParsedData, level?: string): string[];
  processLevel(levelName: string, subLevel?: IssueInfo[], opened?: boolean, nested?: number): MenuContents;
  stringify(levelObj: any, nested: number): string;
}

export const menu: Dropdown = {
  askMenu: (results, targetLevel) => {
    // process sorted issues into menu form
    const processed: MenuContents[] = [];
    (Object.keys(results) as Array<keyof ParsedData>).forEach((issueLevel) => {
      if (targetLevel) { // Bottom level conditional: targetLevel is given...
        if (targetLevel!.split(' ').length > 1) { // ....and it is more than 1 word long
          let targetLevelFlag = false;
          // Check the middle level to see if it was the targetLevel passed in
          (results[issueLevel] as Array<keyof IssueInfo>).forEach((issue: any) => {
            if (issue.title === targetLevel) targetLevelFlag = true;
          });
          if (targetLevelFlag) { // If so, process all three levels!
            processed.push(menu.processLevel(issueLevel, results[issueLevel], true)); // Top level: open
            (results[issueLevel] as Array<keyof IssueInfo>).forEach((issue: any) => {
              if (issue.title === targetLevel) {
                processed.push(menu.processLevel(issue.title, issue.specificIssues, true, 1)); // Middle level: opened, indent
                // wcag url for guidance
                // fix any of the following: 
                issue.specificIssues.forEach((specificIssue: any) => { // Bottom levels: (closed), double indent
                  processed.push(menu.processLevel(specificIssue.html, [], false, 2));
                  processed.push(menu.processLevel(specificIssue.recommendation, [], false, 2));
                });
              } else { // Middle level: closed, indent
                processed.push(menu.processLevel(issue.title, issue.specificIssues, false, 1));
              }
            });
          } else { // Top level: closed
            processed.push(menu.processLevel(issueLevel, results[issueLevel]));
          } // otherwise targetLevel given but only 1 words so looking for middle menu level
        } else if (targetLevel === issueLevel) {
          processed.push(menu.processLevel(issueLevel, results[issueLevel], true));
          (results[issueLevel] as Array<keyof IssueInfo>).forEach((issue: any) => {
            processed.push(menu.processLevel(issue.title, issue.specificIssues, false, 1));
          });
        } else {
          processed.push(menu.processLevel(issueLevel, results[issueLevel]));
        }
      } else { // Base case: nothing selected, top level only!
        processed.push(menu.processLevel(issueLevel, results[issueLevel]));
      }
    });
    // Stringify the array of processed menu options
    const options = processed.map((option: MenuContents) => menu.stringify(option, option.nested));
    return options;
  },

  processLevel: (levelName, subLevel = [], opened = false, nested = 0) => {
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
    option += ('  '.repeat(nested));
    option += levelObj.opened ? levelObj.arrows[1] : levelObj.arrows[0];
    option += ` ${levelObj.levelName} (${levelObj.subLevel.length}) issues types: TBD total sub issues`;
    return option;
  },
};
