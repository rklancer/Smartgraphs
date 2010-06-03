// ==========================================================================
// Project:   Smartgraphs.Axes Fixtures
// Copyright: ©2010 Concord Consortium
// ==========================================================================
/*globals Smartgraphs */

sc_require('models/axes');

Smartgraphs.Axes.FIXTURES = [


  { guid: 'axes-sensor',        // TODO: modify these values

    xMin: 0,
    xMax: 60,
    xSteps: 6,
    xLabel: 'Time (seconds)',

    yMin: 0,
    yMax: 5,
    ySteps: 10,
    yLabel: 'Position (meters)'
  },

  { guid: 'axes-maria',
  
    xMin: 0,
    xMax: 10,
    xSteps: 10,
    xLabel: 'Time (minutes)',
    
    yMin: 0,
    yMax: 2000,
    ySteps: 10,
    yLabel: 'Position (meters)'
  }

];
