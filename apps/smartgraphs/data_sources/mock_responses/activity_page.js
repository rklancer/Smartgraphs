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
  "introText": "<p>Let\u2019s start by demonstrating what you already know about representing motion on a graph. Imagine a straight walking path that is 5 meters long. Point A is at the 0-meter mark. Point B is at the 4-meter mark.</p>",
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
  "introText": "<p>Let\u2019s practice collecting data with the motion sensor so you can see whether your sketches were accurate. You will walk on a 5-meter walking path like the one described earlier.</p>",
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
    "<p>To the right are your drawings from page 2. Now that you &quot;have the hang of it&quot;, you will walk "+
    "with the sensor to see if your sketches of forward and backward motion are correct.</p>",
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
    "/backend/activity/1/page/6/step/5",
    "/backend/activity/1/page/6/step/6",
    "/backend/activity/1/page/6/step/7"        
  ],
  "name": "Replay Page",
  "firstStep": "/backend/activity/1/page/6/step/1",
  "introText": 
    "<p>At right is a distance-time graph created by someone walking in front of a motion sensor.</p>",
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
    "<p>Look at the position-time graph to the right.</p>",
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
    "<p><b>Look at the position-time graph to the right. You are going to recreate this graph as closely as "+
    "possible by walking in front of the motion sensor to collect distance and time data.</p>",
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
    "/backend/activity/1/page/10/step/2",
    "/backend/activity/1/page/10/step/3"
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
Smartgraphs.mockResponses["/backend/activity/1/pages"] = pages;


// hand generated demo of second page
pages = [];

page = Smartgraphs.mockResponses["/backend/activity/2/page/1"] = 
{
  "steps": [
    "/backend/activity/2/page/1/step/1"
  ],
  "name": "First Page of Second Activity",
  "firstStep": "/backend/activity/2/page/1/step/1",
  "introText": "<h1>A Second Activity</h1>",
  "url": "/backend/activity/2/page/1",
  "activity": "/backend/activity/2",
  "index": 1,
  "stepListUrl": "/backend/activity/2/page/1/steps"
};
pages.push(page);

Smartgraphs.mockResponses["/backend/activity/2/pages"] = pages;


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