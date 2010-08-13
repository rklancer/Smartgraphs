// ==========================================================================
// Project:   Smartgraphs.ActivityPage mock server responses
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */


// ActivityPage list url for first Activity
// generated on the console by running: 
//   a = Smartgraphs.store.find(Activity, '/backend/activity/1')
//   Smartgraphs.mockResponseForRecordArray(a.get('pages'), a.get('pageListUrl'))

Smartgraphs.mockResponses["/backend/activity/1/pages"] = 
[{"steps":["/backend/activity/1/page/1/step/1/"],"name":"Introductory Page","firstStep":"/backend/activity/1/page/1/step/1/","introText":"<h1>How can you tell a story about motion without using words?</h1>\n\n<p>The picture at right communicates direction of traffic using recognizable symbols. In this activity, you will explore how motions in two opposite directions appear on a position-time graph. By doing so, you will learn conventional methods of motion storytelling and analysis.</p>","url":"/backend/activity/1/page/1","activity":"/backend/activity/1","index":1},{"steps":["/backend/activity/1/page/2/step/1/","/backend/activity/1/page/2/step/2/"],"name":"Prediction Page","firstStep":"/backend/activity/1/page/2/step/1/","introText":"<p>Let\u2019s start by demonstrating what you already know about representing motion on a graph. Imagine a straight walking path that is 5 meters long. Point A is at the 0-meter mark. Point B is at the 4-meter mark.</p>","url":"/backend/activity/1/page/2","activity":"/backend/activity/1","index":2},{"steps":["/backend/activity/1/page/3/step/1/","/backend/activity/1/page/3/step/2/"],"name":"Motion Sensor Page","firstStep":"/backend/activity/1/page/3/step/1/","introText":"<p>Let\u2019s practice collecting data with the motion sensor so you can see whether your sketches were accurate. You will walk on a 5-meter walking path like the one described earlier.</p>","url":"/backend/activity/1/page/3","activity":"/backend/activity/1","index":3},{"steps":["/backend/activity/1/page/4/step/1/"],"name":"Replay Page","firstStep":"/backend/activity/1/page/4/step/1/","introText":"<p>How did the actual graph of your motion compare to your prediction?<p>","url":"/backend/activity/1/page/4","activity":"/backend/activity/1","index":4}];


// individual ActivityPage urls
// generated on the console by running: 
//   Smartgraphs.mockResponsesForRecordType(Smartgraphs.ActivityPage)

Smartgraphs.mockResponses["/backend/activity/1/page/1"] = 
{"steps":["/backend/activity/1/page/1/step/1/"],"name":"Introductory Page","firstStep":"/backend/activity/1/page/1/step/1/","introText":"<h1>How can you tell a story about motion without using words?</h1>\n\n<p>The picture at right communicates direction of traffic using recognizable symbols. In this activity, you will explore how motions in two opposite directions appear on a position-time graph. By doing so, you will learn conventional methods of motion storytelling and analysis.</p>","url":"/backend/activity/1/page/1","activity":"/backend/activity/1","index":1};

Smartgraphs.mockResponses["/backend/activity/1/page/2"] = 
{"steps":["/backend/activity/1/page/2/step/1/","/backend/activity/1/page/2/step/2/"],"name":"Prediction Page","firstStep":"/backend/activity/1/page/2/step/1/","introText":"<p>Let\u2019s start by demonstrating what you already know about representing motion on a graph. Imagine a straight walking path that is 5 meters long. Point A is at the 0-meter mark. Point B is at the 4-meter mark.</p>","url":"/backend/activity/1/page/2","activity":"/backend/activity/1","index":2};

Smartgraphs.mockResponses["/backend/activity/1/page/3"] = 
{"steps":["/backend/activity/1/page/3/step/1/","/backend/activity/1/page/3/step/2/"],"name":"Motion Sensor Page","firstStep":"/backend/activity/1/page/3/step/1/","introText":"<p>Let\u2019s practice collecting data with the motion sensor so you can see whether your sketches were accurate. You will walk on a 5-meter walking path like the one described earlier.</p>","url":"/backend/activity/1/page/3","activity":"/backend/activity/1","index":3};

Smartgraphs.mockResponses["/backend/activity/1/page/4"] = 
{"steps":["/backend/activity/1/page/4/step/1/"],"name":"Replay Page","firstStep":"/backend/activity/1/page/4/step/1/","introText":"<p>How did the actual graph of your motion compare to your prediction?<p>","url":"/backend/activity/1/page/4","activity":"/backend/activity/1","index":4};

Smartgraphs.mockResponses["/backend/activity/2/page/1/"] = 
{"url":"/backend/activity/2/page/1/","activity":"/backend/activity/2/second-activity/","name":"First Page","index":1,"introText":"<h1>This is a second activity</h1>","steps":["/backend/activity/2/page/1/step/1/"],"firstStep":"/backend/activity/2/page/1/step/1/"};