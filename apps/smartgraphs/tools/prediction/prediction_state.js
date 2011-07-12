// ==========================================================================
// Project:   Smartgraphs.PREDICTION_TOOL
// Copyright: ©2011 Concord Consortium
// Author:    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  In this graph controller state, the user can "draw" on the graph to enter a hand-drawn prediction of what a data
  graph looks like (or will look like).
  
  @extends SC.State
  @version 0.1
*/
Smartgraphs.PREDICTION_TOOL = SC.State.extend(
/** @scope Smartgraphs.PREDICTION_TOOL.prototype */ {
  
  initialSubstate: 'OFF',
  
  OFF: SC.State.design({
    toolRoot: SC.outlet('parentState'),
    
    predictionToolStartTool: function (context, annotationName) {
      var toolRoot = this.get('toolRoot');
      toolRoot.set('annotationName', annotationName);
      this.gotoState(toolRoot.get('name') + '.ON');
    }
  }),
  
  ON: SC.State.design({
    
    initialSubstate: 'START',
    toolRoot: SC.outlet('parentState'),
    owner: SC.outlet('statechart.owner'),
    
    enterState: function () {
      var toolRoot = this.get('toolRoot'),
          annotationName = toolRoot.get('annotationName'),
          annotation = Smartgraphs.predictionTool.getAnnotation(annotationName);
          
      if (!annotation) {
        throw SC.Error.desc("Prediction tool was started with a bogus annotation name '%@'".fmt(annotationName));
      }
      if (!SC.kindOf(annotation, Smartgraphs.FreehandSketch)) {
        throw SC.Error.desc("Prediction tool was started with a non-FreehandSketch annotation name '%@'".fmt(annotationName));
      }
      this.get('owner').showControls();
      this.get('owner').revealOnlyClearControl();

      annotation.clear();
      Smartgraphs.predictionTool.appendSketch(this, annotation);
      Smartgraphs.predictionTool.predictionStarting(this);
      
      toolRoot.set('annotation', annotation);
    },
    
    exitState: function () {
      var toolRoot = this.get('toolRoot');
      
      this.get('owner').hideControls();
      Smartgraphs.predictionTool.predictionFinished(this);
            
      toolRoot.set('annotation', null);
      toolRoot.set('annotationName', null);
    },
    
    stopTool: function () {
      var toolRoot = this.get('toolRoot');
      this.gotoState(toolRoot.get('name') + '.OFF');
    },
    
    START: SC.State.design({
      
      toolRoot: SC.outlet('parentState.toolRoot'),
      owner: SC.outlet('statechart.owner'),
      
      enterState: function () {
        this.getPath('toolRoot.annotation').clear();
        this.get('owner').disableAllControls();
      },
      
      mouseDownAtPoint: function (context, args) {
        this.getPath('toolRoot.annotation').addPoint(args.x, args.y);
      },
      
      mouseDraggedToPoint: function (context, args) {
        var toolRoot = this.get('toolRoot');        
        this.getPath('toolRoot.annotation').addPoint(args.x, args.y);
        this.gotoState(toolRoot.get('name')+'.ON.CONTINUE');
      },
      
      mouseUpAtPoint: function (context, args) {
        var toolRoot = this.get('toolRoot');
        toolRoot.get('annotation').addPoint(args.x, args.y);
        this.gotoState(toolRoot.get('name')+'.ON.CONTINUE');
      }
      
    }),
    
    CONTINUE: SC.State.design({
      
      toolRoot: SC.outlet('parentState.toolRoot'),
      owner: SC.outlet('statechart.owner'),
      
      enterState: function () {
        this.get('owner').enableClearControl();
      },
      
      mouseDownAtPoint: function (context, args) {
        this.getPath('toolRoot.annotation').addPoint(args.x, args.y);
      },
      
      mouseDraggedToPoint: function (context, args) {
        this.getPath('toolRoot.annotation').updateLatestPoint(args.x, args.y);
      },
      
      mouseUpAtPoint: function (context, args) {
        this.getPath('toolRoot.annotation').updateLatestPoint(args.x, args.y);
      },
            
      clearControlWasClicked: function () {
        var toolRoot = this.get('toolRoot');   
        this.gotoState(toolRoot.get('name')+'.ON.START');
      }
    })
  })

});
