// ==========================================================================
// Project:   Cc.QuestionView
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals CC */

/** @class

  (Document Your View Here)

  @extends SC.View
*/
SC.QuestionView = SC.StackedView.extend(SC.StaticLayout, {
	
	layout: {top: 0, left: 0, right: 0},

  classNames: ['question','open-response-question'],

  contentDisplayProperties: 'prompt'.w(),

	prompt: "[prompt]",
	
	useStaticLayout: NO,
		
	childViews: 'promptView inputView checkButton'.w(),
	
	promptView: SC.StaticContentView.design({
		contentBinding: "*parentView.prompt"
	}),

	inputView: SC.View.design(SC.StaticLayout, {
		layout: {left: 20, top: 5, right: 20, height: 95 },
		useStaticLayout: YES,
		childViews: 'textFieldView'.w(),
		textFieldView: SC.TextFieldView.design({
			classNames: 'question-input',
			isTextArea: YES
		})
	}),
	
	checkButton: SC.ButtonView.design(SC.StaticLayout, {
    useStaticLayout: YES,
	  layout: { top: 10, left: 20, width: 120 },
	  title: "Check Answer",
    answerBinding: '*parentView.inputView.textFieldView.value',
	  action: function () {
	    SC.AlertPane.info('You said "' + this.get('answer') + '"; I won\'t try to check this answer for you until we\'ve thought more carefully about UI and data modeling issues');
	  }
	})
});
