// ==========================================================================
// Project:   Smartgraphs.ResponseTemplate Fixtures
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

sc_require('models/response_template');

Smartgraphs.ResponseTemplate.FIXTURES = [

  { url: 
      '/backend/response-template/1/numeric/',
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

  { url: 
      '/backend/response-template/2/open/',
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
