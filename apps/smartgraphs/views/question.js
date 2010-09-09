// ==========================================================================
// Project:   Cc.QuestionView
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals CC */

/** @class

  (Document Your View Here)

  @extends SC.View
*/
Smartgraphs.QuestionView = SC.StackedView.extend(SC.StaticLayout, {
	
	layout: {top: 0, left: 0, right: 0},

  classNames: ['question','open-response-question'],

  contentDisplayProperties: 'prompt'.w(),

	prompt: "[prompt]",
	
	useStaticLayout: NO,
		
	childViews: 'promptView inputView'.w(),
	
	promptView: SC.LabelView.design(SC.StaticLayout, {
		classNames: 'question-prompt',
		useStaticLayout: YES,
		escapeHTML: NO,
		layout: { left: 5, right: 5 },
		valueBinding: "*parentView.prompt"
	}),

	inputView: SC.View.design(SC.StaticLayout, {
		layout: {left: 20, top: 5, width: 600, height: 95 },
		useStaticLayout: YES,
		childViews: 'textFieldView'.w(),
		textFieldView: SC.TextFieldView.design({
			classNames: 'question-input',
			isTextArea: YES
		})
	})

});
