// ==========================================================================
// Project:   Smartgraphs.ANIMATION_TOOL
// Copyright: ©2011 Concord Consortium
// Author:    Erich Ocean <erich.ocean@me.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  Superstate representing that the activity step is animatable.

  @extends SC.State
  @version 0.1
*/

Smartgraphs.ANIMATION_TOOL = SC.State.extend(
/** @scope Smartgraphs.ANIMATION_TOOL.prototype */ {
  
  initialSubstate: 'OFF',
  
  OFF: SC.State.design({
    animationToolStartTool: function (context) {
      var parentState = this.get('parentState');
      this.gotoState(parentState.get('name') + '.ON');
    }
  }),
    
  ON: SC.State.design({

    initialSubstate: 'ANIMATION_CLEARED',
    
    stopTool: function () {
      var parentState = this.get('parentState');
      this.gotoState(parentState.get('name') + '.OFF');
    },
  
    enterState: function () {
      var pane = Smartgraphs.animationTool.get('pane'),
          linkedAnimations = Smartgraphs.animationTool.get('linkedAnimations');
    
      Smartgraphs.activityViewController.revealAllControls();
      Smartgraphs.activityViewController.showControls(pane);
      Smartgraphs.activityViewController.showAnimation(pane, Smartgraphs.animationTool.get('backgroundImageURL'), Smartgraphs.animationTool.get('staticImages'));
      linkedAnimations.forEach(function (animation) {
        Smartgraphs.activityViewController.showAnimation(animation.pane);
      });
    },
  
    exitState: function () {
      var pane = Smartgraphs.animationTool.get('pane'),
          linkedAnimations = Smartgraphs.animationTool.get('linkedAnimations');
    
      // make sure the animation is stopped before we leave the activity step!
      Smartgraphs.animationTool.clear();
    
      Smartgraphs.activityViewController.hideAnimation(pane);
      linkedAnimations.forEach(function (animation) {
        Smartgraphs.activityViewController.hideAnimation(animation.pane);
      });
      Smartgraphs.activityViewController.hideControls(pane);
    },
  
    // ..........................................................
    // SUBSTATES
    //
  
    ANIMATION_CLEARED: SC.State.design({

      enterState: function () {
        Smartgraphs.animationTool.clearAnimation();
        Smartgraphs.activityViewController.highlightStartControl();
      },

      startControlWasClicked: function () {
        this.gotoState('ANIMATION_RUNNING');
      }

    }),
  
  
    ANIMATION_RUNNING: SC.State.design({

      enterState: function () {
        Smartgraphs.animationTool.startAnimating();
        Smartgraphs.activityViewController.highlightStopControl();
      },
    
      stopControlWasClicked: function () {
        this.gotoState('ANIMATION_STOPPED');
      },
      
      animationFinished: function () {
        this.gotoState('ANIMATION_FINISHED');
      },
    
      // can't animate correctly while the view is resizing
      graphViewDidResize: function() {
        this.gotoState('ANIMATION_CLEARED');
      }
    
    }),
  
  
    ANIMATION_STOPPED: SC.State.design({
    
      enterState: function () {
        Smartgraphs.animationTool.stopAnimating();
        Smartgraphs.activityViewController.highlightStartControl();
        Smartgraphs.activityViewController.enableClearControl();
      },
    
      startControlWasClicked: function () {
        this.gotoState('ANIMATION_RUNNING');
      },
    
      clearControlWasClicked: function () {
        this.gotoState('ANIMATION_CLEARED');
      },
      
      // can't animate correctly if the view is resized
      graphViewDidResize: function() {
        this.gotoState('ANIMATION_CLEARED');
      }
    
    }),
    
    ANIMATION_FINISHED: SC.State.design({
      
      enterState: function () {
        Smartgraphs.activityViewController.highlightClearControl();
      },
      
      clearControlWasClicked: function () {
        this.gotoState('ANIMATION_CLEARED');
      },
      
      graphViewDidResize: function() {
        this.gotoState('ANIMATION_CLEARED');
      }
    })

  })
  
});
