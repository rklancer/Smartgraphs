// ==========================================================================
// Project:   Smartgraphs.ActivityStep Fixtures
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// @author    Dewi Win <dwin@concord.org> (activity text)
// ==========================================================================
/*globals Smartgraphs */

sc_require('models/activity_step');

Smartgraphs.ActivityStep.FIXTURES = [

  { url: 
      '/backend/activity/1/page/1/step/1/',
    activityPage:
      '/backend/activity/1/page/1/',
    beforeText: 
      '',
    responseTemplate: 
      null,
    afterText:
      '',
    buttons: 
      [],
    triggerResponses: [
      '/backend/activity/1/page/1/step/1/response/1/step-beginning/'
    ],
    submitButtonShouldBeVisible: 
      NO,
    submitButtonTitle: 
      '',
    isLastStep: 
      YES
  },
  
  
  { url: 
      '/backend/activity/1/page/2/step/1/',
    activityPage:
      '/backend/activity/1/page/2/',
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
      '/backend/activity/1/page/2/step/1/response/1/step-beginning/',
      '/backend/activity/1/page/2/step/1/response/2/step-finished/'
    ],
    submitButtonShouldBeVisible: 
      YES,
    submitButtonTitle: 
      'Done',
    isLastStep: 
      NO
  },
  
  
  { url: 
      '/backend/activity/1/page/2/step/2/',
    activityPage:
      '/backend/activity/1/page/2/',
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
      '/backend/activity/1/page/2/step/2/response/1/step-beginning/'
    ],
    submitButtonShouldBeVisible: 
      YES,
    submitButtonTitle: 
      'Done',
    isLastStep: 
      YES
  },
  
  
  { url: 
      '/backend/activity/1/page/3/step/1/',
    activityPage:
      '/backend/activity/1/page/3/',
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
      '/backend/activity/1/page/3/step/1/response/1/step-beginning/',
      '/backend/activity/1/page/3/step/1/response/2/step-finished/'
    ],
    submitButtonShouldBeVisible: 
      YES,
    submitButtonTitle: 
      'Done',
    isLastStep: 
      NO
  },
  
  
  { url: 
      '/backend/activity/1/page/3/step/2/',
    activityPage:
      '/backend/activity/1/page/3/',
    beforeText: 
      '<p>How are different motions represented on a position-time graph? (For example, what does the graph look '+
      'like when you are standing still, walking forward ...?)</p>'+
      '<p>Try to use some of the following words: slope, flat, upward, downward, curved, straight, steep, gradual, '+
      'line, curve.',
    responseTemplate: 
      '/backend/response-template/2/open/',
    afterText:
      '',
    buttons: 
      [],
    triggerResponses: [
      '/backend/activity/1/page/3/step/2/response/1/step-beginning/'
    ],
    submitButtonShouldBeVisible: 
      YES,
    submitButtonTitle: 
      'Submit My Answer',
    isLastStep: 
      YES
  },
  
  
  { url: 
      '/backend/activity/1/page/4/step/1/',
    activityPage:
      '/backend/activity/1/page/3/',
    beforeText: 
      '<p>At right is your prediction and your actual motion, together</p>',
    responseTemplate: 
      null,
    afterText:
      '',
    buttons: 
      [],
    triggerResponses: [
      '/backend/activity/1/page/4/step/1/response/1/step-beginning/'
    ],
    submitButtonShouldBeVisible: 
      NO,
    submitButtonTitle: 
      '',
    isLastStep: 
      YES
  },
  
  { url: 
      '/backend/activity/2/page/1/step/1/',
    activityPage:
      '/backend/activity/2/page/1/',
    beforeText: 
      '<p>See? A new activity</p>',
    responseTemplate: 
      null,
    afterText:
      '',
    buttons: 
      [],
    triggerResponses: [
    ],
    submitButtonShouldBeVisible: 
      NO,
    submitButtonTitle: 
      '',
    isLastStep: 
      YES
  }
  
];
