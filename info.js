// results.violations[0] this one is the first obj in the array
[
  {
    id: 'aria-required-attr',
    impact: 'critical',
    tags: ['cat.aria', 'wcag2a', 'wcag412'],
    description: 'Ensures elements with ARIA roles have all required ARIA attributes',
    help: 'Required ARIA attributes must be provided',
    helpUrl:
      'https://dequeuniversity.com/rules/axe/3.5/aria-required-attr?application=axe-puppeteer',
    nodes: [
      {
        any: [Array],
        all: [],
        none: [],
        impact: 'critical',
        html:
          '<input class="gLFyf gsfi" maxlength="2048" name="q" tpe="text" jsaction="paste:puy29d" aria-autocomplete="both" aria-haspopup="false" autocapitalize="off" autocomplete="off" autocorrect="off" autofocus="" role="combobox" spellcheck="false" title="Search" value="" aria-label="Search" data-ved="0ahUKEwie_PPbzs3rAhWLonIEHfzeBs8Q39UDCAY">',
        target: [Array],
        failureSummary:
          'Fix any of the following:\n' + '  Required ARIA attribute not present: aria-expanded',
      },
    ],
  },
][
  // results.violations[0].nodes
  {
    any: [
      {
        id: 'aria-required-attr',
        data: ['aria-expanded'],
        relatedNodes: [],
        impact: 'critical',
        message: 'Required ARIA attribute not present: aria-expanded',
      },
    ],
    all: [],
    none: [],
    impact: 'critical',
    html:
      '<input class="gLFyf gsfi" maxlength="2048" name="q" type="text" jsaction="paste:puy29d" aria-autocomplete="both" aria-haspopup="false" autocapitalize="off" autocomplete="off" autocorrect="off" autofocus="" role="combobox" spellcheck="false" title="Search" value="" aria-label="Search" data-ved="0ahUKEwj4yKbGzs3rAhVLlnIEHdSADlYQ39UDCAY">',
    target: ['.gLFyf'],
    failureSummary:
      'Fix any of the following:\n' + '  Required ARIA attribute not present: aria-expanded',
  }
][
  // results.violations[0].nodes[0].any
  {
    id: 'aria-required-attr',
    data: ['aria-expanded'],
    relatedNodes: [],
    impact: 'critical',
    message: 'Required ARIA attribute not present: aria-expanded',
  }
];

// google.com
[
  {
    id: 'aria-required-attr',
    impact: 'critical',
    tags: [ 'cat.aria', 'wcag2a', 'wcag412' ],
    description: 'Ensures elements with ARIA roles have all required ARIA attributes',
    help: 'Required ARIA attributes must be provided',
    helpUrl: 'https://dequeuniversity.com/rules/axe/3.5/aria-required-attr?application=axe-puppeteer',
    nodes: [ [Object] ]
  },
  {
    id: 'bypass',
    impact: 'serious',
    tags: [
      'cat.keyboard',
      'wcag2a',
      'wcag241',
      'section508',
      'section508.22.o'
    ],
    description: 'Ensures each page has at least one mechanism for a user to bypass navigation and jump straight to the content',
    help: 'Page must have means to bypass repeated blocks',
    helpUrl: 'https://dequeuniversity.com/rules/axe/3.5/bypass?application=axe-puppeteer',
    nodes: [ [Object] ]
  },
  {
    id: 'landmark-one-main',
    impact: 'moderate',
    tags: [ 'cat.semantics', 'best-practice' ],
    description: 'Ensures the document has a main landmark',
    help: 'Document must have one main landmark',
    helpUrl: 'https://dequeuniversity.com/rules/axe/3.5/landmark-one-main?application=axe-puppeteer',
    nodes: [ [Object] ]
  },
  {
    id: 'page-has-heading-one',
    impact: 'moderate',
    tags: [ 'cat.semantics', 'best-practice' ],
    description: 'Ensure that the page, or at least one of its frames contains a level-one heading',
    help: 'Page must contain a level-one heading',
    helpUrl: 'https://dequeuniversity.com/rules/axe/3.5/page-has-heading-one?application=axe-puppeteer',
    nodes: [ [Object] ]
  },
  {
    id: 'region',
    impact: 'moderate',
    tags: [ 'cat.keyboard', 'best-practice' ],
    description: 'Ensures all page content is contained by landmarks',
    help: 'All page content must be contained by landmarks',
    helpUrl: 'https://dequeuniversity.com/rules/axe/3.5/region?application=axe-puppeteer',
    nodes: [
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object], [Object]
    ]
  }
]
