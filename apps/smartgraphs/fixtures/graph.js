// ==========================================================================
// Project:   Smartgraphs.Graph Fixtures
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Smartgraphs */

sc_require('models/graph');

Smartgraphs.Graph.FIXTURES = [

  { guid: 
      'prediction-away',
    
    name:
      'prediction-away',
      
    description: 
      'Prediction graph of movement away',
    
    axes:
      'prediction-away-axes',
      
    allSeries: 
      ['prediction-away-series']
  },
  
  
  { guid: 
      'prediction-toward',
    
    name:
      'prediction-away',

    description: 
      'Prediction graph of movement towards',
      
    axes:
      'prediction-toward-axes',
      
    allSeries: 
      ['prediction-toward-series']
  }
  
];
