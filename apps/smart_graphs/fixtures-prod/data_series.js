// ==========================================================================
// Project:   SmartGraphs.DataSeries Fixtures
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals SmartGraphs */

sc_require('models/data_series');

SmartGraphs.Pair = SC.Object.extend({
  x: null,
  y: null
});

SmartGraphs.DataSeries.FIXTURES = [

  // TODO: Add your data fixtures here.
  // All fixture records must have a unique primary key (default 'guid').  See 
  // the example below.

  { 
    guid: 'series-1',
    points: (function () {
      var recs = [];
      for (var i = 1; i <= 25; i++) {
        recs.push(i+'');
      }
      return recs;
    }())
  }
  //
  // { guid: 2,
  //   firstName: "Dwight",
  //   lastName: "Schrute" },
  // 
  // { guid: 3,
  //   firstName: "Jim",
  //   lastName: "Halpert" },
  // 
  // { guid: 4,
  //   firstName: "Pam",
  //   lastName: "Beesly" },
  // 
  // { guid: 5,
  //   firstName: "Ryan",
  //   lastName: "Howard" }

];
