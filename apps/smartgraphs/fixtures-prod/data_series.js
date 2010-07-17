// ==========================================================================
// Project:   Smartgraphs.DataSeries Fixtures
// Copyright: ©2010 Concord Consortium
// ==========================================================================
/*globals Smartgraphs */

sc_require('models/data_series');

Smartgraphs.Pair = SC.Object.extend({
  x: null,
  y: null
});

Smartgraphs.DataSeries.FIXTURES = [

  { guid: 'series-sensor',
    points: []
  },
  
  { guid: 'series-maria',
    points:  ['1','2','3','4','5','6','7','8','9','10']
  }
  
];
