// ==========================================================================
// Project:   Smartgraphs.ResponseTemplate Fixtures
// Copyright: ©2010 Concord Consortium
// ==========================================================================
/*globals Smartgraphs */

sc_require('models/response_template');

Smartgraphs.ResponseTemplate.FIXTURES = [

  { guid: 'template-numeric-1',
    fieldTypes: 'numeric'.w(),
    fieldValues: [''],
    numberOfResponseFields: 1
  },
  
  { guid: 'template-open-1',
    fieldTypes: 'textarea'.w(),
    fieldValues: [''],
    numberOfResponseFields: 1
  }

];
