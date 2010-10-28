// ==========================================================================
// Project:   Smartgraphs.Graph Fixtures
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

sc_require('models/graph');

Smartgraphs.Graph.FIXTURES = [

  { url: 
      '/shared/motion-towards-and-away/graph/prediction-away',
    activity:
      '/shared/motion-towards-and-away',
    name:
      'prediction-away',
    description: 
      'Prediction graph of movement away',
    title:
      'Away',
    axes:
      '/shared/motion-towards-and-away/axes/5m-15s',
    initialSeries: 
      [],
    initialAnnotations:
      []
  },
  
  
  { url: 
      '/shared/motion-towards-and-away/graph/prediction-toward',
    activity:
      '/shared/motion-towards-and-away',      
    name:
      'prediction-toward',
    title:
      'Toward',
    description: 
      'Prediction graph of movement towards',
    axes:
      '/shared/motion-towards-and-away/axes/5m-15s',
    initialSeries: 
      [],
    initialAnnotations:
      []
  },
  
  
  { url: 
      '/shared/motion-towards-and-away/graph/sensor-playing',
    activity:
      '/shared/motion-towards-and-away',
    name:
      'sensor-playing',
    description: 
      'Playing around with the sensor in page 3',
    title: 
      'Position vs. Time',
    axes:
      '/shared/motion-towards-and-away/axes/5m-15s',
    initialSeries: 
      [],
    initialAnnotations:
      []
  },
  
  { url: 
      '/shared/motion-towards-and-away/graph/graph-with-away-prediction',
    activity:
      '/shared/motion-towards-and-away',
    name:
      'graph-with-away-prediction',
    description: 
      "Graph with 'away' prediction for adding 'away' sensor data in page 4",
    title:
      'Away',
    axes:
      '/shared/motion-towards-and-away/axes/5m-15s',
    initialSeries: 
      [],
    initialAnnotations: [
      { type: 'Smartgraphs.FreehandSketch', name: 'prediction-away' }
    ]
  },
  
  { url: 
      '/shared/motion-towards-and-away/graph/graph-with-toward-prediction',
    activity:
      '/shared/motion-towards-and-away',
    name:
      'graph-with-toward-prediction',
    description: 
      "Graph with 'toward' prediction for adding 'toward' sensor data in page 4",
    title:
      'Toward',
    axes:
      '/shared/motion-towards-and-away/axes/5m-15s',
    initialSeries: 
      [],
    initialAnnotations: [
      { type: 'Smartgraphs.FreehandSketch', name: 'prediction-toward' }
    ]
  },
  
  { url: 
      '/shared/motion-towards-and-away/graph/sensor-away',
    activity:
      '/shared/motion-towards-and-away',
    name:
      'sensor-away',
    description: 
      "Graph with'away' sensor data from page 4",
    title:
      'Away',
    axes:
      '/shared/motion-towards-and-away/axes/5m-15s',
    initialSeries: 
      ['sensor-away'],
    initialAnnotations: [
    ]
  },
  
  { url: 
      '/shared/motion-towards-and-away/graph/sensor-toward',
    activity:
      '/shared/motion-towards-and-away',
    name:
      'sensor-toward',
    description: 
      "Graph with 'toward' prediction for adding 'toward' sensor data in page 4",
    title:
      'Toward',
    axes:
      '/shared/motion-towards-and-away/axes/5m-15s',
    initialSeries: 
      ['sensor-toward'],
    initialAnnotations: [
    ]
  },
  
  { url: 
      '/shared/motion-towards-and-away/graph/walking-example-1',
    activity:
      '/shared/motion-towards-and-away',
    name:
      'walking-example-1',
    description: 
      'Graph for multiple choice question in page 6',
    title:
      "An Example Walk",
    axes:
      '/shared/motion-towards-and-away/axes/5m-15s',
    initialSeries: 
      ['walking-example-1'],
    initialAnnotations: [
      { type: 'Smartgraphs.HighlightedPoint', name: 'walking-first-point' }
    ]
  },
  
  { url: 
      '/shared/motion-towards-and-away/graph/two-walkers',
    activity:
      '/shared/motion-towards-and-away',
    name:
      'two-walkers',
    description: 
      'Graph for multiple choice question in page 6',
    title:
      "Position vs. Time",
    axes:
      '/shared/motion-towards-and-away/axes/5m-25s',
    initialSeries: 
      ['walking-away-example', 'walking-toward-example'],
    initialAnnotations: [
    ]
  },
  
  { url: 
      '/shared/motion-towards-and-away/graph/graph-to-match',
    activity:
      '/shared/motion-towards-and-away',
    name:
      'graph-to-match',
    description: 
      'Graph to match with sensor data',
    title:
      "Position vs. Time",
    axes:
      '/shared/motion-towards-and-away/axes/5m-15s',
    initialSeries: 
      [],
    initialAnnotations: [
      { type: 'Smartgraphs.FreehandSketch', name: 'sketch-to-match' }
    ]
  },
  
  { url: 
      '/shared/marias-run/graph/sensor-playing',
    activity:
      '/shared/marias-run',
    name:
      'sensor-playing',
    description: 
      'Playing around with the sensor in page 2',
    title: 
      'Position vs. Time',
    axes:
      '/shared/marias-run/axes/5m-30s',
    initialSeries: 
      [],
    initialAnnotations:
      []
  },
  
  { url: 
      '/shared/marias-run/graph/two-speeds',
    activity:
      '/shared/marias-run',
    name:
      'two-speeds',
    description: 
      'Walking at two speeds in page 3',
    title: 
      'Position vs. Time',
    axes:
      '/shared/marias-run/axes/5m-30s',
    initialSeries: 
      [],
    initialAnnotations:
      []
  },
  
  { url: 
      '/shared/marias-run/graph/start-stop-start',
    activity:
      '/shared/marias-run',
    name:
      'start-stop-start',
    description: 
      'Starting, stopping, and starting again in page 4',
    title: 
      'Position vs. Time',
    axes:
      '/shared/marias-run/axes/5m-30s',
    initialSeries: 
      [],
    initialAnnotations:
      []
  },
  
  { url: 
      '/shared/marias-run/graph/maria',
    activity:
      '/shared/marias-run',
    name:
      'maria',
    description: 
      "Graph of Maria's run",
    title: 
      'Position vs. Time',
    axes:
      '/shared/marias-run/axes/2000m-10min',
    initialSeries: 
      ['maria'],
    initialAnnotations:
      []
  },
  
  { url: 
      '/shared/example-activity/graph/test-graph',
    activity:
      '/shared/example-activity',
    name:
      'test-graph',
    description: 
      'Prediction graph for "test" activity #3',
    title:
      'Away',
    axes:
      '/shared/example-activity/axes/4quads',
    initialSeries: 
      [],
    initialAnnotations:
      []
  },
  
  { url: 
      '/backend/activity/new-step/graph/prediction-away',
    activity:
      '/backend/activity/new-step',
    name:
      'prediction-away',
    description: 
      'Prediction graph of movement away',
    title:
      'Away',
    axes:
      '/shared/motion-towards-and-away/axes/5m-15s',
    initialSeries: 
      [],
    initialAnnotations:
      []
  },
  
  { url: 
      '/backend/activity/new-step/graph/prediction-toward',
    activity:
      '/backend/activity/new-step',      
    name:
      'prediction-toward',
    title:
      'Toward',
    description: 
      'Prediction graph of movement towards',
    axes:
      '/shared/motion-towards-and-away/axes/5m-15s',
    initialSeries: 
      [],
    initialAnnotations:
      []
  }
  
];
