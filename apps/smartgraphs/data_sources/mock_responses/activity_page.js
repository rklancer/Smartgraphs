// ==========================================================================
// Project:   Smartgraphs.ActivityPage mock server responses
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// @author    Dewi Win <dwin@concord.org> (activity text)
// ==========================================================================
/*globals Smartgraphs */

sc_require('data_sources/mock_responses/mock_responses');

// ActivityPage list url for first Activity
// generated on the console by running:
//   Smartgraphs.addStepListUrlsToPages()
//   a = Smartgraphs.store.find(Smartgraphs.Activity, '/shared/motion-towards-and-away')
//   Smartgraphs.mockResponseForRecordArray(a.get('pages'), a.get('pageListUrl'))

// individual ActivityPage urls
// originally generated on the console by running: 
//   Smartgraphs.mockResponsesForRecordType(Smartgraphs.ActivityPage)

(function () {
  
  var page, pages = [];

  page = Smartgraphs.mockResponses["/shared/motion-towards-and-away/page/1"] = 
  {
    "steps": [
      "/shared/motion-towards-and-away/page/1/step/1"
    ],
    "name": "Introductory Page",
    "firstStep": "/shared/motion-towards-and-away/page/1/step/1",
    "introText": "<h1>How can you tell a story about motion without using words?</h1>\n\n<p>The picture at right communicates direction of traffic using recognizable symbols. In this activity, you will explore how motions in two opposite directions appear on a position-time graph. By doing so, you will learn conventional methods of motion storytelling and analysis.</p>",
    "url": "/shared/motion-towards-and-away/page/1",
    "activity": "/shared/motion-towards-and-away",
    "index": 1,
    "stepListUrl": "/shared/motion-towards-and-away/page/1/steps"
  };
  pages.push(page);

  page = Smartgraphs.mockResponses["/shared/motion-towards-and-away/page/2"] = 
  {
    "steps": [
      "/shared/motion-towards-and-away/page/2/step/1",
      "/shared/motion-towards-and-away/page/2/step/2"
    ],
    "name": "Prediction Page",
    "firstStep": "/shared/motion-towards-and-away/page/2/step/1",
    "introText": "<p>Let\u2019s start by demonstrating what you already know about representing motion on a graph. "+
                 "Imagine a straight walking path that is 4 meters long.</p>"+
                 "<p>Point A is at the 0-meter mark.</p>"+
                 "<p>Point B is at the 4-meter mark.</p>",
    "url": "/shared/motion-towards-and-away/page/2",
    "activity": "/shared/motion-towards-and-away",
    "index": 2,
    "stepListUrl": "/shared/motion-towards-and-away/page/2/steps"
  };
  pages.push(page);

  page = Smartgraphs.mockResponses["/shared/motion-towards-and-away/page/3"] = 
  {
    "steps": [
      "/shared/motion-towards-and-away/page/3/step/1",
      "/shared/motion-towards-and-away/page/3/step/2"
    ],
    "name": "Motion Sensor Page",
    "firstStep": "/shared/motion-towards-and-away/page/3/step/1",
    "introText": "<p>Let\u2019s practice collecting data with the motion sensor so you can see whether your sketches "+
                "were accurate. You will walk on a 4-meter walking path like the one described earlier.</p>",
    "url": "/shared/motion-towards-and-away/page/3",
    "activity": "/shared/motion-towards-and-away",
    "index": 3,
    "stepListUrl": "/shared/motion-towards-and-away/page/3/steps"
  };
  pages.push(page);

  page = Smartgraphs.mockResponses["/shared/motion-towards-and-away/page/4"] = 
  {
    "steps": [
      "/shared/motion-towards-and-away/page/4/step/1",
      "/shared/motion-towards-and-away/page/4/step/2",
      "/shared/motion-towards-and-away/page/4/step/3"
    ],
    "name": "Replay Page",
    "firstStep": "/shared/motion-towards-and-away/page/4/step/1",
    "introText": 
      "<p>To the right are your predictions for walking away and toward point B.</p>"+
      "<p>Now that you &quot;have the hang of it,&quot; you will walk with the sensor to see if your sketches of "+
      "forward and backward motion are correct.</p>",
    "url": "/shared/motion-towards-and-away/page/4",
    "activity": "/shared/motion-towards-and-away",
    "index": 4,
    "stepListUrl": "/shared/motion-towards-and-away/page/4/steps"
  };
  pages.push(page);

  page = Smartgraphs.mockResponses["/shared/motion-towards-and-away/page/5"] = 
  {
    "steps": [
      "/shared/motion-towards-and-away/page/5/step/1",
      "/shared/motion-towards-and-away/page/5/step/2"
    ],
    "name": "Replay Page",
    "firstStep": "/shared/motion-towards-and-away/page/5/step/1",
    "introText": 
      "<p>At right is the data you just collected with the motion sensor.</p>",
    "url": "/shared/motion-towards-and-away/page/5",
    "activity": "/shared/motion-towards-and-away",
    "index": 5,
    "stepListUrl": "/shared/motion-towards-and-away/page/5/steps"
  };
  pages.push(page);
  Smartgraphs.mockResponses["/shared/motion-towards-and-away/pages"] = pages;


  page = Smartgraphs.mockResponses["/shared/motion-towards-and-away/page/6"] = 
  {
    "steps": [
      "/shared/motion-towards-and-away/page/6/step/1",
      "/shared/motion-towards-and-away/page/6/step/2",
      "/shared/motion-towards-and-away/page/6/step/3",
      "/shared/motion-towards-and-away/page/6/step/4",
      "/shared/motion-towards-and-away/page/6/step/5"     
    ],
    "name": "Replay Page",
    "firstStep": "/shared/motion-towards-and-away/page/6/step/1",
    "introText": 
      "<p>At right is a position-time graph created by someone walking in front of a motion sensor.</p>",
    "url": "/shared/motion-towards-and-away/page/6",
    "activity": "/shared/motion-towards-and-away",
    "index": 6,
    "stepListUrl": "/shared/motion-towards-and-away/page/6/steps"
  };
  pages.push(page);

  page = Smartgraphs.mockResponses["/shared/motion-towards-and-away/page/7"] = 
  {
    "steps": [
      "/shared/motion-towards-and-away/page/7/step/1",
      "/shared/motion-towards-and-away/page/7/step/2",
      "/shared/motion-towards-and-away/page/7/step/3",
      "/shared/motion-towards-and-away/page/7/step/4" 
    ],
    "name": "Replay Page",
    "firstStep": "/shared/motion-towards-and-away/page/7/step/1",
    "introText": 
      "<p>Now you will collect and analyze your own data once again.</p>",
    "url": "/shared/motion-towards-and-away/page/7",
    "activity": "/shared/motion-towards-and-away",
    "index": 7,
    "stepListUrl": "/shared/motion-towards-and-away/page/7/steps"
  };
  pages.push(page);

  page = Smartgraphs.mockResponses["/shared/motion-towards-and-away/page/8"] = 
  {
    "steps": [
      "/shared/motion-towards-and-away/page/8/step/1",
      "/shared/motion-towards-and-away/page/8/step/2",
      "/shared/motion-towards-and-away/page/8/step/3",
      "/shared/motion-towards-and-away/page/8/step/4",
      "/shared/motion-towards-and-away/page/8/step/5",
      "/shared/motion-towards-and-away/page/8/step/6"
    ],
    "name": "Replay Page",
    "firstStep": "/shared/motion-towards-and-away/page/8/step/1",
    "introText": 
      "<p>To the right, two different data sets are plotted on the same graph.</p>",
    "url": "/shared/motion-towards-and-away/page/8",
    "activity": "/shared/motion-towards-and-away",
    "index": 8,
    "stepListUrl": "/shared/motion-towards-and-away/page/8/steps"
  };
  pages.push(page);


  page = Smartgraphs.mockResponses["/shared/motion-towards-and-away/page/9"] = 
  {
    "steps": [
      "/shared/motion-towards-and-away/page/9/step/1",
      "/shared/motion-towards-and-away/page/9/step/2"    
    ],
    "name": "Replay Page",
    "firstStep": "/shared/motion-towards-and-away/page/9/step/1",
    "introText": 
      "<p>Look at the position-time graph to the right. You are going to recreate this graph as closely as "+
      "possible by walking in front of the motion sensor to collect position and time data.</p>",
    "url": "/shared/motion-towards-and-away/page/9",
    "activity": "/shared/motion-towards-and-away",
    "index": 9,
    "stepListUrl": "/shared/motion-towards-and-away/page/9/steps"
  };
  pages.push(page);


  page = Smartgraphs.mockResponses["/shared/motion-towards-and-away/page/10"] = 
  {
    "steps": [
      "/shared/motion-towards-and-away/page/10/step/1",
      "/shared/motion-towards-and-away/page/10/step/2"
    ],
    "name": "Replay Page",
    "firstStep": "/shared/motion-towards-and-away/page/10/step/1",
    "introText": 
      "<p>To the right are the sketches you drew at the beginning of this activity.</p>",
    "url": "/shared/motion-towards-and-away/page/10",
    "activity": "/shared/motion-towards-and-away",
    "index": 10,
    "stepListUrl": "/shared/motion-towards-and-away/page/10/steps"
  };
  pages.push(page);


  page = Smartgraphs.mockResponses["/shared/motion-towards-and-away/page/11"] = 
  {
    "steps": [
      "/shared/motion-towards-and-away/page/11/step/1"
    ],
    "name": "Replay Page",
    "firstStep": "/shared/motion-towards-and-away/page/11/step/1",
    "introText": 
      "<p>Congratulations! You have finished the activity.</p>",
    "url": "/shared/motion-towards-and-away/page/11",
    "activity": "/shared/motion-towards-and-away",
    "index": 10,
    "stepListUrl": "/shared/motion-towards-and-away/page/11/steps"
  };
  pages.push(page);

  Smartgraphs.mockResponses["/shared/motion-towards-and-away/pages"] = pages;


  /********* ACTIVITY 2 (Maria's Run) *****************/

  pages = [];

  page = Smartgraphs.mockResponses["/shared/marias-run/page/1"] = 
  {
    "steps": [
      "/shared/marias-run/page/1/step/1"
    ],
    "name": "",
    "firstStep": "/shared/marias-run/page/1/step/1",
    "introText": 
      "<p>Have you ever tried to tell someone a story about a trip you took? Most likely, your story included words "+
      "and pictures. In this activity, you will tell stories that convey information about motion during a specific "+
      "type of journey.</p>"+
      "<p>You will learn that the motion of an object can be described by its position, direction of motion, and "+
      "speed. Motion can be measured and represented on a graph.</p>",
    "url": "/shared/marias-run/page/1",
    "activity": "/shared/marias-run",
    "index": 1,
    "stepListUrl": "/shared/marias-run/page/1/steps"
  };
  pages.push(page);

  page = Smartgraphs.mockResponses["/shared/marias-run/page/2"] = 
  {
    "steps": [
      "/shared/marias-run/page/2/step/1"
    ],
    "name": "",
    "firstStep": "/shared/marias-run/page/2/step/1",
    "introText": 
      "<p>You are going to try moving in different ways on a straight path while collecting data with a motion "+
      "sensor.</p>"+
      "<p>When you are ready, click Start to record the position and time data for your movements. Walk on the path "+
      "for 30 seconds. Experiment with different kinds of motions (walking fast, slow, forward, backward…).</p>"+
      "<p>The sensor will stop after 30 seconds are up. You can click Clear to clear the graph and try again.</p>",
    "url": "/shared/marias-run/page/2",
    "activity": "/shared/marias-run",
    "index": 2,
    "stepListUrl": "/shared/marias-run/page/2/steps"
  };
  pages.push(page);

  page = Smartgraphs.mockResponses["/shared/marias-run/page/3"] = 
  {
    "steps": [
      "/shared/marias-run/page/3/step/1"
    ],
    "name": "",
    "firstStep": "/shared/marias-run/page/3/step/1",
    "introText": 
      "<p>Next you will try moving at two different speeds.</p>" +
      "<p>Start close to the motion sensor. When you are ready, click Start and walk away from the "+
      "sensor at a slow, steady pace for 15 seconds, then at a faster, steady pace for 15 seconds. " +
      "Click Stop when the time is up.</p>",
    "url": "/shared/marias-run/page/3",
    "activity": "/shared/marias-run",
    "index": 3,
    "stepListUrl": "/shared/marias-run/page/3/steps"
  };
  pages.push(page);

  page = Smartgraphs.mockResponses["/shared/marias-run/page/4"] = 
  {
    "steps": [
      "/shared/marias-run/page/4/step/1"
    ],
    "name": "",
    "firstStep": "/shared/marias-run/page/4/step/1",
    "introText": 
      "<p>This time, you are going to record your position and time during three different tasks.</p>" +
      "<p>Start close to the motion sensor and click Start. " +
      "Walk slowly for about 10 seconds, stop for 10 seconds, then walk faster for the remaining 10 seconds.</p>",
    "url": "/shared/marias-run/page/4",
    "activity": "/shared/marias-run",
    "index": 4,
    "stepListUrl": "/shared/marias-run/page/4/steps"
  };
  pages.push(page);

  page = Smartgraphs.mockResponses["/shared/marias-run/page/5"] = 
  {
    "steps": [
      "/shared/marias-run/page/5/step/1",
      "/shared/marias-run/page/5/step/2",
      "/shared/marias-run/page/5/step/3",
      "/shared/marias-run/page/5/step/4",
      "/shared/marias-run/page/5/step/5",
      "/shared/marias-run/page/5/step/6"                    
    ],
    "name": "",
    "firstStep": "/shared/marias-run/page/5/step/1",
    "introText": 
      "<p>Now you that you’ve had a chance to create position versus time graphs from your own motions, " +
      "let’s look at some graphs that were created by someone running.</p>" +
      "<p>Maria ran practice laps around the school track. " +
      "Her coach recorded the distances she ran after each minute. " +
      "These data are shown in the graph and the table at right. " +
      "Remember that the time was recorded in minutes rather than seconds.</p>",
    "url": "/shared/marias-run/page/5",
    "activity": "/shared/marias-run",
    "index": 5,
    "stepListUrl": "/shared/marias-run/page/5/steps"
  };
  pages.push(page);

  page = Smartgraphs.mockResponses["/shared/marias-run/page/6"] = 
  {
    "steps": [
      "/shared/marias-run/page/6/step/1",
      "/shared/marias-run/page/6/step/2",
      "/shared/marias-run/page/6/step/3",
      "/shared/marias-run/page/6/step/4",
      "/shared/marias-run/page/6/step/5",
      "/shared/marias-run/page/6/step/6"                    
    ],
    "name": "",
    "firstStep": "/shared/marias-run/page/6/step/1",
    "introText": 
       "<p>Remember that the data on the right is the Maria's distance, recorded every minute (60 seconds) by her coach.<p>",
    "url": "/shared/marias-run/page/6",
    "activity": "/shared/marias-run",
    "index": 5,
    "stepListUrl": "/shared/marias-run/page/6/steps"
  };
  pages.push(page);

  page = Smartgraphs.mockResponses["/shared/marias-run/page/7"] = 
  {
    "steps": [
      "/shared/marias-run/page/7/step/1",
      "/shared/marias-run/page/7/step/2",
      "/shared/marias-run/page/7/step/3",
      "/shared/marias-run/page/7/step/4",
      "/shared/marias-run/page/7/step/5",
      "/shared/marias-run/page/7/step/6"             
    ],
    "name": "",
    "firstStep": "/shared/marias-run/page/7/step/1",
    "introText": 
       "<p>Remember that the data on the right is the Maria's distance, recorded every minute (60 seconds) by her coach.<p>",
    "url": "/shared/marias-run/page/7",
    "activity": "/shared/marias-run",
    "index": 5,
    "stepListUrl": "/shared/marias-run/page/7/steps"
  };
  pages.push(page);
     
  page = Smartgraphs.mockResponses["/shared/marias-run/page/8"] = 
  {
    "steps": [
      "/shared/marias-run/page/8/step/1",
      "/shared/marias-run/page/8/step/2"
    ],
    "name": "",
    "firstStep": "/shared/marias-run/page/8/step/1",
    "introText": "",
    "url": "/shared/marias-run/page/8",
    "activity": "/shared/marias-run",
    "index": 5,
    "stepListUrl": "/shared/marias-run/page/8/steps"
  };
  pages.push(page);

  Smartgraphs.mockResponses["/shared/marias-run/pages"] = pages;


  // hand generated demo of second page
  pages = [];

  page = Smartgraphs.mockResponses["/shared/example-activity/page/1"] = 
  {
    "steps": [
      "/shared/example-activity/page/1/step/1",
      "/shared/example-activity/page/1/step/2"    
    ],
    "name": "First Page of Second Activity",
    "firstStep": "/shared/example-activity/page/1/step/1",
    "introText": "<h1>A Second Activity</h1>",
    "url": "/shared/example-activity/page/1",
    "activity": "/shared/marias-run",
    "index": 1,
    "stepListUrl": "/shared/example-activity/page/1/steps"
  };
  pages.push(page);

  Smartgraphs.mockResponses["/shared/example-activity/pages"] = pages;

}());