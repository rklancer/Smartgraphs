// ==========================================================================
// Project:   Smartgraphs.questionController Unit Test
// Copyright: ©2010 Concord Consortium
// ==========================================================================
/*globals Smartgraphs module test ok equals same stop start qc textQ q1 q2 oldQSC oldDSC graphicalQ correctDataPoint incorrectDataPoint*/

var qhash = {
  correctResponseFeedback: '[correct-feedback]',
  incorrectResponseFeedback: '[incorrect-feedback]',
  prompt: '[prompt]'
};

var textQHash = SC.mixin(SC.copy(qhash), {
  responseType: Smartgraphs.TEXT_RESPONSE,
  correctResponse: '[correct-response]'
});

var qc = Smartgraphs.questionController;

module("Smartgraphs.questionController text response", {
  setup: function () {
    textQ = Smartgraphs.store.createRecord(Smartgraphs.Question, textQHash);
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


module("Smartgraphs.questionController interaction between questions", {
  
  setup: function () {
    q1 = Smartgraphs.store.createRecord(Smartgraphs.Question, textQHash);
    q2 = Smartgraphs.store.createRecord(Smartgraphs.Question, textQHash);
    
    // mock questionSequenceController
    oldQSC = Smartgraphs.questionSequenceController;
    Smartgraphs.questionSequenceController = SC.Object.create({
       currentQuestion: q1,
       nextQuestion: q2
    });
  },
  
  teardown: function () {
     Smartgraphs.questionSequenceController = oldQSC;
  }
});

  
test('isSelectable should be set properly', function () {
  
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


module("Smartgraphs.questionController graphical response", {

  setup: function () {
    
    // mock dataSeriesController
    oldDSC = Smartgraphs.dataSeriesController;
    Smartgraphs.dataSeriesController = SC.Object.create( {
      selection: SC.SelectionSet.create()
    });

    graphicalQ = Smartgraphs.store.createRecord(Smartgraphs.Question, SC.mixin(SC.copy(qhash), {
      responseType: Smartgraphs.GRAPH_ANNOTATION_RESPONSE,
      correctResponse: '1'
    }));
  
    correctDataPoint = Smartgraphs.DataPoint.create({
      x: 1,
      y: 1
    });
  
    incorrectDataPoint = Smartgraphs.DataPoint.create({
      x: 2,
      y: 2
    });
    
    qc.set('content', graphicalQ);
  },
  
  teardown: function () {
    Smartgraphs.dataSeriesController = oldDSC;
  }
});


test('checkResponse should work correctly with graphical response', function () {
  var selection, response, feedback;
  
  ok(qc.get('shouldAcceptGraphicalResponse'), 'shouldAcceptGraphicalResponse should be true');
  
  qc.set('textResponse', 'bogus');
  selection = SC.SelectionSet.create();
  Smartgraphs.dataSeriesController.set('selection', selection);
  response = qc.get('response');
  ok(!response, "Response should be falsy if nothing has been selected on the graph");

  selection = SC.SelectionSet.create().addObject(correctDataPoint);
  Smartgraphs.dataSeriesController.set('selection', selection);
  response = qc.get('response');
  equals(response, '1', "Reponse value after setting graph selection to correct data point should be '1'");
  
  feedback = qc.get('feedback');
  ok(!feedback, 'Feedback string should be falsy before checkResponse() is called');
  
  qc.checkResponse();
  feedback = qc.get('feedback');
  equals(feedback, '[correct-feedback]', 'Feedback property after checkResponse() on an correct response should be appropriate');
  
  selection = SC.SelectionSet.create().addObject(incorrectDataPoint);
  Smartgraphs.dataSeriesController.set('selection', selection);
  qc.checkResponse();
  feedback = qc.get('feedback');  
  equals(feedback, '[incorrect-feedback]', 'Feedback property after checkResponse() on an incorrect response should be appropriate');
});
