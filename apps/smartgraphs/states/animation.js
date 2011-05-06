// ==========================================================================
// Project:   Smartgraphs.SENSOR
// Copyright: ©2011 Concord Consortium
// Author:    Erich Ocean <erich.ocean@me.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  Superstate representing that the activity step is animatable.

  @extends SC.State
  @version 0.1
*/

Smartgraphs.ANIMATION = SC.State.extend(
/** @scope Smartgraphs.ANIMATION.prototype */ {
  
  initialSubstate: 'ANIMATION_CLEARED',
  
  enterState: function () {
    Smartgraphs.activityViewController.revealAllControls();
    Smartgraphs.activityViewController.showControls(Smartgraphs.animationController.get('pane'));
  },
  
  exitState: function () {
    Smartgraphs.activityViewController.hideControls();
  },
  
  // ..........................................................
  // SUBSTATES
  //
  
  ANIMATION_CLEARED: SC.State.design({

    enterState: function () {
      Smartgraphs.activityViewController.highlightStartControl();
    },

    startControlWasClicked: function () {
      this.gotoState('ANIMATION_RUNNING');
    }

  }),
  
  
  ANIMATION_RUNNING: SC.State.design({

    enterState: function () {
      Smartgraphs.activityViewController.highlightStopControl();
    },
    
    stopControlWasClicked: function () {
      this.gotoState('ANIMATION_STOPPED');
    }
    
  }),
  
  
  ANIMATION_STOPPED: SC.State.design({
    
    enterState: function () {
      Smartgraphs.activityViewController.highlightStartControl();
      Smartgraphs.activityViewController.enableClearControl();
    },
    
    startControlWasClicked: function () {
      this.gotoState('ANIMATION_RUNNING');
    },
    
    clearControlWasClicked: function () {
      this.gotoState('ANIMATION_CLEARED');
    }
    
  })
  
});
