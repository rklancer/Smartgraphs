// ==========================================================================
// Project:   Smartgraphs.TAGGING_TOOL
// Copyright: ©2011 Concord Consortium
// Author:    Richard Klancer
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
    //var datadef = Smartgraphs.taggingTool.get('datadef');
    // disable submission until a selection is made...
    Smartgraphs.statechart.sendAction('disableSubmission');
    //datadef.set('isSelectable', NO);
    Smartgraphs.taggingTool.clearPoint();
  },
  
  exitState: function () {
    var datadef = Smartgraphs.taggingTool.get('datadef');
    datadef.set('isSelectable', this._oldIsSelectable);
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
  dataPointSelected: function (context, args) {
    var datadefName = Smartgraphs.taggingTool.get('datadefName'),
        rep = args.dataRepresentation;
    
    if (rep && rep.getPath('datadef.name') === datadefName) {
      Smartgraphs.taggingTool.setPoint(args.x, args.y);
      Smartgraphs.statechart.sendAction('enableSubmission');
    }
  }
  
}) ;
