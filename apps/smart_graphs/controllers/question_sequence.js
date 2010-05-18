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

  selectedQuestion: function (key, value) {
    
    if (value !== undefined && value.get('isSelectable')) {
      this.selectObject(value);
    }
    
    return this.get('selection').toArray().objectAt(0);
  }.property('selection'),
  
  indexOfSelectedQuestion : function () {
    var selection = this.get('selection');
    var indexSet = selection.indexSetForSource(this);
    var index = indexSet ? indexSet.toArray().objectAt(0) : undefined;
    
    return index;
  }.property('selectedQuestion', 'content', '[]').cacheable(),
  
  previousQuestion: function () {
    var index = this.get('indexOfSelectedQuestion');
    
    return (index > 0) ? this.objectAt(index-1) : null;
  }.property('selectedQuestion', 'content', '[]').cacheable(),

  nextQuestion: function () {
    var index = this.get('indexOfSelectedQuestion');
    
    return (index + 1 < this.get('length')) ? this.objectAt(index+1) : null;
  }.property('selectedQuestion', 'content', '[]').cacheable(),

  isFirstQuestionBinding: SC.Binding.bool('.previousQuestion').not(),
  isLastQuestionBinding: SC.Binding.bool('.nextQuestion').not(),
  
  nextQuestionIsSelectableBinding: SC.Binding.oneWay('*nextQuestion.isSelectable'),
  
  forwardOneQuestionIsAllowed: function () {
    return (!this.get('isLastQuestion') && this.get('nextQuestionIsSelectable'));
  }.property('isLastQuestion', 'nextQuestionIsSelectable').cacheable(),
    
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
