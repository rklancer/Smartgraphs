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
  nextQuestionIsAllowed: false,       // until set by observer
  prevQuestionIsAllowed: false,       // until set by observer
  
  currentQuestionBinding: SC.Binding.single('.selection'),
  
  indexOfCurrentQuestion : function () {
    var selection = this.get('selection');
    var indexSet = selection.indexSetForSource(this);
    var index = indexSet ? indexSet.toArray().objectAt(0) : undefined;
    
    return index;
  }.property('currentQuestion', 'content', '[]').cacheable(),


  _setPrevNextQuestionIsAllowed: function () {
    var index = this.get('indexOfCurrentQuestion');
    
    this.set('nextQuestionIsAllowed',
      SmartGraphs.questionController.get('isAnswered') && (index + 1 < this.get('length')));
      
    this.set('prevQuestionIsAllowed', index > 0);
  }.observes('currentQuestion', 'content', '[]', 'SmartGraphs.questionController.isAnswered'),


  nextQuestion: function () {
    if (this.get('nextQuestionIsAllowed')) {
      this.selectObject(this.objectAt(this.get('indexOfCurrentQuestion')+1));
    }
  },

  prevQuestion: function () {
    if (this.get('prevQuestionIsAllowed')) {
      this.selectObject(this.objectAt(this.get('indexOfCurrentQuestion')-1));
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
