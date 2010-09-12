// ==========================================================================
// Project:   Smartgraphs.ActivityPage mock server responses
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
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
    "/backend/activity/1/page/4/step/1"
  ],
  "name": "Replay Page",
  "firstStep": "/backend/activity/1/page/4/step/1",
  "introText": "<p>How did the actual graph of your motion compare to your prediction?<p>",
  "url": "/backend/activity/1/page/4",
  "activity": "/backend/activity/1",
  "index": 4,
  "stepListUrl": "/backend/activity/1/page/4/steps"
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