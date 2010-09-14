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
    title:
      'Away',
    axes:
      '/backend/axes/1/5m-15s',
    initialSeries: 
      [],
    initialAnnotations:
      []
  },
  
  
  { url: 
      '/backend/activity/1/graph/2/prediction-toward',
    name:
      'Prediction-Toward',
    title:
      'Toward',
    description: 
      'Prediction graph of movement towards',
    axes:
      '/backend/axes/1/5m-15s',
    initialSeries: 
      [],
    initialAnnotations:
      []
  },
  
  
  { url: 
      '/backend/activity/1/graph/3/sensor-playing',
    name:
      'Sensor-Playing',
    description: 
      'Playing around with the sensor in page 3',
    title: 
      'Away',
    axes:
      '/backend/axes/1/5m-15s',
    initialSeries: 
      [],
    initialAnnotations:
      []
  },
  
  { url: 
      '/backend/activity/1/graph/4/sensor-away',
    name:
      'Sensor-Away',
    description: 
      "Graph with 'away' prediction for adding 'away' sensor data in page 4",
    title:
      'Away',
    axes:
      '/backend/axes/1/5m-15s',
    initialSeries: 
      [],
    initialAnnotations: [
      { type: 'Smartgraphs.FreehandSketch', name: 'prediction-away' }
    ]
  },
  
  { url: 
      '/backend/activity/1/graph/5/sensor-toward',
    name:
      'Sensor-Toward',
    description: 
      "Graph with 'toward' prediction for adding 'toward' sensor data in page 4",
    title:
      'Toward',
    axes:
      '/backend/axes/1/5m-15s',
    initialSeries: 
      [],
    initialAnnotations: [
      { type: 'Smartgraphs.FreehandSketch', name: 'prediction-toward' }
    ]
  },
  
  { url: 
      '/backend/activity/1/graph/6/walking-example-1',
    name:
      'Walking',
    description: 
      'For asking students which direction the walk happened',
    title:
      "An Example Walk",
    axes:
      '/backend/axes/1/5m-15s',
    initialSeries: 
      ['walking-example-1'],
    initialAnnotations: [
      { type: 'Smartgraphs.FreehandSketch', name: 'prediction-toward' },
      { type: 'Smartgraphs.HighlightedPoint', name: 'walking-first-point' }
    ]
  }
];
