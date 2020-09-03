// results.violations[0] this one is the first obj in the array
{
    id: 'aria-required-attr',
    impact: 'critical',
    tags: [ 'cat.aria', 'wcag2a', 'wcag412' ],
    description: 'Ensures elements with ARIA roles have all required ARIA attributes',
    help: 'Required ARIA attributes must be provided',
    helpUrl: 'https://dequeuniversity.com/rules/axe/3.5/aria-required-attr?application=axe-puppeteer',
    nodes: [
      {
        any: [Array],
        all: [],
        none: [],
        impact: 'critical',
        html: '<input class="gLFyf gsfi" maxlength="2048" name="q" type="text" jsaction="paste:puy29d" aria-autocomplete="both" aria-haspopup="false" autocapitalize="off" autocomplete="off" autocorrect="off" autofocus="" role="combobox" spellcheck="false" title="Search" value="" aria-label="Search" data-ved="0ahUKEwie_PPbzs3rAhWLonIEHfzeBs8Q39UDCAY">',
        target: [Array],
        failureSummary: 'Fix any of the following:\n' +
          '  Required ARIA attribute not present: aria-expanded'
      }
    ]
  }

// results.violations[0].nodes
[
    {
      any: [{
        id: 'aria-required-attr',
        data: [ 'aria-expanded' ],
        relatedNodes: [],
        impact: 'critical',
        message: 'Required ARIA attribute not present: aria-expanded'
      }],
      all: [],
      none: [],
      impact: 'critical',
      html: '<input class="gLFyf gsfi" maxlength="2048" name="q" type="text" jsaction="paste:puy29d" aria-autocomplete="both" aria-haspopup="false" autocapitalize="off" autocomplete="off" autocorrect="off" autofocus="" role="combobox" spellcheck="false" title="Search" value="" aria-label="Search" data-ved="0ahUKEwj4yKbGzs3rAhVLlnIEHdSADlYQ39UDCAY">',
      target: [ '.gLFyf' ],
      failureSummary: 'Fix any of the following:\n' +
        '  Required ARIA attribute not present: aria-expanded'
    }
  ]

// results.violations[0].nodes[0].any
[
    {
      id: 'aria-required-attr',
      data: [ 'aria-expanded' ],
      relatedNodes: [],
      impact: 'critical',
      message: 'Required ARIA attribute not present: aria-expanded'
    }
  ]