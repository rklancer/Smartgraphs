// ==========================================================================
// Project:   Smartgraphs.questionSequenceController
// Copyright: ©2010 Concord Consortium
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/

Smartgraphs.questionSequenceController = SC.ArrayController.create(
/** @scope Smartgraphs.questionSequenceController.prototype */ {

  allowsEmptySelection: NO,
  allowsMultipleSelection: NO,

   // override selectObject to allow self-bindings in questionSequenceController to sync...

  selectObject: function (value) {
    SC.RunLoop.begin();
    sc_super();
    SC.RunLoop.end();    
  },
  
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

  canSelectPreviousQuestionBinding: SC.Binding.not('.isFirstQuestion'),  
  nextQuestionIsSelectableBinding: SC.Binding.oneWay('*nextQuestion.isSelectable'),
  
  canSelectNextQuestion: function () {
    return (!this.get('isLastQuestion') && this.get('nextQuestionIsSelectable'));
  }.property('isLastQuestion', 'nextQuestionIsSelectable').cacheable(),
    
  selectPreviousQuestion: function () {
    if (this.get('canSelectPreviousQuestion')) {
      this.selectObject( this.get('previousQuestion') );
    }
  },
  
  selectNextQuestion: function () {
    if (this.get('canSelectNextQuestion')) { 
      this.selectObject( this.get('nextQuestion') );
    }
  },

  sequenceDidChange: function () {
    var sequence = this.get('sequence');
  
    var query = SC.Query.local(Smartgraphs.Question, { 
      conditions: 'sequence = {sequence}', 
      sequence: sequence,
      orderBy: 'index ASC' 
    });
    var questions = Smartgraphs.store.find(query);
    this.set('content', questions);

    var firstQuestion = questions.objectAt(0);
    if (firstQuestion) {
      firstQuestion.set('isSelectable', true);
      this.set('selectedQuestion', firstQuestion);   
    }
  }.observes('sequence')
}) ;
