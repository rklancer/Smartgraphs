// ==========================================================================
// Project:   Smartgraphs.StaticAnnotation Fixtures
// Copyright: ©2010 Concord Consortium
// ==========================================================================
/*globals Smartgraphs */

sc_require('models/static_annotation');

Smartgraphs.StaticAnnotation.FIXTURES = [

  { guid: 'annotation-1',
    type: 'segment',
    points: ['1','2','3','4']
  },
  
  { guid: 'annotation-2',
    type: 'segment',
    points: ['6','7','8','9', '10']
  },
  
  { guid: 'annotation-3',
    type: 'segment',
    points: ['4', '5', '6']
  },
  
  { guid: 'annotation-4',
    type: 'point',
    points: ['4']
  },
  
  { guid: 'annotation-5',
    type: 'line',
    points: ['4']
  }
];
