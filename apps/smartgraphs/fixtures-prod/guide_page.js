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
    introText: 
      "<p>Have you ever tried to tell someone a story about a trip you took? " +
      "Most likely, your story included words and pictures. In this activity, " +
      "you will tell stories that convey information about motion during a specific type of journey.</p>" +
      "<p>You will learn that the motion of an object can be described by its position, direction of motion, and speed. "+
      "Motion can be measured and represented on a graph.</p>",
    firstDialogTurn: 'turn-1',
    dataSeries: null,
    axes: null,
    sensorAppletShouldBeEnabled: NO
  },
  
  
  
  { guid: 2,
    sequence: 'sequence-1',
    index: 1,
    title: '2',
    introText: 
     '<p>Now you are going to try moving at two different speeds.</p>' +
     '<p>Start at the 0-meter mark. When you are ready, click Start and walk at a slow, steady pace for 5 seconds, ' + 
     'then at a faster, steady pace for 5 seconds. Click Stop when the time is up.</p>',
    firstDialogTurn: 'turn-2-start',
    dataSeries: 'series-sensor',
    axes: 'axes-sensor',
    sensorAppletShouldBeEnabled: YES    
  },
  
  { guid: 3,
    sequence: 'sequence-1',
    index: 1,
    title: '3',
    introText: 
     '<p>This time, you are going to record your position and time during three different tasks.</p>' +
     '<p>Start at 0 meters again and click Start. Walk slowly for about 3 seconds, stop for 4 seconds, ' +
     'then walk faster for the remaining 3 seconds. Click Stop.</p>',
    firstDialogTurn: 'turn-3-start',
    dataSeries: 'series-sensor',
    axes: 'axes-sensor',
    sensorAppletShouldBeEnabled: YES    
  },
  
  { guid: 4,
    sequence: 'sequence-1',
    index: 1,
    title: '4',
    introText: 
     '<p>Maria ran practice laps around the school track. ' +
     'Her coach recorded the distances she ran after each minute (60 seconds).</p>' +
     '<p>These data are shown in the graph and the table at right.</p>',
    firstDialogTurn: 'turn-4-start',
    dataSeries: 'series-maria',
    axes: 'axes-maria',
    sensorAppletShouldBeEnabled: NO    
  },
  
  { guid: 5,
    sequence: 'sequence-1',
    index: 1,
    title: '5',
    introText: 
     "<p>Remember that the data on the right is the Maria's distance, recorded every minute (60 seconds) by her coach.<p>",
    firstDialogTurn: 'turn-5-start',
    dataSeries: 'series-maria',
    axes: 'axes-maria',
    sensorAppletShouldBeEnabled: NO    
  },
  
  { guid: 6,
    sequence: 'sequence-1',
    index: 1,
    title: '6',
    introText: 
     "<p>Remember that the data on the right is the Maria's distance, recorded every minute (60 seconds) by her coach.<p>",
    firstDialogTurn: 'turn-6-start',
    dataSeries: 'series-maria',
    axes: 'axes-maria',
    sensorAppletShouldBeEnabled: NO    
  }
];
