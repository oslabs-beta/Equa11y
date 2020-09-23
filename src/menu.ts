import chalk from 'chalk';
import { ParsedData, IssueInfo } from './dataParser';

export interface MenuContents {
  levelName: string;
  opened: boolean;
  nested: number;
  subLevel: any[];
}

interface Dropdown {
  askMenu(results: ParsedData, level?: string): string[];
  processLevel(
    levelName: string,
    subLevel?: IssueInfo[],
    opened?: boolean,
    nested?: number,
  ): MenuContents;
  stringify(levelObj: MenuContents): string;
}

export const menu: Dropdown = {
  askMenu: (results, targetLevel) => {
    // process sorted issues into menu form
    const processed: MenuContents[] = [];
    (Object.keys(results) as Array<keyof ParsedData>).forEach(issueLevel => {
      if (targetLevel) {
        if (targetLevel === 'manual') targetLevel = 'manualTests';
        // Bottom level conditional: targetLevel is given...
        if (targetLevel!.split(' ').length > 1) {
          // ....and it is more than 1 word long
          let targetLevelFlag = false;
          // Check the middle level to see if it was the targetLevel passed in
          (results[issueLevel] as Array<keyof IssueInfo>).forEach((issue: any) => {
            if (issue.title === targetLevel) targetLevelFlag = true;
          });
          if (targetLevelFlag) {
            // If so, process all three levels!
            processed.push(menu.processLevel(issueLevel, results[issueLevel], true)); // Top level: open
            (results[issueLevel] as Array<keyof IssueInfo>).forEach((issue: any) => {
              if (issue.title === targetLevel) {
                processed.push(menu.processLevel(issue.title, issue.specificIssues, true, 1)); // Middle level: opened, indent
                // wcag url for guidance
                processed.push(menu.processLevel(issue.urlToWCAG, [], false, 2));
                processed.push(
                  menu.processLevel(issue.specificIssues[0].recommendation, [], false, 2),
                );
                issue.specificIssues.forEach((specificIssue: any) => {
                  // Bottom levels: (closed), double indent
                  processed.push(menu.processLevel(specificIssue.html, [], false, 2));
                });
              } else {
                // Middle level: closed, indent
                processed.push(menu.processLevel(issue.title, issue.specificIssues, false, 1));
              }
            });
          } else {
            // Top level: closed
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
      } else {
        // Base case: nothing selected, top level only!
        processed.push(menu.processLevel(issueLevel, results[issueLevel]));
      }
    });
    // Stringify the array of processed menu options
    const options = processed.map((option: MenuContents) => menu.stringify(option));
    return options;
  },

  processLevel: (levelName, subLevel = [], opened = false, nested = 0) => {
    return {
      levelName,
      opened,
      nested,
      subLevel,
    };
  },

  stringify: (levelObj) => {
    const { opened, nested, subLevel } = levelObj;
    let { levelName } = levelObj; // let for chalifying later on
    const arrows = ['⇒', '⇓', '⇨', '⇩'];
    let option = '';
    option += '  '.repeat(nested);

    if (nested > 1) {
      option += levelName;
    } else if (nested === 1) {
      // middle level
      option += opened ? arrows[1] : arrows[0];
      if (subLevel[0].html !== '') {
        option += ` ${levelName} - ENTER for (${subLevel.length}) total error location(s)`;
      } else {
        option += ` ${levelName} - ENTER for URL to more information`;
      }
      option = chalk.blueBright(option);
    } else {
      // top level
      option += opened ? arrows[1] : arrows[0];
      let subIssues = 0;
      if (subLevel.length) {
        subLevel.forEach((issue: any) => {
          if (issue.specificIssues.length) subIssues += issue.specificIssues.length;
        });
      } // build and chalkify based on severity
      if (levelName !== 'manualTests') {
        if (levelName === 'critical') levelName = chalk.hex('#FF0000')(levelName);
        else if (levelName === 'serious') levelName = chalk.hex('#E66000')(levelName);
        else if (levelName === 'moderate') levelName = chalk.hex('#CC0077')(levelName);
        else levelName = chalk.magentaBright(levelName);
        option += ` ${levelName} (${subLevel.length}) issues type(s), (${subIssues}) total error location(s)`;
      } else {
        option += ` ${chalk.hex('#00A5A5')('manual tests')} ENTER for more information regarding manual testing`;
      }
    }
    return option;
  }
};
