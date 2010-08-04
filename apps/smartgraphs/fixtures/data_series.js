// ==========================================================================
// Project:   Smartgraphs.DataSeries Fixtures
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

sc_require('models/data_series');

Smartgraphs.DataSeries.FIXTURES = [

  { url: 
      '/backend/series/1/prediction-away/',   
    name: 
      'prediction-away',
    session:
      null,
    isExample: 
      YES,
    points: 
      [] 
  },
    
  { url: 
      '/backend/series/2/prediction-toward/', 
    name:
      'prediction-toward',
    session:
      null,
    isExample:
      YES,
    points: 
      [] 
  },
      
  { url: 
      '/backend/series/3/sensor/',
    name:
      'sensor',
    session:
      null,
    isExample:
      YES,
    points: 
      [] 
  }
];
