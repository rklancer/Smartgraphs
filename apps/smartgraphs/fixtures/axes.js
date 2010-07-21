// ==========================================================================
// Project:   Smartgraphs.Axes Fixtures
// Copyright: ©2010 Concord Consortium
// ==========================================================================
/*globals Smartgraphs */

sc_require('models/axes');

Smartgraphs.Axes.FIXTURES = [

  { guid: 'prediction-away-axes',

    xMin: 0,
    xMax: 15,
    xSteps: 15,
    xLabel: 'Time (seconds)',
    xLabelAbbreviated: 'Time (s)',

    yMin: 0,
    yMax: 5,
    ySteps: 10,
    yLabel: 'Position (meters)',
    yLabelAbbreviated: 'Position (m)'
  },


  { guid: 'prediction-toward-axes',

    xMin: 0,
    xMax: 15,
    xSteps: 15,
    xLabel: 'Time (seconds)',
    xLabelAbbreviated: 'Time (s)',

    yMin: 0,
    yMax: 5,
    ySteps: 10,
    yLabel: 'Position (meters)',
    yLabelAbbreviated: 'Position (m)'
  }

];
