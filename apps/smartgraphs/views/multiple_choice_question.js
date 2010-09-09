// ==========================================================================
// Project:   CC.MultipleChoiceQuestionView
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals CC */

/** @class

  (Document Your View Here)

  @extends CC.QuestionView
*/
require('views/question');
Smartgraphs.MultipleChoiceQuestionView = CC.QuestionView.extend(
/** @scope CC.MultipleChoiceQuestionView.prototype */ {
	classNames: ['question','multiple-choice-question'],
	
	choices: '1 2 3 4'.w(),
  canSelectMultipleAnswers: NO,

	inputView: SC.RadioView.design(SC.StaticLayout, {
		layout: {left: 20, top: 5, width: 600, height: 95 },
		useStaticLayout: YES,
		classNames: 'question-input',
		itemsBinding: '*parentView.choices',
		
		// FIXME! This is necessary because SC.RadioView doesn't properly recreate its child
		// radio buttons after the first time it renders itself.
		itemsChanged: function() {
			this.replaceLayer();
		}.observes('items')
	})

});
