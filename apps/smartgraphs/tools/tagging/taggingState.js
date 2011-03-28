// ==========================================================================
// Project:   Smartgraphs.TAGGING_TOOL
// Copyright: ©2010 Concord Consortium
// Author:   Richard Klancer
// ==========================================================================
/*globals Smartgraphs */

/** @class

  In this application state, the student updates the 'points' property of an annotation by clicking on points in 
  a dataset. This can continue until we leave this state (for example, when the activity step is submitted.)

  @extends SC.State
  @version 0.1
*/
Smartgraphs.TAGGING_TOOL = SC.State.extend(
/** @scope Smartgraphs.TAGGING_TOOL.prototype */ {
  
  enterState: function () {
    // disable submission until a selection is made...
    Smartgraphs.statechart.sendAction('disableSubmission');
    
    var dataset = Smartgraphs.taggingTool.get('dataset');
    this._oldIsSelectable = dataset.get('isSelectable');
    dataset.set('isSelectable', NO);
    Smartgraphs.taggingTool.clearPoint();
  },
  
  exitState: function () {
    var dataset = Smartgraphs.taggingTool.get('dataset');
    dataset.set('isSelectable', this._oldIsSelectable);
    Smartgraphs.taggingTool.clearSetup();
  },
  
  /** 
    This event is fired by DatapointViews whenever the user clicks on a data point. We ignore clicks on data points in
    datasets we don't care about.
    
    If this event comes from the dataset we care about, we update the annotation's 'point' property to the clicked-on
    point. This also enables activity step submission, if it was disabled.
  
    @param {Smartgraphs.DataPointView} dataPointView 
      The dataPointView that was clicked on
  */
  dataPointSelected: function (dataPointView) {
    var dataset = Smartgraphs.taggingTool.get('dataset');
    var point = dataPointView.get('content');
    
    if (dataset && point.get('dataset') === dataset) {
      Smartgraphs.taggingTool.setPoint(point);
      Smartgraphs.statechart.sendAction('enableSubmission');
    }
  }
  
}) ;
