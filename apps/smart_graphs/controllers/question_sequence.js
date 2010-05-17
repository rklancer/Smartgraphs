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
    var index = indexSet.toArray().objectAt(0);
    
    return index;
  }.property('selection', 'content').cacheable(),
  
  nextQuestionIsAllowed: function () {
    return this.getPath('currentQuestion.isAnswered') &&
      (this.get('indexOfCurrentQuestion') + 1 < this.get('length'));
  }.property(),
  
  nextQuestion: function () {
    if (this.get('nextQuestionIsAllowed')) {    
      this.selectObject(this.objectAt(this.get('indexOfCurrentQuestion')+1));
    }
  },
  
  prevQuestionIsAllowed: function () {
    return (this.get('indexOfCurrentQuestion') > 0);
  }.property(),
  
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
