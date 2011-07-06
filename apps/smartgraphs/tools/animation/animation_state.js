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
    animationToolStartTool: function () {
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
      // show the controls in the 'main' pane, which will animate the data    
      Smartgraphs.activityViewController.revealAllControls();
      Smartgraphs.activityViewController.showControls(Smartgraphs.animationTool.get('mainPane'));
      
      // route animation information to the relevant graph controllers
      Smartgraphs.animationTool.setupGraphControllers();
    },
  
    exitState: function () {    
      Smartgraphs.animationTool.stopAnimating();
      Smartgraphs.animationTool.clearGraphControllers();    
      Smartgraphs.animationTool.clear();
      Smartgraphs.activityViewController.hideControls(Smartgraphs.animationTool.get('mainPane'));
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
