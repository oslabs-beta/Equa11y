import { Result, NodeResult } from 'axe-core';
import { wcag } from './wcag';
import { manualCheckObj, ManualCheckInfo } from './manualCheckObj'

export interface SpecificIssue {
  recommendation?: string;
  html?: string;
}

export interface IssueInfo {
    dequeId?: string;
    wcagCriteria?: string;
    urlToWCAG?: string;
    title?: string;
    specificIssues?: SpecificIssue[];
    impact?: Result['impact'];
}


export interface ParsedData {
    minor?: IssueInfo[];
    moderate?: IssueInfo[];
    serious?: IssueInfo[];
    critical?: IssueInfo[];
    manualTest?: ManualCheckInfo[]; 
    nonEssential?: IssueInfo[];
}

export const dataParser = (dataToBeParsed: Result[], manualCheckObj: ManualCheckInfo[]): ParsedData => {
  // sort issues into common occurances i.e. { critical: [resultItem1, resultItem2], severe: [resultItem3]}
  // instead of returning bind to constant
    const data = dataToBeParsed.reduce((parsedData: ParsedData, curIssue: Result) => {
    const specificIssuePopulator = (node: NodeResult): SpecificIssue => {
      const parsedSpecificIssue: SpecificIssue = {}
      parsedSpecificIssue.recommendation = node.failureSummary;
      parsedSpecificIssue.html = node.html;
      return parsedSpecificIssue;
    }

    let wcagURLInfo: string;
    let wcagCriteriaInfo: string;
    let foundFlag = false;

    const wcagConnector = () => {
      const { id } = curIssue;
      for (let i = 0; i < wcag.principles.length; i += 1) {
        for (let j = 0; j < wcag.principles[i].guidelines.length; j += 1) {
          for (let k = 0; k < wcag.principles[i].guidelines[j].successcriteria.length; k += 1) {
            const location = wcag.principles[i].guidelines[j].successcriteria[k];

            if (location.dq_id && location.dq_id.includes(id)) {
              foundFlag = true;
              wcagURLInfo = location.url;
              wcagCriteriaInfo = location.num;
              break;
            }
          }
          if (foundFlag) break;
        }
        if (foundFlag) break;
      }
      if (!foundFlag) {
        wcagURLInfo = curIssue.helpUrl;
        wcagCriteriaInfo = 'n/a';
      }
    }
    const issuesPopulator = (): IssueInfo => {
      const parsedIssue: IssueInfo = {};
      wcagConnector();
      parsedIssue.dequeId = curIssue.id;
      parsedIssue.wcagCriteria = wcagCriteriaInfo; // wcag.principles[index].guidelines[0].successcriteria[0].num
      parsedIssue.urlToWCAG = wcagURLInfo; //  wcag.principles[index].guidelines[0].successcriteria[0].url
      parsedIssue.title = curIssue.help;
      parsedIssue.specificIssues = curIssue.nodes.map((node) => specificIssuePopulator(node));
      parsedIssue.impact = curIssue.impact
      return parsedIssue;
    }

    const parsedIssue = issuesPopulator();
    if (curIssue.impact === null || curIssue.impact === undefined) {
      if (parsedData.nonEssential) parsedData.nonEssential.push(parsedIssue);
      else parsedData.nonEssential = [parsedIssue];
    } else if (parsedData[curIssue.impact]) {
      parsedData[curIssue.impact]?.push(parsedIssue);
    } else {
      parsedData[curIssue.impact] = [parsedIssue];
    }
    return parsedData;
  }, {});
  // add manual test to object
  
    data.manualTest = manualCheckObj;
    return data
  }
  
  // return BAO


//  const demoObj = {
//   critical: {
//     broken_href: {},
//     broken_image: {},
//     missing_alt_id: {
//       wcag_guidelines: '#link to wcag site',
//       quick_fix_line: 'all img tags should include alt ids',
//       urlToWCAG: 'http://www.wcag.com//',
//       specificIssues: [
//         {
//           html: "<img src='potato.jpg'>",
//           reccomendation: "add an alt id to your image so screen readers can read it",
//         },
//       ],
//     },
//   },
// }
