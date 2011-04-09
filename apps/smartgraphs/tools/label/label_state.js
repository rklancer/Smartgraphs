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
    
    mouseDownAtPoint: function (context, args) {
      var owner     = this.getPath('statechart.owner'),
          labelName = this.getPath('parentState.labelName'),
          label     = Smartgraphs.labelTool.createLabel(labelName, args.x, args.y),
          isOk;
      
      if (label) {
        isOk = Smartgraphs.labelTool.addLabelToController(owner, label);
        if (isOk) {
          this.set('label', label);
          this.gotoState('LABEL_CREATED');
        }
      }
    }
  }),
  
  LABEL_CREATED: SC.State.design({
  })
  
}) ;
