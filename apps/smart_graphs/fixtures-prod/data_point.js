// ==========================================================================
// Project:   SmartGraphs.DataPoint Fixtures
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals SmartGraphs */

sc_require('models/data_point');

SmartGraphs.DataPoint.FIXTURES = (function () {
  var recs = [], rec;

  for (var i = 0; i < 24; i++) {
    rec = {};
    rec.guid = (i+1)+'';
    rec.x = i/5.0;
    rec.y = i + Math.random();
    rec.series = 'series-1';
    recs.push(rec);
  }
  return recs;
}());

  // TODO: Add your data fixtures here.
  // All fixture records must have a unique primary key (default 'guid').  See 
  // the example below.

  // { guid: 1,
  //   firstName: "Michael",
  //   lastName: "Scott" },
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



