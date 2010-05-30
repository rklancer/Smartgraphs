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

  // TODO: Add your data fixtures here.
  // All fixture records must have a unique primary key (default 'guid').  See 
  // the example below.

  { 
    guid: 'series-1',
    points: (function () {
      var recs = [];
      for (var i = 1; i <= 10; i++) {
        recs.push(i+'');
      }
      return recs;
    }())
  }
];
