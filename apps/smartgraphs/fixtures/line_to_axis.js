// ==========================================================================
// Project:   Smartgraphs.HighlightedPoint Fixtures
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Smartgraphs */

sc_require('models/line_to_axis');

Smartgraphs.LineToAxis.FIXTURES = [

  // need to have some fixtures or fixturesDataSource's updateRecords() thinks it can't handle the record.
  // http://github.com/sproutcore/sproutcore/issues/#issue/36
  { url: '/shared/marias-run/annotation/where-maria-stopped-to-y-axis',
    name: 'where-maria-stopped-to-y-axis',
    activity: '/shared/marias-run',     
    isExample: YES,
    session: null,
    point: 403,
    axis: 'y'
  },

  { url: '/shared/example-activity/annotation/test-line-to-x-axis',
    name: 'test-line-to-x-axis',
    activity: '/shared/example-activity',     
    isExample: YES,
    session: null,
    point: 410,
    axis: 'x'
  }

];
