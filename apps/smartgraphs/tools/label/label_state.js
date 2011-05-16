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
  
  initialSubstate: 'NOT_ADDED',

  /**
    The name of the label annotation we care about. Will be set on tool startup.
    
    @property {String}
  */
  labelName: null,
  
  mouseDownAtPoint: function (context, args) {
    this.get('statechart').sendAction('addLabel', this, {x: args.x, y: args.y, shouldMarkTargetPoint: YES});
    return YES;
  },
  
  dataPointSelected: function (context, args) {
    this.get('statechart').sendAction('addLabel', this, {x: args.x, y: args.y, shouldMarkTargetPoint: NO});
    return YES;
  },
  
  NOT_ADDED: SC.State.design({
    
    enterState: function () {
      Smartgraphs.labelTool.addLabelsStarting(this);
    },
    
    exitState: function () {
      Smartgraphs.labelTool.addLabelsFinished(this);
    },

    addLabel: function (context, args) {
      var labelName = this.getPath('parentState.labelName'),
          label     = Smartgraphs.labelTool.getLabel(labelName);
      
      if (label) {
        label.set('x', args.x);
        label.set('y', args.y);
        label.set('shouldMarkTargetPoint', args.shouldMarkTargetPoint);
        
        Smartgraphs.labelTool.appendLabel(this, label);
        
        this.set('label', label);
        this.gotoState('ADDED');
      }
    }

  }),
  
  ADDED: SC.State.design({
  })
  
}) ;
