import { Result, NodeResult } from 'axe-core';
import { wcag } from './wcag';
import { manualCheckObj } from './manualCheckObj';

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
  manualTests?: IssueInfo[];
  nonEssential?: IssueInfo[];
}

export const dataParser = (dataToBeParsed: Result[]): ParsedData => {
  // sort issues into common occurances i.e. { critical: [resultItem1, resultItem2], severe: [resultItem3]}
  // instead of returning bind to constant
  const data = dataToBeParsed.reduce((parsedData: ParsedData, curIssue: Result) => {
    const specificIssuePopulator = (node: NodeResult): SpecificIssue => {
      const parsedSpecificIssue: SpecificIssue = {};
      parsedSpecificIssue.recommendation = node.failureSummary;
      parsedSpecificIssue.html = node.html;
      return parsedSpecificIssue;
    };

    // default values for no given wcag information
    let wcagURLInfo = curIssue.helpUrl;
    let wcagCriteriaInfo = 'n/a';
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
    };
    const issuesPopulator = (): IssueInfo => {
      const parsedIssue: IssueInfo = {};
      wcagConnector();
      parsedIssue.dequeId = curIssue.id;
      parsedIssue.wcagCriteria = wcagCriteriaInfo; // wcag.principles[index].guidelines[0].successcriteria[0].num
      parsedIssue.urlToWCAG = wcagURLInfo; //  wcag.principles[index].guidelines[0].successcriteria[0].url
      parsedIssue.title = curIssue.help;
      parsedIssue.specificIssues = curIssue.nodes.map(node => specificIssuePopulator(node));
      parsedIssue.impact = curIssue.impact;
      return parsedIssue;
    };

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

  data.manualTests = manualCheckObj;
  // console.log(data)
  return data;
};

// return BAO

//    critical: [
// {
//       dequeId: 'aria-required-attr',
//       wcagCriteria: 'n/a',
//       urlToWCAG: 'https://dequeuniversity.com/rules/axe/3.5/aria-required-attr?application=axe-puppeteer',
//       title: 'Required ARIA attributes must be provided',
//       specificIssues: [Array],
//       impact: 'critical'
//     }
//   ],
//   serious: [
//     {
//       dequeId: 'bypass',
//       wcagCriteria: 'n/a',
//       urlToWCAG: 'https://dequeuniversity.com/rules/axe/3.5/bypass?application=axe-puppeteer',
//       title: 'Page must have means to bypass repeated blocks',
//       specificIssues: [Array],
//       impact: 'serious'
//     }
//   ],
//   moderate: [
//     {
//       dequeId: 'landmark-one-main',
//       wcagCriteria: 'n/a',
//       urlToWCAG: 'https://dequeuniversity.com/rules/axe/3.5/landmark-one-main?application=axe-puppeteer',
//       title: 'Document must have one main landmark',
//       specificIssues: [Array],
//       impact: 'moderate'
//     },
//
//   ],
//   manualTests: [
//     {
//       title: 'For prerecorded audio-only and prerecorded video-only media, the following are true, except when the audio or video is a media alternative for text and is clearly labeled as such:',
//       urlToWCAG: 'https://www.w3.org/WAI/WCAG21/Understanding/audio-only-and-video-only-prerecorded'
//     },
//     {
//       title: 'Captions are provided for all prerecorded audio content in synchronized media, except when the media is a media alternative for text and is clearly labeled as such.',
//       urlToWCAG: 'https://www.w3.org/WAI/WCAG21/Understanding/captions-prerecorded'
//     },
//     {
//       title: 'An alternative for time-based media or audio description of the prerecorded video content is provided for synchronized media, except when the media is a media alternative for text and is clearly labeled as such.',
//       urlToWCAG: 'https://www.w3.org/WAI/WCAG21/Understanding/audio-description-or-media-alternative-prerecorded'
//     },
//     {
//       title: 'When the sequence in which content is presented affects its meaning, a correct reading sequence can be programmatically determined.',
//       urlToWCAG: 'https://www.w3.org/WAI/WCAG21/Understanding/meaningful-sequence'
//     },
//     {
//       title: 'Instructions provided for understanding and operating content do not rely solely on sensory characteristics of components such as shape, color, size, visual location, orientation, or sound.',
//       urlToWCAG: 'https://www.w3.org/WAI/WCAG21/Understanding/sensory-characteristics'
//     },
//     {
//       title: 'If keyboard focus can be moved to a component of the page using a keyboard interface, then focus can be moved away from that component using only a keyboard interface, and, if it requires more than unmodified arrow or tab keys or other standard exit methods, the user is advised of the method for moving focus away.',
//       urlToWCAG: 'https://www.w3.org/WAI/WCAG21/Understanding/no-keyboard-trap'
//     },
//     {
//       title: 'If a keyboard shortcut is implemented in content using only letter (including upper- and lower-case letters), punctuation, number, or symbol characters, then at least one of the following is true:',
//       urlToWCAG: 'https://www.w3.org/WAI/WCAG21/Understanding/character-key-shortcuts'
//     },
//     {
//       title: 'Web pages do not contain anything that flashes more than three times in any one second period, or the flash is below the general flash and red flash thresholds.',
//       urlToWCAG: 'https://www.w3.org/WAI/WCAG21/Understanding/three-flashes-or-below-threshold'
//     },
//     {
//       title: 'If a Web page can be navigated sequentially and the navigation sequences affect meaning or operation, focusable components receive focus in an order that preserves meaning and operability.',
//       urlToWCAG: 'https://www.w3.org/WAI/WCAG21/Understanding/focus-order'
//     },
//     {
//       title: 'All functionality that uses multipoint or path-based gestures for operation can be operated with a single pointer without a path-based gesture, unless a multipoint or path-based gesture is essential.',
//       urlToWCAG: 'https://www.w3.org/WAI/WCAG21/Understanding/pointer-gestures'
//     },
//     {
//       title: 'For functionality that can be operated using a single pointer, at least one of the following is true:',
//       urlToWCAG: 'https://www.w3.org/WAI/WCAG21/Understanding/pointer-cancellation'
//     },
//     {
//       title: 'Functionality that can be operated by device motion or user motion can also be operated by user interface components and responding to the motion can be disabled to prevent accidental actuation, except when:',
//       urlToWCAG: 'https://www.w3.org/WAI/WCAG21/Understanding/motion-actuation'
//     },
//     {
//       title: 'When any user interface component receives focus, it does not initiate a change of context.',
//       urlToWCAG: 'https://www.w3.org/WAI/WCAG21/Understanding/on-focus'
//     },
//     {
//       title: 'Changing the setting of any user interface component does not automatically cause a change of context unless the user has been advised of the behavior before using the component.',
//       urlToWCAG: 'https://www.w3.org/WAI/WCAG21/Understanding/on-input'
//     },
//     {
//       title: 'If an input error is automatically detected, the item that is in error is identified and the error is described to the user in text.',
//       urlToWCAG: 'https://www.w3.org/WAI/WCAG21/Understanding/error-identification'
//     }
//   ]
// }
