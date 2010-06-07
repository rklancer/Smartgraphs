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
      "<p>You are going to try moving in different ways on a straight path while collecting data with a motion " +
      "sensor.</p>" +
      "<p>When you are ready, click Start to record the position and time data for your movements. " +
      "Walk on the path for 30 seconds. " +
      "Experiment with different kinds of motions (walking fast, slow, forward, backward…). " +
      "Click Stop after 30 seconds are up.</p>",
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
      "<p>Next you will try moving at two different speeds.</p>" +
      "<p>Start close to the motion sensor. When you are ready, click Reset and then Start and walk away from the "+
      "sensor at a slow, steady pace for 15 seconds, then at a faster, steady pace for 15 seconds. " +
      "Click Stop when the time is up.</p>",
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
      "<p>This time, you are going to record your position and time during three different tasks.</p>" +
      "<p>Start close to the motion sensor, click Reset, and then click Start. " +
      "Walk slowly for about 10 seconds, stop for 10 seconds, then walk faster for the remaining 10 seconds. " + 
      "Click Stop.</p>",
    firstDialogTurn: 'turn-4-start',
    dataSeries: 'series-sensor',
    axes: 'axes-sensor',
    sensorAppletShouldBeEnabled: YES    
  },

  { guid: 5,
    sequence: 'sequence-1',
    index: 1,
    title: '5',
    introText: 
      "<p>Now you that you’ve had a chance to create position versus time graphs from your own motions, " +
      "let’s look at some graphs that were created by someone running.</p>" +
      "<p>Maria ran practice laps around the school track. " +
      "Her coach recorded the distances she ran after each minute. " +
      "These data are shown in the graph and the table at right. " +
      "Remember that the time was recorded in minutes rather than seconds.</p>",
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
  },
  
  { guid: 7,
    sequence: 'sequence-1',
    index: 1,
    title: '7',
    introText: 
     "<p>Remember that the data on the right is the Maria's distance, recorded every minute (60 seconds) by her coach.<p>",
    firstDialogTurn: 'turn-7-start',
    dataSeries: 'series-maria',
    axes: 'axes-maria',
    sensorAppletShouldBeEnabled: NO    
  },
  
  { guid: 8,
    sequence: 'sequence-1',
    index: 1,
    title: '8',
    introText: 
      "<p>Think back on the activities you just did.</p>" +
      "<p>Now that you have had a chance to create your own position versus time graphs, " +
      "explain what kind of details this graph can tell about motion on a straight track. " +
      "Give examples of some details that a position versus time graph cannot tell.</p>",
    firstDialogTurn: 'turn-8-start',
    dataSeries: 'series-maria',
    axes: 'axes-maria',
    sensorAppletShouldBeEnabled: NO    
  }
  
];
