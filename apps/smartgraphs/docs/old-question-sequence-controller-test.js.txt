// ==========================================================================
// Project:   Smartgraphs.questionSequenceController Unit Test
// Copyright: ©2010 Concord Consortium
// ==========================================================================
/*globals Smartgraphs module test ok equals same stop start qhash qsc q1 q2 seq1 seq2*/

var qhash = {
  correctResponseFeedback: '[correct-feedback]',
  incorrectResponseFeedback: '[incorrect-feedback]',
  prompt: '[prompt]',
  responseType: Smartgraphs.TEXT_RESPONSE,
  correctResponse: '[correct-response]',
  isSelectable: NO
};

var qsc = Smartgraphs.questionSequenceController;

module("Smartgraphs.questionSequenceController question navigation", {
  setup: function () {
    var questions = [];
    
    for (var i = 1; i <= 2; i++) {
      questions.push( Smartgraphs.store.createRecord(Smartgraphs.Question, qhash) );
    }
    
    q1 = questions[0];
    q2 = questions[1];
    
    qsc.set('content', questions);
    q1.set('isSelectable', true);       // should be done by questionController
    qsc.set('selectedQuestion', q1);
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


test('canSelectPreviousQuestion works', function () {
  q1.set('isSelectable', YES);
  qsc.set('selectedQuestion', q1);
  ok(!qsc.get('canSelectPreviousQuestion'), 'canSelectPreviousQuestion should be false for first question');
  
  q2.set('isSelectable', YES);
  qsc.set('selectedQuestion', q2);
  ok(qsc.get('canSelectPreviousQuestion'), 'canSelectPreviousQuestion should be true for second question');
  
  qsc.set('selectedQuestion', q1);
  ok(!qsc.get('canSelectPreviousQuestion'), 
    'canSelectPreviousQuestion should be reset to false after navigting back to first question');
});

test('canSelectNextQuestion works', function () {
  q1.set('isSelectable', YES);
  q2.set('isSelectable', NO);
  qsc.set('selectedQuestion', q1);
  
  ok(!qsc.get('canSelectNextQuestion'), 'canSelectNextQuestion should be false if next question is not selectable');

  // need to test set isSelectable in a run loop because canSelectNextQuestion is a computed property that won't updated
  // until a binding syncs... bear in mind that isSelectable will be updated inside a runloop (button click) anyway
  SC.RunLoop.begin();
  q2.set('isSelectable', YES);  
  SC.RunLoop.end();
  ok(qsc.get('canSelectNextQuestion'), 'canSelectNextQuestion should be true if next question is selectable');
  
  qsc.set('selectedQuestion', q2);
  ok(!qsc.get('nextQuestion'), '(should be at last question before testing canSelectNextQuestion for last question.)');
  ok(!qsc.get('canSelectNextQuestion'), 'canSelectNextQuestion should be false if we are at the last question.');
});


module("Smartgraphs.questionSequenceController question-sequence navigation", {
  setup: function () {
    Smartgraphs.Question.FIXTURES = [
      SC.mixin(SC.copy(qhash), {guid: 'q1', sequence: 'test-sequence-1'}),
      SC.mixin(SC.copy(qhash), {guid: 'q2', sequence: 'test-sequence-2'})
    ];
    
    Smartgraphs.QuestionSequence.FIXTURES = [
      { guid: 'test-sequence-1', questions: ['q1'] },
      { guid: 'test-sequence-2', questions: ['q2'] } 
    ];

    Smartgraphs.set('store', SC.Store.create().from(SC.Record.fixtures));
    
    seq1 = Smartgraphs.store.find(Smartgraphs.QuestionSequence, 'test-sequence-1');
    seq2 = Smartgraphs.store.find(Smartgraphs.QuestionSequence, 'test-sequence-2');
    q1 = Smartgraphs.store.find(Smartgraphs.Question, 'q1');
    q2 = Smartgraphs.store.find(Smartgraphs.Question, 'q2');
  }
});

test("Moving to a new sequence via setting sequence property", function () {
  qsc.set('sequence', seq1);
  equals(qsc.get('length'), 1, 'Content should have length 1 after setting sequence to test-sequence-1');
  equals(qsc.objectAt(0), q1, 'Content should consist of q1 after setting sequence to test-sequence-1');
  equals(qsc.get('selectedQuestion'), q1, 'selectedQuestion should be first question of first sequence after setting sequence to first sequence.');

  qsc.set('sequence', seq2);
  equals(qsc.get('length'), 1, 'Content should have length 1 after setting sequence to test-sequence-2');
  equals(qsc.objectAt(0), q2, 'Content should consist of q2 after setting sequence to test-sequence-2');  
  equals(qsc.get('selectedQuestion'), q2, 'selectedQuestion should be first question of second sequence after setting sequence to second sequence.');
});
