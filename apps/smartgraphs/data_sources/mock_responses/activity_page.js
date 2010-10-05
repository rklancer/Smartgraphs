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
//   a = Smartgraphs.store.find(Smartgraphs.Activity, '/backend/activity/1')
//   Smartgraphs.mockResponseForRecordArray(a.get('pages'), a.get('pageListUrl'))

// individual ActivityPage urls
// originally generated on the console by running: 
//   Smartgraphs.mockResponsesForRecordType(Smartgraphs.ActivityPage)

var page, pages = [];

page = Smartgraphs.mockResponses["/backend/activity/1/page/1"] = 
{
  "steps": [
    "/backend/activity/1/page/1/step/1"
  ],
  "name": "Introductory Page",
  "firstStep": "/backend/activity/1/page/1/step/1",
  "introText": "<h1>How can you tell a story about motion without using words?</h1>\n\n<p>The picture at right communicates direction of traffic using recognizable symbols. In this activity, you will explore how motions in two opposite directions appear on a position-time graph. By doing so, you will learn conventional methods of motion storytelling and analysis.</p>",
  "url": "/backend/activity/1/page/1",
  "activity": "/backend/activity/1",
  "index": 1,
  "stepListUrl": "/backend/activity/1/page/1/steps"
};
pages.push(page);

page = Smartgraphs.mockResponses["/backend/activity/1/page/2"] = 
{
  "steps": [
    "/backend/activity/1/page/2/step/1",
    "/backend/activity/1/page/2/step/2"
  ],
  "name": "Prediction Page",
  "firstStep": "/backend/activity/1/page/2/step/1",
  "introText": "<p>Let\u2019s start by demonstrating what you already know about representing motion on a graph. "+
               "Imagine a straight walking path that is 4 meters long.</p>"+
               "<p>Point A is at the 0-meter mark.</p>"+
               "<p>Point B is at the 4-meter mark.</p>",
  "url": "/backend/activity/1/page/2",
  "activity": "/backend/activity/1",
  "index": 2,
  "stepListUrl": "/backend/activity/1/page/2/steps"
};
pages.push(page);

page = Smartgraphs.mockResponses["/backend/activity/1/page/3"] = 
{
  "steps": [
    "/backend/activity/1/page/3/step/1",
    "/backend/activity/1/page/3/step/2"
  ],
  "name": "Motion Sensor Page",
  "firstStep": "/backend/activity/1/page/3/step/1",
  "introText": "<p>Let\u2019s practice collecting data with the motion sensor so you can see whether your sketches "+
              "were accurate. You will walk on a 4-meter walking path like the one described earlier.</p>",
  "url": "/backend/activity/1/page/3",
  "activity": "/backend/activity/1",
  "index": 3,
  "stepListUrl": "/backend/activity/1/page/3/steps"
};
pages.push(page);

page = Smartgraphs.mockResponses["/backend/activity/1/page/4"] = 
{
  "steps": [
    "/backend/activity/1/page/4/step/1",
    "/backend/activity/1/page/4/step/2",
    "/backend/activity/1/page/4/step/3"
  ],
  "name": "Replay Page",
  "firstStep": "/backend/activity/1/page/4/step/1",
  "introText": 
    "<p>To the right are your predictions for walking away and toward point B.</p>"+
    "<p>Now that you &quot;have the hang of it,&quot; you will walk with the sensor to see if your sketches of "+
    "forward and backward motion are correct.</p>",
  "url": "/backend/activity/1/page/4",
  "activity": "/backend/activity/1",
  "index": 4,
  "stepListUrl": "/backend/activity/1/page/4/steps"
};
pages.push(page);

page = Smartgraphs.mockResponses["/backend/activity/1/page/5"] = 
{
  "steps": [
    "/backend/activity/1/page/5/step/1",
    "/backend/activity/1/page/5/step/2"
  ],
  "name": "Replay Page",
  "firstStep": "/backend/activity/1/page/5/step/1",
  "introText": 
    "<p>At right is the data you just collected with the motion sensor.</p>",
  "url": "/backend/activity/1/page/5",
  "activity": "/backend/activity/1",
  "index": 5,
  "stepListUrl": "/backend/activity/1/page/5/steps"
};
pages.push(page);
Smartgraphs.mockResponses["/backend/activity/1/pages"] = pages;


page = Smartgraphs.mockResponses["/backend/activity/1/page/6"] = 
{
  "steps": [
    "/backend/activity/1/page/6/step/1",
    "/backend/activity/1/page/6/step/2",
    "/backend/activity/1/page/6/step/3",
    "/backend/activity/1/page/6/step/4",
    "/backend/activity/1/page/6/step/5"     
  ],
  "name": "Replay Page",
  "firstStep": "/backend/activity/1/page/6/step/1",
  "introText": 
    "<p>At right is a position-time graph created by someone walking in front of a motion sensor.</p>",
  "url": "/backend/activity/1/page/6",
  "activity": "/backend/activity/1",
  "index": 6,
  "stepListUrl": "/backend/activity/1/page/6/steps"
};
pages.push(page);

page = Smartgraphs.mockResponses["/backend/activity/1/page/7"] = 
{
  "steps": [
    "/backend/activity/1/page/7/step/1",
    "/backend/activity/1/page/7/step/2",
    "/backend/activity/1/page/7/step/3",
    "/backend/activity/1/page/7/step/4" 
  ],
  "name": "Replay Page",
  "firstStep": "/backend/activity/1/page/7/step/1",
  "introText": 
    "<p>Now you will collect and analyze your own data once again.</p>",
  "url": "/backend/activity/1/page/7",
  "activity": "/backend/activity/1",
  "index": 7,
  "stepListUrl": "/backend/activity/1/page/7/steps"
};
pages.push(page);

page = Smartgraphs.mockResponses["/backend/activity/1/page/8"] = 
{
  "steps": [
    "/backend/activity/1/page/8/step/1",
    "/backend/activity/1/page/8/step/2",
    "/backend/activity/1/page/8/step/3",
    "/backend/activity/1/page/8/step/4",
    "/backend/activity/1/page/8/step/5",
    "/backend/activity/1/page/8/step/6"
  ],
  "name": "Replay Page",
  "firstStep": "/backend/activity/1/page/8/step/1",
  "introText": 
    "<p>To the right, two different data sets are plotted on the same graph.</p>",
  "url": "/backend/activity/1/page/8",
  "activity": "/backend/activity/1",
  "index": 8,
  "stepListUrl": "/backend/activity/1/page/8/steps"
};
pages.push(page);


page = Smartgraphs.mockResponses["/backend/activity/1/page/9"] = 
{
  "steps": [
    "/backend/activity/1/page/9/step/1",
    "/backend/activity/1/page/9/step/2"    
  ],
  "name": "Replay Page",
  "firstStep": "/backend/activity/1/page/9/step/1",
  "introText": 
    "<p>Look at the position-time graph to the right. You are going to recreate this graph as closely as "+
    "possible by walking in front of the motion sensor to collect position and time data.</p>",
  "url": "/backend/activity/1/page/9",
  "activity": "/backend/activity/1",
  "index": 9,
  "stepListUrl": "/backend/activity/1/page/9/steps"
};
pages.push(page);


page = Smartgraphs.mockResponses["/backend/activity/1/page/10"] = 
{
  "steps": [
    "/backend/activity/1/page/10/step/1",
    "/backend/activity/1/page/10/step/2"
  ],
  "name": "Replay Page",
  "firstStep": "/backend/activity/1/page/10/step/1",
  "introText": 
    "<p>To the right are the sketches you drew at the beginning of this activity.</p>",
  "url": "/backend/activity/1/page/10",
  "activity": "/backend/activity/1",
  "index": 10,
  "stepListUrl": "/backend/activity/1/page/10/steps"
};
pages.push(page);


page = Smartgraphs.mockResponses["/backend/activity/1/page/11"] = 
{
  "steps": [
    "/backend/activity/1/page/11/step/1"
  ],
  "name": "Replay Page",
  "firstStep": "/backend/activity/1/page/11/step/1",
  "introText": 
    "<p>Congratulations! You have finished the activity.</p>",
  "url": "/backend/activity/1/page/11",
  "activity": "/backend/activity/1",
  "index": 10,
  "stepListUrl": "/backend/activity/1/page/11/steps"
};
pages.push(page);

Smartgraphs.mockResponses["/backend/activity/1/pages"] = pages;


/********* ACTIVITY 2 (Maria's Run) *****************/

pages = [];

page = Smartgraphs.mockResponses["/backend/activity/2/page/1"] = 
{
  "steps": [
    "/backend/activity/2/page/1/step/1"
  ],
  "name": "",
  "firstStep": "/backend/activity/2/page/1/step/1",
  "introText": 
    "<p>Have you ever tried to tell someone a story about a trip you took? Most likely, your story included words "+
    "and pictures. In this activity, you will tell stories that convey information about motion during a specific "+
    "type of journey.</p>"+
    "<p>You will learn that the motion of an object can be described by its position, direction of motion, and "+
    "speed. Motion can be measured and represented on a graph.</p>",
  "url": "/backend/activity/2/page/1",
  "activity": "/backend/activity/2",
  "index": 1,
  "stepListUrl": "/backend/activity/2/page/1/steps"
};
pages.push(page);

page = Smartgraphs.mockResponses["/backend/activity/2/page/2"] = 
{
  "steps": [
    "/backend/activity/2/page/2/step/1"
  ],
  "name": "",
  "firstStep": "/backend/activity/2/page/2/step/1",
  "introText": 
    "<p>You are going to try moving in different ways on a straight path while collecting data with a motion "+
    "sensor.</p>"+
    "<p>When you are ready, click Start to record the position and time data for your movements. Walk on the path "+
    "for 30 seconds. Experiment with different kinds of motions (walking fast, slow, forward, backward…).</p>"+
    "<p>The sensor will stop after 30 seconds are up. You can click Clear to clear the graph and try again.</p>",
  "url": "/backend/activity/2/page/2",
  "activity": "/backend/activity/2",
  "index": 2,
  "stepListUrl": "/backend/activity/2/page/2/steps"
};
pages.push(page);

page = Smartgraphs.mockResponses["/backend/activity/2/page/3"] = 
{
  "steps": [
    "/backend/activity/2/page/3/step/1"
  ],
  "name": "",
  "firstStep": "/backend/activity/2/page/3/step/1",
  "introText": 
    "<p>Next you will try moving at two different speeds.</p>" +
    "<p>Start close to the motion sensor. When you are ready, click Start and walk away from the "+
    "sensor at a slow, steady pace for 15 seconds, then at a faster, steady pace for 15 seconds. " +
    "Click Stop when the time is up.</p>",
  "url": "/backend/activity/2/page/3",
  "activity": "/backend/activity/2",
  "index": 3,
  "stepListUrl": "/backend/activity/2/page/3/steps"
};
pages.push(page);

page = Smartgraphs.mockResponses["/backend/activity/2/page/4"] = 
{
  "steps": [
    "/backend/activity/2/page/4/step/1"
  ],
  "name": "",
  "firstStep": "/backend/activity/2/page/4/step/1",
  "introText": 
    "<p>This time, you are going to record your position and time during three different tasks.</p>" +
    "<p>Start close to the motion sensor and click Start. " +
    "Walk slowly for about 10 seconds, stop for 10 seconds, then walk faster for the remaining 10 seconds.</p>",
  "url": "/backend/activity/2/page/4",
  "activity": "/backend/activity/2",
  "index": 4,
  "stepListUrl": "/backend/activity/2/page/4/steps"
};
pages.push(page);

page = Smartgraphs.mockResponses["/backend/activity/2/page/5"] = 
{
  "steps": [
    "/backend/activity/2/page/5/step/1"
  ],
  "name": "",
  "firstStep": "/backend/activity/2/page/5/step/1",
  "introText": 
    "<p>Now you that you’ve had a chance to create position versus time graphs from your own motions, " +
    "let’s look at some graphs that were created by someone running.</p>" +
    "<p>Maria ran practice laps around the school track. " +
    "Her coach recorded the distances she ran after each minute. " +
    "These data are shown in the graph and the table at right. " +
    "Remember that the time was recorded in minutes rather than seconds.</p>",
  "url": "/backend/activity/2/page/5",
  "activity": "/backend/activity/2",
  "index": 5,
  "stepListUrl": "/backend/activity/2/page/5/steps"
};
pages.push(page);

Smartgraphs.mockResponses["/backend/activity/2/pages"] = pages;


// hand generated demo of second page
pages = [];

page = Smartgraphs.mockResponses["/backend/activity/3/page/1"] = 
{
  "steps": [
    "/backend/activity/3/page/1/step/1",
    "/backend/activity/3/page/1/step/2"    
  ],
  "name": "First Page of Second Activity",
  "firstStep": "/backend/activity/3/page/1/step/1",
  "introText": "<h1>A Second Activity</h1>",
  "url": "/backend/activity/3/page/1",
  "activity": "/backend/activity/2",
  "index": 1,
  "stepListUrl": "/backend/activity/3/page/1/steps"
};
pages.push(page);

Smartgraphs.mockResponses["/backend/activity/3/pages"] = pages;


// for activity with new activity-step structure
pages = [];
page = Smartgraphs.mockResponses["/backend/activity/new-step/page/1"] = 
{
  "steps": [
    "/backend/activity/new-step/page/1/step/1",
    "/backend/activity/new-step/page/1/step/2",
    "/backend/activity/new-step/page/1/step/3"
  ],
  "name": "Only Page",
  "firstStep": "/backend/activity/new-step/page/1/step/1",
  "introText": "<h1>Watch the system respond!</h1>",
  "url": "/backend/activity/new-step/page/1",
  "activity": "/backend/activity/new-step",
  "index": 1,
  "stepListUrl": "/backend/activity/new-step/page/1/steps"
};
pages.push(page);

Smartgraphs.mockResponses["/backend/activity/new-step/pages"] = pages;