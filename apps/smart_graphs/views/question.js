// ==========================================================================
// Project:   SmartGraphs.QuestionView
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals SmartGraphs */

/** @class

  (Document Your View Here)

  @extends SC.View
*/
SmartGraphs.QuestionView = SC.View.extend(
/** @scope SmartGraphs.QuestionView.prototype */ {

  displayProperties: 'controller prompt feedback textInputShouldBeVisible'.w(),
  childViews: 'promptView inputView checkButton feedbackView'.w(),

  promptView: SC.StaticContentView.design({
    contentBinding: ".parentView.prompt"
  }),

  inputView: SC.View.design({
    layout: {
      height: 20,
      width: 150
    },
    useStaticLayout: YES,
    isVisibleBinding: '.parentView.textInputShouldBeVisible',
    childViews: 'textFieldView'.w(),
    textFieldView: SC.TextFieldView.design({
      isTextArea: YES
    })
  }),

  checkButton: SC.ButtonView.design({
    useStaticLayout: YES,
    title: 'Check Answer',
    targetBinding: '.parentView.controller',
    action: 'checkResponse'
  }),
  
  feedbackView: SC.StaticContentView.design({
    contentBinding: '.parentView.feedback'
  })
});
