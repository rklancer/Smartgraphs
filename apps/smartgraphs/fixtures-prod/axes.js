// ==========================================================================
// Project:   Smartgraphs.Axes Fixtures
// Copyright: ©2010 Concord Consortium
// ==========================================================================
/*globals Smartgraphs */

sc_require('models/axes');

Smartgraphs.Axes.FIXTURES = [

  { guid: 'axes-sensor',        // TODO: modify these values
    xMin: 0,
    xMax: 10,
    yMin: 0,
    yMax: 2000,
    xSteps: 10,
    ySteps: 10,
    xLabel: 'time (minutes)',
    yLabel: 'position (meters)'
  },

  { guid: 'axes-maria',
    xMin: 0,
    xMax: 10,
    yMin: 0,
    yMax: 2000,
    xSteps: 10,
    ySteps: 10,
    xLabel: 'time (minutes)',
    yLabel: 'position (meters)'
  }

];
