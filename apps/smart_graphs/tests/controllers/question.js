// ==========================================================================
// Project:   SmartGraphs.questionController Unit Test
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals SmartGraphs module test ok equals same stop start */

module("SmartGraphs.questionController", {
  setup: function () {
    textQ = SmartGraphs.Question.create({ 
      responseType: SmartGraphs.TEXT_RESPONSE,
      prompt: '[prompt]',
      correctResponse: '[correct-response]',
      correctResponseFeedback: '[correct-feedback]',
      incorrectResponseFeedback: '[incorrect-feedback]'
    });
  }
});

// TODO: Replace with real unit test for SmartGraphs.questionController
test("checkResponse should work correctly with text response", function() {
  var qc = SmartGraphs.questionController;
  qc.set('content', textQ);
  qc.set('textResponse', '[correct-response]');
  
  var feedback = qc.get('feedback');
  ok(!feedback, 'Feedback string should be falsy before checkResponse() is called');
  
  qc.checkResponse();
  feedback = qc.get('feedback');
  equals(feedback, '[correct-feedback]', 'feedback property after checkResponse() on an correct response should be appropriate');
  
  qc.set('textResponse', '[incorrect-response]');
  qc.checkResponse();
  feedback = qc.get('feedback');
  equals(feedback, '[incorrect-feedback]', 'feedback property after checkResponse() on an incorrect response should be appropriate');
});