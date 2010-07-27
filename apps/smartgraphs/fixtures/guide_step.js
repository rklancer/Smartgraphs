// ==========================================================================
// Project:   Smartgraphs.GuideStep Fixtures
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Smartgraphs */

sc_require('models/guide_step');

Smartgraphs.GuideStep.FIXTURES = [

  { guid: 
      'page-1-step-1',
    guidePage:
      'page-1',
    beforeText: 
      '<p>This is some before text</p>',
    responseTemplate: 
      null,
    afterText:
      '',
    buttons: 
      [],
    triggerResponses: [
      'p1s1-do-begin-step'
    ],
    submitButtonShouldBeVisible: 
      NO,
    submitButtonTitle: 
      '',
    isLastStep: 
      YES
  },
  
  
  { guid: 
      'page-2-step-1',
    guidePage:
      'page-2',
    beforeText: 
      '<p>In the top-right area, draw a graph of someone walking at a slow, steady pace from point A to point B '+
      'between 0 and 15 seconds.</p>',
    responseTemplate: 
      null,
    afterText:
      '',
    buttons: 
      [],
    triggerResponses: [
      'p2s1-do-begin-step',
      'p2s1-do-step-finished'
    ],
    submitButtonShouldBeVisible: 
      YES,
    submitButtonTitle: 
      'Done',
    isLastStep: 
      NO
  },
  
  
  { guid: 
      'page-2-step-2',
    guidePage:
      'page-2',
    beforeText: 
      '<p>In the bottom-right area, draw a graph of someone walking at a slow, steady pace from point B to point A '+
      'between 0 and 15 seconds. Click Next when you are ready.</p>',
    responseTemplate: 
      null,
    afterText:
      '',
    buttons: 
      [],
    triggerResponses: [
      'p2s2-do-begin-step'
    ],
    submitButtonShouldBeVisible: 
      YES,
    submitButtonTitle: 
      'Done',
    isLastStep: 
      YES
  },
  
  
  { guid: 
      'page-3-step-1',
    guidePage:
      'page-3',
    beforeText: 
      '<p>Place the sensor at the 0-meter mark. Stand near the sensor. When you are ready, have your partner click '+
      'Start to record the position and time data for your movements. Walk on the path for 15 seconds. Experiment '+
      'with different kinds of motions (walking fast, slow, forward, backward…) Click Stop after 15 seconds is up. '+
      'Click Reset to try a different movement.</p>',
    responseTemplate: 
      null,
    afterText:
      '',
    buttons: 
      [],
    triggerResponses: [
      'p3s1-do-begin-step'
    ],
    submitButtonShouldBeVisible: 
      YES,
    submitButtonTitle: 
      'Done',
    isLastStep: 
      NO
  },
  
  
  { guid: 
      'page-3-step-2',
    guidePage:
      'page-3',
    beforeText: 
      '<p>How are different motions represented on a position-time graph? (For example, what does the graph look '+
      'like when you are standing still, walking forward ...?)</p>'+
      '<p>Try to use some of the following words: slope, flat, upward, downward, curved, straight, steep, gradual, '+
      'line, curve.',
    responseTemplate: 
      null,
    afterText:
      '',
    buttons: 
      [],
    triggerResponses: [
      'step-5-begin'
    ],
    submitButtonShouldBeVisible: 
      YES,
    submitButtonTitle: 
      'Submit My Answer',
    isLastStep: 
      YES
  }
];
