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
    var pane = Smartgraphs.animationController.get('pane');
    
    Smartgraphs.activityViewController.revealAllControls();
    Smartgraphs.activityViewController.showControls(pane);
    Smartgraphs.activityViewController.showAnimation(pane);
  },
  
  exitState: function () {
    var pane = Smartgraphs.animationController.get('pane');
    
    Smartgraphs.activityViewController.hideAnimation(pane);
    Smartgraphs.activityViewController.hideControls(pane);
  },
  
  // ..........................................................
  // SUBSTATES
  //
  
  ANIMATION_CLEARED: SC.State.design({

    enterState: function () {
      Smartgraphs.animationController.clearAnimation();
      Smartgraphs.activityViewController.highlightStartControl();
    },

    startControlWasClicked: function () {
      this.gotoState('ANIMATION_RUNNING');
    }

  }),
  
  
  ANIMATION_RUNNING: SC.State.design({

    enterState: function () {
      Smartgraphs.animationController.startAnimating();
      Smartgraphs.activityViewController.highlightStopControl();
    },
    
    stopControlWasClicked: function () {
      this.gotoState('ANIMATION_STOPPED');
    },
    
    // can't animate correctly while the view is resizing
    graphViewDidResize: function() {
      this.gotoState('ANIMATION_STOPPED');
    }
    
  }),
  
  
  ANIMATION_STOPPED: SC.State.design({
    
    enterState: function () {
      Smartgraphs.animationController.stopAnimating();
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
