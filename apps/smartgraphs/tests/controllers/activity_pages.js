// ==========================================================================
// Project:   Smartgraphs.activityPagesController Unit Test
// Copyright: ©2010 Concord Consortium
// Author: Dr. Baba Kofi Weusijana <kofi@edutek.net>
// ==========================================================================
/*globals Smartgraphs module test ok equals same stop start */

module("Smartgraphs.activityPagesController");

test("test Smartgraphs.activityPagesController.pageInfo",
function() {
    var activityPageView, pane;
    var page, pages = [];

    page = Smartgraphs.mockResponses["/backend/activity/1/page/1"] = {
        "steps": ["/backend/activity/1/page/1/step/1"],
        "name": "Introductory Page",
        "firstStep": "/backend/activity/1/page/1/step/1",
        "introText": "<h1>How can you tell a story about motion without using words?</h1>\n\n<p>The picture at right communicates direction of traffic using recognizable symbols. In this activity, you will explore how motions in two opposite directions appear on a position-time graph. By doing so, you will learn conventional methods of motion storytelling and analysis.</p>",
        "url": "/backend/activity/1/page/1",
        "activity": "/backend/activity/1",
        "index": 1,
        "stepListUrl": "/backend/activity/1/page/1/steps"
    };
    pages.push(page);

    page = Smartgraphs.mockResponses["/backend/activity/1/page/2"] = {
        "steps": ["/backend/activity/1/page/2/step/1", "/backend/activity/1/page/2/step/2"],
        "name": "Prediction Page",
        "firstStep": "/backend/activity/1/page/2/step/1",
        "introText": "<p>Let\u2019s start by demonstrating what you already know about representing motion on a graph. " + "Imagine a straight walking path that is 4 meters long. Point A is at the 0-meter mark. Point B is at " + "the 4-meter mark.</p>",
        "url": "/backend/activity/1/page/2",
        "activity": "/backend/activity/1",
        "index": 2,
        "stepListUrl": "/backend/activity/1/page/2/steps"
    };
    pages.push(page);

    SC.RunLoop.begin();
    Smartgraphs.activityPagesController.set('content', pages);
    var content = Smartgraphs.activityPagesController.get('content');
    Smartgraphs.activityPagesController.selectObject(content[0]);
    SC.RunLoop.end();

    var expected = "Page 1 of 2";
    var result = Smartgraphs.activityPagesController.get('pageInfo');
    equals(result, expected, "Smartgraphs.activityPagesController.pageInfo() should return 'Page 1 of 2'");
});
