// ==========================================================================
// Project:   Smartgraphs.Activity mock server responses
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// @author    Dewi Win <dwin@concord.org> (activity text)
// ==========================================================================
/*globals Smartgraphs */

sc_require('data_sources/mock_responses/mock_responses');

// starting Activity url
// generated on the console by running: 
//   Smartgraphs.mockResponsesForRecordType(Smartgraphs.Activity)

(function () {
  
  Smartgraphs.mockResponses["/shared/motion-towards-and-away"] = 
  {
    "title":            "Away and Toward",
    "url":              "/shared/motion-towards-and-away",
    "pages":            [
      "/shared/motion-towards-and-away/page/1",
      "/shared/motion-towards-and-away/page/2",
      "/shared/motion-towards-and-away/page/3",
      "/shared/motion-towards-and-away/page/4",
      "/shared/motion-towards-and-away/page/5",
      "/shared/motion-towards-and-away/page/6",
      "/shared/motion-towards-and-away/page/7",
      "/shared/motion-towards-and-away/page/8",
      "/shared/motion-towards-and-away/page/9",
      "/shared/motion-towards-and-away/page/10",
      "/shared/motion-towards-and-away/page/11"    
    ],
    "pageListUrl": "/shared/motion-towards-and-away/pages"
  };


  Smartgraphs.mockResponses["/shared/marias-run"] = 
  {
    "title":            "Maria's Run",
    "url":              "/shared/marias-run",
    "pages":            [
      "/shared/marias-run/page/1",
      "/shared/marias-run/page/2",
      "/shared/marias-run/page/3",
      "/shared/marias-run/page/4",
      "/shared/marias-run/page/5",
      "/shared/marias-run/page/6",
      "/shared/marias-run/page/7",
      "/shared/marias-run/page/8"    
    ],
    "pageListUrl": "/shared/marias-run/pages"
  };


  // demo of a second activity
  Smartgraphs.mockResponses["/shared/example-activity"] = 
  {
    "title":            "Second Activity",
    "url":              "/shared/example-activity",
    "pages":            ["/shared/example-activity/page/1"],
    "pageListUrl":      "/shared/example-activity/pages"
  };


  // activity with new activity-step structure

  Smartgraphs.mockResponses["/backend/activity/new-step"] = 
  {
    "title":            "Activity Demonstrating New ActivityStep Structure",
    "url":              "/backend/activity/new-step",
    "pages":            ["/backend/activity/new-step/page/1"],
    "pageListUrl":      "/backend/activity/new-step/pages"
  };
}());
