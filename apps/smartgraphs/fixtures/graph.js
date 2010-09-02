// ==========================================================================
// Project:   Smartgraphs.Graph Fixtures
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

sc_require('models/graph');

Smartgraphs.Graph.FIXTURES = [

  { url: 
      '/backend/activity/1/graph/1/prediction-away',
    name:
      'Prediction-Away',
    description: 
      'Prediction graph of movement away',
    axes:
      '/backend/axes/1/5m-15s',
    initialSeries: 
      []
  },
  
  
  { url: 
      '/backend/activity/1/graph/2/prediction-toward',
    name:
      'Prediction-Toward',
    description: 
      'Prediction graph of movement towards',
    axes:
      '/backend/axes/1/5m-15s',
    initialSeries: 
      []
  },
  
  
  { url: 
      '/backend/activity/1/graph/3/sensor-playing',
    name:
      'Sensor-Playing',
    description: 
      'Playing around with the sensor in page 3',
    axes:
      '/backend/axes/1/5m-15s',
    initialSeries: 
      []
  },
  
  { url: 
      '/backend/activity/1/graph/4/combined',
    name:
      'Combined',
    description: 
      'Combines the prediction graphs and the sensor graph',
    axes:
      '/backend/axes/1/5m-15s',
    initialSeries: 
      ['prediction-away', 'sensor']
  }
];
