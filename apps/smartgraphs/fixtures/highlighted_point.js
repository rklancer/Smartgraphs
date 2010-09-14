// ==========================================================================
// Project:   Smartgraphs.HighlightedPoint Fixtures
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Smartgraphs */

sc_require('models/highlighted_point');

Smartgraphs.HighlightedPoint.FIXTURES = [

  // need to have some fixtures or fixturesDataSource's updateRecords() thinks it can't handle the record.
  { url: '/backend/activity/1/annotations/walking-first-point',
    name: 'walking-first-point',
    isExample: YES,
    session: null,
    point: 1
  }

];
