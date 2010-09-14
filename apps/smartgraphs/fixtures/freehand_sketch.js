// ==========================================================================
// Project:   Smartgraphs.FreehandSketch Fixtures
// Copyright: ©2010 Concord Consortium
// @author:   Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

sc_require('models/freehand_sketch');

Smartgraphs.FreehandSketch.FIXTURES = [
  // need to have some fixtures or fixturesDataSource's updateRecords() thinks it can't handle the record.
  
  { url: '/backend/activity/1/annotations/sketch-to-match',
    name: 'sketch-to-match',
    isExample: YES,
    points: [ {x: 0, y: 3}, {x: 3, y: 1}, {x: 9, y: 2}, {x: 15, y:0} ],
    session: null
  }
  
];
