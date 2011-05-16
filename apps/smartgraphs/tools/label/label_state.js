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

  /**
    The name of the label or labelset we care about. Set before entry to LABEL_TOOL state and unset on state exit.
    
    @property {String}
  */
  annotationName: null,
  
  /**
    The label or labelset we are managing. Set during entry to LABEL_TOOL state and unset on state exit.
    
    @property {Smartgraphs.LabelAnnotation|Smartgraphs.LabelSet}
  */
  annotation: null,
  
  initialSubstate: 'START',

  exitState: function () {
    this.get('annotation').disableRemoval();
    this.set('annotation', null);
    this.set('annotationName', null);
  },
  

  // EVENT HANDLERS
  
  mouseDownAtPoint: function (context, args) {
    this.get('statechart').sendAction('addLabel', this, {x: args.x, y: args.y, shouldMarkTargetPoint: YES});
    return YES;
  },
  
  dataPointSelected: function (context, args) {
    this.get('statechart').sendAction('addLabel', this, {x: args.x, y: args.y, shouldMarkTargetPoint: NO});
    return YES;
  },
  

  // SUBSTATES
  
  START: SC.State.design({
    
    enterState: function () {
      var annotationName = this.getPath('parentState.annotationName'),
          annotation     = Smartgraphs.labelTool.getAnnotation(annotationName);

      this.get('parentState').set('annotation', annotation);
      
      if (SC.kindOf(annotation, Smartgraphs.LabelAnnotation)) {
        this.gotoState('LABEL_ONE');
      }
      else if (SC.kindOf(annotation, Smartgraphs.LabelSet)) {
        this.gotoState('LABEL_MANY');
      }
    }
  }),
  
  
  LABEL_ONE: SC.State.design({
    
    initialSubstate: 'NOT_ADDED',
  
    NOT_ADDED: SC.State.design({
    
      enterState: function () {
        Smartgraphs.labelTool.addLabelsStarting(this);
      },
    
      exitState: function () {
        Smartgraphs.labelTool.addLabelsFinished(this);
      },

      addLabel: function (context, args) {
        var label = this.getPath('parentState.parentState.annotation');

        label.set('x', args.x);
        label.set('y', args.y);
        label.set('shouldMarkTargetPoint', args.shouldMarkTargetPoint);
      
        Smartgraphs.labelTool.appendLabel(this, label);
        this.gotoState('ADDED');
      }
    }),
  
    ADDED: SC.State.design({
      
      enterState: function () {
        this.getPath('parentState.parentState.annotation').enableRemoval();
      },
      
      removeLabel: function (context, args) {
        var label = this.getPath('parentState.parentState.annotation');
        
        if (args.label === label) {
          Smartgraphs.labelTool.removeLabel(this, label);
          this.gotoState('NOT_ADDED');
        }
        return YES;
      }
    })
  }),
  
  
  LABEL_MANY: SC.State.design({
    
    enterState: function () {
      Smartgraphs.labelTool.addLabelsStarting(this);
      this.get('annotation').enableRemoval();
    },
  
    exitState: function () {
      Smartgraphs.labelTool.addLabelsFinished(this);
    },
    
    addLabel: function (context, args) {
      var labelSet = this.getPath('parentState.annotation'),
          label    = labelSet.createChildLabel();
    
      label.set('x', args.x);
      label.set('y', args.y);
      label.set('shouldMarkTargetPoint', args.shouldMarkTargetPoint);
    
      Smartgraphs.labelTool.appendLabel(this, label);
    },
    
    removeLabel: function (context, args) {
      var labelSet = this.getPath('parentState.annotation');
      
      if (labelSet.containsLabel(args.label)) {
        labelSet.removeLabel(args.label);
        Smartgraphs.labelTool.removeLabel(this, args.label);
      }
    }
  })
  
}) ;
