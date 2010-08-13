// ==========================================================================
// Project:   Smartgraphs.Trigger mock server responses
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

sc_require('data_sources/mock_responses/mock_responses');

// generated on the console by running:
//   Smartgraphs.mockResponseForRecordArray(Smartgraphs.store.find(Smartgraphs.Trigger), Smartgraphs.activityController.get('triggerListUrl'))

Smartgraphs.mockResponses["/backend/triggers"] = 
[{"url":"/backend/trigger/1/step-beginning","name":"stepBeginning","description":"This is the list of commands that run when the activity step begins.","args":{}},{"url":"/backend/trigger/2/response-submitted","name":"responseSubmitted","description":"This is the list of commands that check the answer.","args":{}},{"url":"/backend/trigger/3/step-finished","name":"stepFinished","description":"This is the list of commands that run when the activity step finishes.","args":{}},null];