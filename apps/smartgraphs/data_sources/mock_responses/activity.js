// ==========================================================================
// Project:   Smartgraphs.Activity mock server responses
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

sc_require('data_sources/mock_responses/mock_responses');

// Smartgraphs.mockResponses['/backend/activity/1/motion-without-words/'] = { 
//   url: 
//     '/backend/activity/1/motion-without-words/', 
//   title: 
//     'Motion Without Words',
//   pages: [
//     '/backend/activity/1/page/1', 
//     '/backend/activity/1/page/2', 
//     '/backend/activity/1/page/3',
//     '/backend/activity/1/page/4'
//   ],
//   pagesIndexUrl: '/backend/activity/1/pages/'
// };
//   
// Smartgraphs.mockResponses['/backend/activity/2/second-activity/'] = { 
//   url: 
//     '/backend/activity/2/second-activity/', 
//   title: 
//     'Example of Second Activity',
//   pages: [
//     '/backend/activity/2/page/1/'
//   ]
// };

Smartgraphs.mockResponses['/backend/activity/1'] = 
{"title":"Motion Without Words","page_list_url":"/backend/activity/1/pages","url":"/backend/activity/1","pages":["/backend/activity/1/page/1","/backend/activity/1/page/2","/backend/activity/1/page/3","/backend/activity/1/page/4"]};

Smartgraphs.mockResponses['/backend/activity/1/pages'] = 
[{"name":"Introductory Page","first_step":"/backend/activity/1/page/1/step/1/","intro_text":"<h1>How can you tell a story about motion without using words?</h1><p>The picture at right communicates direction of traffic using recognizable symbols. In this activity, you will explore how motions in two opposite directions appear on a position-time graph. By doing so, you will learn conventional methods of motion storytelling and analysis.</p>","url":"/backend/activity/1/page/1","activity":"/backend/activity/1","steps":["/backend/activity/1/page/1/step/1/"],"index":1},{"name":"Second Page","first_step":"/backend/activity/1/page/2/step/1/","intro_text":"<p>Let\u2019s start by demonstrating what you already know about representing motion on a graph. Imagine a straight walking path that is 5 meters long. Point A is at the 0-meter mark. Point B is at the 4-meter mark.</p>","url":"/backend/activity/1/page/2","activity":"/backend/activity/1","steps":["/backend/activity/1/page/2/step/1/","/backend/activity/1/page/2/step/2/"],"index":2},{"name":"Third Page","first_step":"/backend/activity/1/page/3/step/1/","intro_text":"<p>Let\u2019s practice collecting data with the motion sensor so you can see whether your sketches were accurate. You will walk on a 5-meter walking path like the one described earlier.</p>","url":"/backend/activity/1/page/3","activity":"/backend/activity/1","steps":["/backend/activity/1/page/3/step/1/","/backend/activity/1/page/3/step/2/"],"index":3},{"name":"Fourth Page","first_step":"/backend/activity/1/page/4/step/1/","intro_text":"<p>How did the actual graph of your motion compare to your prediction?<p>","url":"/backend/activity/1/page/4","activity":"/backend/activity/1","steps":["/backend/activity/1/page/4/step/1/"],"index":4}];