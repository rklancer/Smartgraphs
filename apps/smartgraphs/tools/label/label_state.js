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

  /**
    The name of the label annotation we care about. Will be set on tool startup.
  */
  labelName: null,
  
  NO_LABEL: SC.State.design({
    
    enterState: function () {
      Smartgraphs.labelTool.startPlacement(this);
    },
    
    exitState: function () {
      Smartgraphs.labelTool.placementFinished(this);
    },
    
    mouseDownAtPoint: function (context, args) {
      this.addLabelAt(args.x, args.y, YES);
      return YES;
    },
    
    dataPointSelected: function (context, args) {
      this.addLabelAt(args.x, args.y, NO);
      return YES;
    },

    addLabelAt: function (x, y, shouldMarkTargetPoint) {
      var labelName = this.getPath('parentState.labelName'),
          label     = Smartgraphs.labelTool.createLabel(labelName, x, y, shouldMarkTargetPoint);
      
      if (label) {
        Smartgraphs.labelTool.appendLabel(this, label);
        this.set('label', label);
        this.gotoState('LABEL_CREATED');
      }
    }

  }),
  
  LABEL_CREATED: SC.State.design({
  })
  
}) ;
