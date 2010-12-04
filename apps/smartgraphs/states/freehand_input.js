// ==========================================================================
// Project:   Smartgraphs.FREEHAND_INPUT
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  @extends SC.State
  @version 0.1
*/

Smartgraphs.FREEHAND_INPUT = SC.State.extend(
/** @scope Smartgraphs.FREEHAND_INPUT.prototype */ {
  
  
  initialState: 'FREEHAND_INPUT_START',
  
  exitState: function () {
    Smartgraphs.freehandInputController.disableInput();
    Smartgraphs.activityViewController.hideControls(Smartgraphs.freehandInputController.get('pane'));   
  },
  
  
  FREEHAND_INPUT_START: SC.State.design({
    
    enterState: function () {
      var enableSucceeded = Smartgraphs.freehandInputController.enableInput();
      // if freehandInputController says NO, don't accept first responder
      if (enableSucceeded) {
        Smartgraphs.activityViewController.revealOnlyClearControl();
        Smartgraphs.activityViewController.showControls(Smartgraphs.freehandInputController.get('pane'));
        this.gotoState('FREEHAND_INPUT_READY');
      }
      else {
        this.gotoState('ACTIVITY_STEP_DEFAULT');
      }
    }
  }),

  
  FREEHAND_INPUT_READY: SC.State.design({

    enterState: function () {
      Smartgraphs.activityViewController.disableAllControls();
      Smartgraphs.freehandInputController.startRecording();
    },

    exitState: function () {
      Smartgraphs.freehandInputController.stopRecording();    
    },

    freehandSketchCompleted: function () {
      this.gotoState('FREEHAND_INPUT_COMPLETED');
    }
  }),
  
  
  FREEHAND_INPUT_COMPLETED: SC.State.design({
    
    didBecomeFirstResponder: function () {
      Smartgraphs.freehandInputController.stopRecording();    
      Smartgraphs.activityViewController.highlightClearControl();
    },

    clearControlWasClicked: function () {
      return this.clearFreehandSketch();
    },

    clearFreehandSketch: function () {
      Smartgraphs.freehandInputController.clearSketch();
      this.gotoState('FREEHAND_INPUT_READY');
      return YES;
    }
  }),
  

  startFreehandInput: function () {
    console.error('Attempted to startFreehandInput when in FREEHAND_INPUT state');
    return YES;       // do nothing and consider that handling it!
  }
  
}) ;
