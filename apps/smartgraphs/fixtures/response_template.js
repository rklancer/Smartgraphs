// ==========================================================================
// Project:   Smartgraphs.ResponseTemplate Fixtures
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Smartgraphs */

sc_require('models/response_template');

Smartgraphs.ResponseTemplate.FIXTURES = [

  { guid: 
      'template-numeric-1',
    templateString: 
      '',
    fieldTypes: [
      'numeric'
    ],
    fieldChoiceLists: [
      null
    ],
    initialValues: [
      ''
    ]
  },

  { guid: 
      'template-open-1',
    templateString:
      '',
    fieldTypes: [
      'textarea'
    ],
    fieldChoiceLists: [
      null
    ],
    initialValues: [
      ''
    ]
  }
];
