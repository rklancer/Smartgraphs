// ==========================================================================
// Project:   SmartGraphs.questionSequenceController Unit Test
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals SmartGraphs module test ok equals same stop start qhash qsc q1 q2*/


var qhash = {
  correctResponseFeedback: '[correct-feedback]',
  incorrectResponseFeedback: '[incorrect-feedback]',
  prompt: '[prompt]',
  responseType: SmartGraphs.TEXT_RESPONSE,
  correctResponse: '[correct-response]',
  isSelectable: NO
};

var qsc = SmartGraphs.questionSequenceController;

module("SmartGraphs.questionSequenceController", {
  setup: function () {
    var questions = [];
    
    for (var i = 1; i <= 2; i++) {
      questions.push( SmartGraphs.store.createRecord(SmartGraphs.Question, qhash) );
    }
    
    q1 = questions[0];
    q2 = questions[1];

    qsc.sequenceDidChange = function () {};
    
    // this rigmarole is necessary just to set content... I think. Hmm.
    qsc.set('allowsEmptySelection', YES);
    qsc.set('selection', SC.SelectionSet.create());
    qsc.set('content', questions);
    q1.set('isSelectable', true);       // should be done by questionController
    qsc.set('selectedQuestion', q1);
    qsc.set('allowsEmptySelection', NO);   
  }
});

test('indexOfCurrentQuestion, previousQuestion, nextQuestion, isFirstQuestion, isLastQuestion work', function () {
  
  equals(qsc.get('indexOfSelectedQuestion'), 0, 'indexOfSelectedQuestion should be 0 for first question');
  ok(!qsc.get('previousQuestion'), 'previousQuestion should be falsy for first question');
  equals(qsc.get('nextQuestion'), q2, 'nextQuestion should be second question for first question.');
  ok(qsc.get('isFirstQuestion'), 'isFirstQuestion should be true for first question');
  ok(!qsc.get('isLastQuestion'), 'isLastQuestion should be false for first question');
  
  q2.set('isSelectable', YES);
  qsc.set('selectedQuestion', q2);
  equals(qsc.get('indexOfSelectedQuestion'), 1, 'indexOfSelectedQuestion should be 1 for second question');
  equals(qsc.get('previousQuestion'), q1, 'previousQuestion should be first question for second question');
  ok(!qsc.get('nextQuestion'), 'nextQuestion should be falsy for last question.');  
  ok(!qsc.get('isFirstQuestion'), 'isFirstQuestion should be false for last question');
  ok(qsc.get('isLastQuestion'), 'isLastQuestion should be true for last question'); 

  qsc.set('selectedQuestion', q1);
  equals(qsc.get('indexOfSelectedQuestion'), 0, 'indexOfSelectedQuestion should be 0 when revisiting first question');
  ok(!qsc.get('previousQuestion'), 'previousQuestion should be null when revisiting first question');
  equals(qsc.get('nextQuestion'), q2, 'nextQuestion should be second question when revisiting first question.');
  ok(qsc.get('isFirstQuestion'), 'isFirstQuestion should be true when revisiting first question');
  ok(!qsc.get('isLastQuestion'), 'isLastQuestion should be false when revisiting first question');  
});


// test: setting selectedQuestion honors isSelectable


test('canSelectPreviousQuestion works', function () {
  qsc.set('currentQuestion', q1);
  ok(!qsc.get('canSelectPreviousQuestion'), 'canSelectPreviousQuestion should be false for first question');
  
  qsc.set('currentQuestion', q2);
  ok(qsc.get('canSelectPreviousQuestion'), 'canSelectPreviousQuestion should be true for second question');
  
  qsc.set('currentQuestion', q1);
  ok(!qsc.get('canSelectPreviousQuestion'), 
    'canSelectPreviousQuestion should be reset to false after navigting back to first question');
});

test('canSelectNextQuestion works', function () {
});


test("all tests written", function() {
  var allTestsAreWritten = false;
  ok(allTestsAreWritten, "*All* tests for questionSequenceController should be written.");
});

