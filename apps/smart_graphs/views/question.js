// ==========================================================================
// Project:   Cc.QuestionView
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals SmartGraphs SC*/

/** @class

  (Document Your View Here)

  @extends SC.View
*/

sc_require('main');

SmartGraphs.QuestionView = SC.View.extend({
	//layout: {top: 20, left: 20, right: 0},
	
  contentDisplayProperties: 'prompt'.w(),
	prompt: "[prompt]",
	
//	inputType: SmartGraphs.TEXT_RESPONSE,      // default; should migrate this to a controller

  textInputShouldBeVisibleBinding: SC.Binding.transform( function (value) {
    return (value === SmartGraphs.TEXT_RESPONSE);
  }).from('.inputType'),

	childViews: 'promptView inputView checkButton'.w(),
	
	promptView: SC.StaticContentView.design({
		contentBinding: ".parentView.prompt"
	}),

  inputView: SC.View.design({
   layout: { height: 20 },
   useStaticLayout: YES,
   isVisibleBinding: '.parentView.textInputShouldBeVisible',
   childViews: 'textFieldView'.w(),
   textFieldView: SC.TextFieldView.design({
     //classNames: 'question-input',
     isTextArea: YES
   })
  }),

	checkButton: SC.ButtonView.design({
    useStaticLayout: YES,
	  //layout: { top: 10, left: 20, width: 120 },
	  title: "Check Answer",
    answerBinding: '*parentView.inputView.textFieldView.value',
	  action: function () {
	    SC.AlertPane.info('You said "' + this.get('answer') + '"; I won\'t try to check this answer for you until we\'ve thought more carefully about UI and data modeling issues');
	  }
	})
});
