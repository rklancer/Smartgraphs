// ==========================================================================
// Project:   Smartgraphs.HighlightedPoint Fixtures
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Smartgraphs */

sc_require('models/line_to_axis');

Smartgraphs.LineToAxis.FIXTURES = [

  // need to have some fixtures or fixturesDataSource's updateRecords() thinks it can't handle the record.
  // http://github.com/sproutcore/sproutcore/issues/#issue/36
  { url: '/backend/activity/2/annotations/where-maria-stopped-to-y-axis',
    name: 'where-maria-stopped-to-y-axis',
    isExample: YES,
    session: null,
    point: 403,
    axis: 'y'
  }

];
