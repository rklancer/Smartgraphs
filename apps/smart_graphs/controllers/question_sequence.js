// ==========================================================================
// Project:   SmartGraphs.questionSequenceController
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals SmartGraphs */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/

SmartGraphs.questionSequenceController = SC.ArrayController.create(
/** @scope SmartGraphs.questionSequenceController.prototype */ {

  allowsEmptySelection: NO,
  allowsMultipleSelection: NO,

  currentQuestionBinding: SC.Binding.single('.selection'),
  
  indexOfCurrentQuestion : function () {
    var selection = this.get('selection');
    var indexSet = selection.indexSetForSource(this);
    var index = indexSet ? indexSet.toArray().objectAt(0) : undefined;
    
    return index;
  }.property('currentQuestion', 'content', '[]').cacheable(),
  
  previousQuestion: function () {
    var index = this.get('indexOfCurrentQuestion');
    
    return (index > 0) ? this.objectAt(index-1) : null;
  }.property('currentQuestion', 'content', '[]').cacheable(),

  nextQuestion: function () {
    var index = this.get('indexOfCurrentQuestion');
    
    return (index + 1 < this.get('length')) ? this.objectAt(index+1) : null;
  }.property('currentQuestion', 'content', '[]').cacheable(),

  isFirstQuestionBinding: SC.Binding.bool('.previousQuestion').not(),
  isLastQuestionBinding: SC.Binding.bool('.nextQuestion').not(),

  currentQuestionIsAnsweredBinding: SC.Binding.oneWay('SmartGraphs.questionController.isAnswered'),
  
  forwardOneQuestionIsAllowed: function () { 
    return (!this.get('isLastQuestion') && this.get('currentQuestionIsAnswered'));
  }.property('isLastQuestion', 'currentQuestionIsAnswered').cacheable(),
    
  backOneQuestionIsAllowedBinding: SC.Binding.not('.isFirstQuestion'),

  forwardOneQuestion: function () {
    if (this.get('forwardOneQuestionIsAllowed')) { 
      this.selectObject( this.get('nextQuestion') );
    }
  },

  backOneQuestion: function () {
    if (this.get('backOneQuestionIsAllowed')) {
      this.selectObject( this.get('previousQuestion') );
    }
  },

  sequenceDidChange: function () {
    var sequence = this.get('sequence');

    var query = SC.Query.local(SmartGraphs.Question, { 
      conditions: 'sequence = {sequence}', 
      sequence: sequence,
      orderBy: 'index ASC' 
    });
    
    var questions = SmartGraphs.store.find(query);
    this.set('content', questions);
    this.selectObject(this.firstObject());
  }.observes('sequence')
}) ;
