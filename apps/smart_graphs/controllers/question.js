// ==========================================================================
// Project:   SmartGraphs.questionController
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals SmartGraphs */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
sc_require('models/question');

// even for this simple question controller, it might make sense to use a delegate pattern
// e.g., set a delegate object that knows how to fetch the answer and be able to write new delegates without rewriting
// or adding on to a question controller

SmartGraphs.questionController = SC.ObjectController.create(
/** @scope SmartGraphs.questionController.prototype */ {

  checkResponse: function () {
    if (this.get('response') === this.get('correctResponse')) {
      this.set('feedback', this.get('correctResponseFeedback'));
    }
    else {
      this.set('feedback', this.get('incorrectResponseFeedback'));
    }
  },
  
  feedback: null,

  shouldAcceptTextResponse: function () {
    return (this.get('responseType') === SmartGraphs.TEXT_RESPONSE);
  }.property(),   
    
  textResponse: null,     // views should bind value to this

  // text response vs. graphical response could be delegated (controller sets delegate depending on record type)
  shouldAcceptGraphicalResponse: function () {
    console.log(this.get('responseType'));
    console.log(SmartGraphs.GRAPH_ANNOTATION_RESPONSE);
    return (this.get('responseType') === SmartGraphs.GRAPH_ANNOTATION_RESPONSE);
  }.property(),
  
  graphicalResponse: function () {
    var selection = SmartGraphs.dataSeriesController.get('selection');

    // for simplicity's sake, the value of the response is the x coordinate of the selected point, as a string.
    return (selection.get('length') === 1) ? selection.toArray().objectAt(0).get('x')+'' : null;
  }.property(),

  response: function () {
    if (this.get('shouldAcceptTextResponse')) {
      return this.get('textResponse');
    }
    else if (this.get('shouldAcceptGraphicalResponse')) {
      return this.get('graphicalResponse');
    }
    else return null;
  }.property()
}) ;
