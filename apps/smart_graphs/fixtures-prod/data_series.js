// ==========================================================================
// Project:   SmartGraphs.DataSeries Fixtures
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals SmartGraphs */

sc_require('models/data_series');

SmartGraphs.DataSeries.FIXTURES = [

  // TODO: Add your data fixtures here.
  // All fixture records must have a unique primary key (default 'guid').  See 
  // the example below.

  { 
    guid: 1,
    series: (function () {
      var ret = [];
      for (var i = 0; i < 25; i++) {
        ret.push([i/5.0, i]);
      }
      return ret;
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
