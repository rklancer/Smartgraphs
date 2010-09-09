// ==========================================================================
// Project:   Smartgraphs.FreehandSketch Fixtures
// Copyright: ©2010 Concord Consortium
// @author:   Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

sc_require('models/freehand_sketch');

Smartgraphs.FreehandSketch.FIXTURES = [
  // need to have some fixtures or fixturesDataSource's updateRecords() thinks it can't handle the record.
  { url: '/backend/activity/1/annotations/sketch-1',
    name: 'sketch-1',
    isExample: YES,
    points: [],
    session: null
  }
];
