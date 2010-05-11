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

  inputType: SmartGraphs.TEXT_RESPONSE,
  // default; should migrate this to a controller
  textInputShouldBeVisibleBinding: SC.Binding.transform(function(value) {
    return (value === SmartGraphs.TEXT_RESPONSE);
  }).from('.inputType'),

  // FIXME this should migrate to a controller, of course!
  answer: function() {
    var inputType = this.get('inputType');

    if (inputType === SmartGraphs.TEXT_RESPONSE) {
      var ret = this.getPath('inputView.textFieldView.value').strip();
      console.log('inputView.textFieldView.value = ' + ret);
      return ret;
    }
    else if (inputType === SmartGraphs.GRAPH_ANNOTATION_RESPONSE) {
      // simple logic here is that the 'answer' is the x-value of the selection... make this more general.
      var selection = SmartGraphs.getPath('dataSeriesController.selection');
      console.log('selection = ' + selection);
      return (selection.get('length') === 1) ? selection.toArray().objectAt(0).get('x') : null;
    }
  }.property(),

  childViews: 'promptView inputView checkButton'.w(),

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
      //classNames: 'question-input',
      isTextArea: YES
    })
  }),

  checkButton: SC.ButtonView.design({
    useStaticLayout: YES,
    //layout: { top: 10, left: 20, width: 120 },
    title: "Check Answer",
    //answerBinding: '.parentView.answer',
    action: function() {
      var answer = this.getPath('parentView.answer');

      //handle empty answers.
      if (answer) {
        if (answer === this.getPath('parentView.correctAnswer')) {
          SC.AlertPane.info("'" + answer + "' is the correct answer!");
        }
        else {
          SC.AlertPane.info("Sorry, '" + answer + "' is not the correct answer.");
        }
      } else {
        SC.AlertPane.info("Sorry, that is not the correct answer.");
      }
    }
  })
});
