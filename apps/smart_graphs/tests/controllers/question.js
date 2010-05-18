// ==========================================================================
// Project:   SmartGraphs.questionController Unit Test
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals SmartGraphs module test ok equals same stop start qc textQ q1 q2 oldQSC oldDSC graphicalQ correctDataPoint incorrectDataPoint*/

var qhash = {
  correctResponseFeedback: '[correct-feedback]',
  incorrectResponseFeedback: '[incorrect-feedback]',
  prompt: '[prompt]'
};

var qc = SmartGraphs.questionController;

module("SmartGraphs.questionController text response", {
  setup: function () {
    textQ = SmartGraphs.Question.create(qhash, { 
      responseType: SmartGraphs.TEXT_RESPONSE,
      correctResponse: '[correct-response]'
    });    
    qc.set('content', textQ);
   }
});


test('checkResponse should work correctly with text response', function() {
  
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
});


module("SmartGraphs.questionController interaction between questions", {
  
  setup: function () {
    q1 = SmartGraphs.Question.create(qhash, { 
      responseType: SmartGraphs.TEXT_RESPONSE,
      correctResponse: '[correct-response]'
    });
    
    q2 = SmartGraphs.Question.create(qhash, {
      responseType: SmartGraphs.TEXT_RESPONSE,
      correctResponse: '[correct-response]'
    });
    
    // mock questionSequenceController
    oldQSC = SmartGraphs.questionSequenceController;
    SmartGraphs.questionSequenceController = SC.Object.create({
       currentQuestion: q1,
       nextQuestion: q2
    });
  },
  
  teardown: function () {
     SmartGraphs.questionSequenceController = oldQSC;
  }
});

  
test('isSelectable should be set properly', function () {

  ok(!q1.get('isSelectable'), 'isSelectable should be false before question is navigated to');
  
  qc.set('content', q1);
  ok(q1.get('isSelectable'), 'isSelectable should be true after question is navigated to');
  
  ok(!q2.get('isSelectable'), 'isSelectable should be false before previous question is answered successfully');
  qc.set('textResponse', '[incorrect-response]');
  qc.checkResponse();    
  ok(!q2.get('isSelectable'), 'isSelectable on next question should not be set to true by incorrect response');

  qc.set('textResponse', '[correct-response]');
  qc.checkResponse();
  ok(q2.get('isSelectable'), 'isSelectable on next question should be set to true by correct response');
  
  qc.set('textResponse', '[incorrect-response]');
  qc.checkResponse();
  ok(q2.get('isSelectable'), 'isSelectable on next question should not be unset by subsequent incorrect responses');
});


module("SmartGraphs.questionController graphical response", {

  setup: function () {
    
    // mock dataSeriesController
    oldDSC = SmartGraphs.dataSeriesController;
    SmartGraphs.dataSeriesController = SC.Object.create( {
      selection: SC.SelectionSet.create()
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
    
    qc.set('content', graphicalQ);
  },
  
  teardown: function () {
    SmartGraphs.dataSeriesController = oldDSC;
  }
});


test('checkResponse should work correctly with graphical response', function () {
  var selection, response, feedback;
  
  ok(qc.get('shouldAcceptGraphicalResponse'), 'shouldAcceptGraphicalResponse should be true');
  
  qc.set('textResponse', 'bogus');
  selection = SC.SelectionSet.create();
  SmartGraphs.dataSeriesController.set('selection', selection);
  response = qc.get('response');
  ok(!response, "Response should be falsy if nothing has been selected on the graph");

  selection = SC.SelectionSet.create().addObject(correctDataPoint);
  SmartGraphs.dataSeriesController.set('selection', selection);
  response = qc.get('response');
  equals(response, '1', "Reponse value after setting graph selection to correct data point should be '1'");
  
  feedback = qc.get('feedback');
  ok(!feedback, 'Feedback string should be falsy before checkResponse() is called');
  
  qc.checkResponse();
  feedback = qc.get('feedback');
  equals(feedback, '[correct-feedback]', 'Feedback property after checkResponse() on an correct response should be appropriate');
  
  selection = SC.SelectionSet.create().addObject(incorrectDataPoint);
  SmartGraphs.dataSeriesController.set('selection', selection);
  qc.checkResponse();
  feedback = qc.get('feedback');  
  equals(feedback, '[incorrect-feedback]', 'Feedback property after checkResponse() on an incorrect response should be appropriate');
});
