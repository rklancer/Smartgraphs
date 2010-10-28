// ==========================================================================
// Project:   Smartgraphs.HighlightedPoint Fixtures
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Smartgraphs */

sc_require('models/highlighted_point');

Smartgraphs.HighlightedPoint.FIXTURES = [

  // need to have some fixtures or fixturesDataSource's updateRecords() thinks it can't handle the record.
  // http://github.com/sproutcore/sproutcore/issues/#issue/36
  { url: '/shared/motion-towards-and-away/annotations/walking-first-point',
    name: 'walking-first-point',
    activity: '/shared/motion-towards-and-away',
    isExample: YES,
    session: null,
    point: 1
  },

  { url: '/shared/marias-run/annotations/where-maria-stopped',
    name: 'where-maria-stopped',
    activity: '/shared/marias-run',
    isExample: YES,
    session: null,
    point: 403
  },

  { url: '/shared/example-activity/test-highlighted-point',
    name: 'test-highlighted-point',
    activity: '/shared/example-activity',    
    isExample: YES,
    session: null,
    point: 410
  }

];
