// ==========================================================================
// Project:   Smartgraphs.ActivityPage Fixtures
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// @author    Dewi Win <dwin@concord.org> (activity text)
// ==========================================================================
/*globals Smartgraphs */

sc_require('models/activity_page');

Smartgraphs.ActivityPage.FIXTURES = [

  { url: 
      '/backend/activity/1/page/1',
    activity:
      '/backend/activity/1/motion-without-words/',
    name: 
      'Introductory Page',
    index: 
      1,
    introText: 
      '<h1>How can you tell a story about motion without using words?</h1>'+
      '<p>The picture at right communicates direction of traffic using recognizable symbols. In this activity, you '+
      'will explore how motions in two opposite directions appear on a position-time graph. By doing so, you will '+
      'learn conventional methods of motion storytelling and analysis.</p>',
    steps: [
      '/backend/activity/1/page/1/step/1/'
    ],
    firstStep:
      '/backend/activity/1/page/1/step/1/'
  },
  
  
  { url: 
      '/backend/activity/1/page/2',
    activity:
      '/backend/activity/1/motion-without-words/',
    name: 
      'Second Page',
    index: 
      2,
    introText: 
      '<p>Let’s start by demonstrating what you already know about representing motion on a graph. Imagine a '+
      'straight walking path that is 5 meters long. Point A is at the 0-meter mark. Point B is at the 4-meter mark.'+
      '</p>'+
      '<img src="'+sc_static('resources/numberline.png')+'">',
    steps: [
      '/backend/activity/1/page/2/step/1/', 
      '/backend/activity/1/page/2/step/2/'
    ],
    firstStep:
      '/backend/activity/1/page/2/step/1/'
  },
  
  
  { url: 
      '/backend/activity/1/page/3',
    activity:
      '/backend/activity/1/motion-without-words/',
    name: 
      'Third Page',
    index: 
      3,
    introText: 
      '<p>Let’s practice collecting data with the motion sensor so you can see whether your sketches were '+
      'accurate. You will walk on a 5-meter walking path like the one described earlier.</p>',
    steps: [
      '/backend/activity/1/page/3/step/1/', 
      '/backend/activity/1/page/3/step/2/'
    ],
    firstStep:
      '/backend/activity/1/page/3/step/1/'
  },
  
  { url: 
      '/backend/activity/1/page/4',
    activity:
      '/backend/activity/1/motion-without-words/',
    name: 
      'Fourth Page',
    index: 
      4,
    introText:
      '<p>How did the actual graph of your motion compare to your prediction?<p>',
    steps: [
      '/backend/activity/1/page/4/step/1/'
    ],
    firstStep:
      '/backend/activity/1/page/4/step/1/'
  },
  
  { url: 
      '/backend/activity/2/page/1/',
    activity:
      '/backend/activity/2/second-activity/',
    name: 
      'First Page',
    index: 
      1,
    introText:
      '<h1>This is a second activity</h1>',
    steps: [
      '/backend/activity/2/page/1/step/1/'
    ],
    firstStep:
      '/backend/activity/2/page/1/step/1/'
  }

];
