// ==========================================================================
// Project:   Smartgraphs.Axes Fixtures
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

sc_require('models/axes');

Smartgraphs.Axes.FIXTURES = [
  
  { url: '/shared/motion-towards-and-away/axes/5m-15s',

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
  
  { url: '/shared/motion-towards-and-away/axes/5m-25s',
  
    xMin: 0,
    xMax: 25,
    xSteps: 25,
    xLabel: 'Time (seconds)',
    xLabelAbbreviated: 'Time (s)',

    yMin: 0,
    yMax: 5,
    ySteps: 10,
    yLabel: 'Position (meters)',
    yLabelAbbreviated: 'Position (m)'
  },
  
  { url: '/shared/marias-run/axes/5m-30s',

    xMin: 0,
    xMax: 30,
    xSteps: 6,
    xLabel: 'Time (seconds)',
    xLabelAbbreviated: 'Time (s)',

    yMin: 0,
    yMax: 5,
    ySteps: 10,
    yLabel: 'Position (meters)',
    yLabelAbbreviated: 'Position (m)'
  },
  
  { url: '/shared/marias-run/axes/2000m-10min',

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
  },
  
  { url: '/shared/example-activity/axes/4quads',

    xMin: -10,
    xMax: 10,
    xSteps: 20,
    xLabel: 'Time (seconds)',
    xLabelAbbreviated: 'Time (s)',

    yMin: -5,
    yMax: 5,
    ySteps: 10,
    yLabel: 'Position (meters)',
    yLabelAbbreviated: 'Position (m)'
  }

];
