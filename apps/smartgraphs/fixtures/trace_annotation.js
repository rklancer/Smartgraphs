// ==========================================================================
// Project:   Smartgraphs.TraceAnnotation Fixtures
// Copyright: ©2010 Concord Consortium
// @author:   Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

sc_require('models/trace_annotation');

Smartgraphs.TraceAnnotation.FIXTURES = [
  // need to have some fixtures or fixturesDataSource's updateRecords() thinks it can't handle the record.
  { url: '/backend/activity/1/annotations/trace-1',
    name: 'trace-1',
    isExample: YES,
    points: [],
    session: null
  }
];
