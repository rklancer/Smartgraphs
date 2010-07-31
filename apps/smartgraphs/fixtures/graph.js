// ==========================================================================
// Project:   Smartgraphs.Graph Fixtures
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

sc_require('models/graph');

Smartgraphs.Graph.FIXTURES = [

  { url: 
      'prediction-away',
    name:
      'prediction-away',
    description: 
      'Prediction graph of movement away',
    axes:
      '/backend/axes/1/prediction-away/',
    allSeries: 
      []
  },
  
  
  { url: 
      'prediction-toward',
    name:
      'prediction-toward',
    description: 
      'Prediction graph of movement towards',
    axes:
      '/backend/axes/2/prediction-toward/',
    allSeries: 
      []
  },
  
  
  { url: 
      'sensor-1',
    name:
      'sensor-1',
    description: 
      'Playing around with the sensor in page 3',
    axes:
      '/backend/axes/3/sensor-5m-15s/',
    allSeries: 
      []
  }
];
