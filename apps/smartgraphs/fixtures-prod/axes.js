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
    xLabelAbbreviated: 'Time (s)',

    yMin: 0,
    yMax: 5,
    ySteps: 10,
    yLabel: 'Position (meters)',
    yLabelAbbreviated: 'Position (m)'
  },

  { guid: 'axes-maria',
  
    xMin: 0,
    xMax: 10,
    xSteps: 10,
    xLabel: 'Time (minutes)',
    xLabelAbbreviated: 'Time (min)',
    
    yMin: 0,
    yMax: 2000,
    ySteps: 10,
    yLabel: 'Position (meters)',
    yLabelAbbreviated: 'Position (m)'
  }

];
