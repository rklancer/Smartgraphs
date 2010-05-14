// ==========================================================================
// Project:   SmartGraphs.questionController Unit Test
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals SmartGraphs module test ok equals same stop start qc dsc textQ1 textQ2 graphicalQ correctDataPoint incorrectDataPoint*/

module("SmartGraphs.questionController", {
  setup: function () {
    qc = SmartGraphs.questionController;

    // mock dataSeriesController
    dsc = SC.Object.create( {
      selection: SC.SelectionSet.create()
    });
    SmartGraphs.dataSeriesController = dsc;
    
    var qhash = {
      correctResponseFeedback: '[correct-feedback]',
      incorrectResponseFeedback: '[incorrect-feedback]',
      prompt: '[prompt]'
    };

    textQ1 = SmartGraphs.Question.create(qhash, { 
      responseType: SmartGraphs.TEXT_RESPONSE,
      correctResponse: '[correct-response]'
    });
    
    textQ2 = SmartGraphs.Question.create(qhash, {
      responseType: SmartGraphs.TEXT_RESPONSE,
      correctResponse: '[correct-response]'
    });

    graphicalQ = SmartGraphs.Question.create(qhash, {
      responseType: SmartGraphs.GRAPH_ANNOTATION_RESPONSE,
      correctResponse: '1'
    });
    
    correctDataPoint = SmartGraphs.DataPoint.create({
      x: 1,
      y: 1
    });
    
    incorrectDataPoint = SmartGraphs.DataPoint.create({
      x: 2,
      y: 2
    });
  }
});

// TODO: Replace with real unit test for SmartGraphs.questionController
test('checkResponse should work correctly with text response', function() {
  
  qc.set('content', textQ1);
  ok(qc.get('shouldAcceptTextResponse'), 'shouldAcceptTextResponse should be true');
  
  qc.set('textResponse', '[correct-response]');
  
  var feedback = qc.get('feedback');
  ok(!feedback, 'Feedback string should be falsy before checkResponse() is called');
  
  qc.checkResponse();
  feedback = qc.get('feedback');
  equals(feedback, '[correct-feedback]', 'Feedback property after checkResponse() on an correct response should be appropriate');
  
  qc.set('textResponse', '[incorrect-response]');
  qc.checkResponse();
  feedback = qc.get('feedback');
  equals(feedback, '[incorrect-feedback]', 'Feedback property after checkResponse() on an incorrect response should be appropriate');
  
  ok(false, "Breaking a test to make sure Hudson is really running our tests.");
  
});


test('checkResponse should work correctly with graphical response', function () {
  var selection, response, feedback;
  
  qc.set('content', graphicalQ);
  
  ok(qc.get('shouldAcceptGraphicalResponse'), 'shouldAcceptGraphicalResponse should be true');
  
  qc.set('textResponse', 'bogus');
  selection = SC.SelectionSet.create();
  dsc.set('selection', selection);
  response = qc.get('response');
  ok(!response, "Response should be falsy if nothing has been selected on the graph");

  selection = SC.SelectionSet.create().addObject(correctDataPoint);
  dsc.set('selection', selection);
  response = qc.get('response');
  equals(response, '1', "Reponse value after setting graph selection to correct data point should be '1'");
  
  feedback = qc.get('feedback');
  ok(!feedback, 'Feedback string should be falsy before checkResponse() is called');
  
  qc.checkResponse();
  feedback = qc.get('feedback');
  equals(feedback, '[correct-feedback]', 'Feedback property after checkResponse() on an correct response should be appropriate');
  
  selection = SC.SelectionSet.create().addObject(incorrectDataPoint);
  dsc.set('selection', selection);
  qc.checkResponse();
  feedback = qc.get('feedback');  
  equals(feedback, '[incorrect-feedback]', 'Feedback property after checkResponse() on an incorrect response should be appropriate');
});
