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
    activity:
      '/backend/activity/1',
    name:
      'prediction-away',
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
    activity:
      '/backend/activity/1',      
    name:
      'prediction-toward',
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
    activity:
      '/backend/activity/1',
    name:
      'sensor-playing',
    description: 
      'Playing around with the sensor in page 3',
    title: 
      'Position vs. Time',
    axes:
      '/backend/axes/1/5m-15s',
    initialSeries: 
      [],
    initialAnnotations:
      []
  },
  
  { url: 
      '/backend/activity/1/graph/4/graph-with-away-prediction',
    activity:
      '/backend/activity/1',
    name:
      'graph-with-away-prediction',
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
      '/backend/activity/1/graph/5/graph-with-toward-prediction',
    activity:
      '/backend/activity/1',
    name:
      'graph-with-toward-prediction',
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
      '/backend/activity/1/graph/6/sensor-away',
    activity:
      '/backend/activity/1',
    name:
      'sensor-away',
    description: 
      "Graph with'away' sensor data from page 4",
    title:
      'Away',
    axes:
      '/backend/axes/1/5m-15s',
    initialSeries: 
      ['sensor-away'],
    initialAnnotations: [
    ]
  },
  
  { url: 
      '/backend/activity/1/graph/7/sensor-toward',
    activity:
      '/backend/activity/1',
    name:
      'sensor-toward',
    description: 
      "Graph with 'toward' prediction for adding 'toward' sensor data in page 4",
    title:
      'Toward',
    axes:
      '/backend/axes/1/5m-15s',
    initialSeries: 
      ['sensor-toward'],
    initialAnnotations: [
    ]
  },
  
  { url: 
      '/backend/activity/1/graph/8/walking-example-1',
    activity:
      '/backend/activity/1',
    name:
      'walking-example-1',
    description: 
      'Graph for multiple choice question in page 6',
    title:
      "An Example Walk",
    axes:
      '/backend/axes/1/5m-15s',
    initialSeries: 
      ['walking-example-1'],
    initialAnnotations: [
      { type: 'Smartgraphs.HighlightedPoint', name: 'walking-first-point' }
    ]
  },
  
  { url: 
      '/backend/activity/1/graph/9/two-walkers',
    activity:
      '/backend/activity/1',
    name:
      'two-walkers',
    description: 
      'Graph for multiple choice question in page 6',
    title:
      "Position vs. Time",
    axes:
      '/backend/axes/2/5m-25s',
    initialSeries: 
      ['walking-away-example', 'walking-toward-example'],
    initialAnnotations: [
    ]
  },
  
  { url: 
      '/backend/activity/1/graph/10/graph-to-match',
    activity:
      '/backend/activity/1',
    name:
      'graph-to-match',
    description: 
      'Graph to match with sensor data',
    title:
      "Position vs. Time",
    axes:
      '/backend/axes/1/5m-15s',
    initialSeries: 
      [],
    initialAnnotations: [
      { type: 'Smartgraphs.FreehandSketch', name: 'sketch-to-match' }
    ]
  },
  
  { url: 
      '/backend/activity/2/graph/1/sensor-playing',
    activity:
      '/backend/activity/2',
    name:
      'sensor-playing',
    description: 
      'Playing around with the sensor in page 2',
    title: 
      'Position vs. Time',
    axes:
      '/backend/axes/3/5m-30s',
    initialSeries: 
      [],
    initialAnnotations:
      []
  },
  
  { url: 
      '/backend/activity/2/graph/2/two-speeds',
    activity:
      '/backend/activity/2',
    name:
      'two-speeds',
    description: 
      'Walking at two speeds in page 3',
    title: 
      'Position vs. Time',
    axes:
      '/backend/axes/3/5m-30s',
    initialSeries: 
      [],
    initialAnnotations:
      []
  },
  
  { url: 
      '/backend/activity/2/graph/3/start-stop-start',
    activity:
      '/backend/activity/2',
    name:
      'start-stop-start',
    description: 
      'Starting, stopping, and starting again in page 4',
    title: 
      'Position vs. Time',
    axes:
      '/backend/axes/3/5m-30s',
    initialSeries: 
      [],
    initialAnnotations:
      []
  },
  
  { url: 
      '/backend/activity/2/graph/4/maria',
    activity:
      '/backend/activity/2',
    name:
      'maria',
    description: 
      "Graph of Maria's run",
    title: 
      'Position vs. Time',
    axes:
      '/backend/axes/4/2000m-10min',
    initialSeries: 
      ['maria'],
    initialAnnotations:
      []
  }
  
];
