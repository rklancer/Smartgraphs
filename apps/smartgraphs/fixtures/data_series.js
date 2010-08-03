// ==========================================================================
// Project:   Smartgraphs.DataSeries Fixtures
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

sc_require('models/data_series');

Smartgraphs.DataSeries.FIXTURES = [

  { url: '/backend/series/1/prediction-away/',   points: [] },
  { url: '/backend/series/2/prediction-toward/', points: [] },
  //{ url: '/backend/series/3/sensor/', points: ['1','2', '3', '4', '5', '6', '7', '8', '9', '10'] }
  { url: '/backend/series/3/sensor/', points: [] }
];
