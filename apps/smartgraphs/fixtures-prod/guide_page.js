// ==========================================================================
// Project:   Smartgraphs.GuidePage Fixtures
// Copyright: ©2010 Concord Consortium
// ==========================================================================
/*globals Smartgraphs */

sc_require('models/guide_page');

Smartgraphs.GuidePage.FIXTURES = [

  { guid: 1,
    sequence: 'sequence-1',
    index: 1,
    title: '1',
    introText: 'Prefab data',
    firstDialogTurn: 'turn-1',
    dataSeries: 'series-maria',
    axes: 'axes-maria',
    sensorAppletShouldBeEnabled: NO,
    shouldShowImage: NO
  },

  { guid: 2,
    sequence: 'sequence-1',
    index: 1,
    title: '2',
    introText: 'Dynamic data',
    firstDialogTurn: 'turn-2',
    dataSeries: 'series-sensor',
    axes: 'axes-sensor',
    sensorAppletShouldBeEnabled: NO,
    shouldShowImage: NO    
  }
  
];
