// ==========================================================================
// Project:   Smartgraphs.LABEL_TOOL
// Copyright: ©2011 Concord Consortium
// Author:    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  @extends SC.State
  @version 0.1
*/
Smartgraphs.LABEL_TOOL = SC.State.extend(
/** @scope Smartgraphs.LABEL_TOOL.prototype */ {
  
  initialSubstate: 'NO_LABEL',
  
  NO_LABEL: SC.State.design({
    
    enterState: function () {
      Smartgraphs.labelTool.startPlacement(this);
    },
    
    exitState: function () {
      Smartgraphs.labelTool.placementFinished(this);
    },
    
    mouseDownAtPoint: function (context, args) {
      this.addLabelAt(args.x, args.y);
      return YES;
    },
    
    dataPointSelected: function (context, args) {
      this.addLabelAt(args.x, args.y);
      return YES;
    },

    addLabelAt: function (x, y) {
      var owner     = this.getPath('statechart.owner'),
          labelName = this.getPath('parentState.labelName'),
          label     = Smartgraphs.labelTool.createLabel(labelName, x, y);
      
      if (label) {
        Smartgraphs.labelTool.addLabelToController(owner, label);
        this.set('label', label);
        this.gotoState('LABEL_CREATED');
      }
    }

  }),
  
  LABEL_CREATED: SC.State.design({
  })
  
}) ;
