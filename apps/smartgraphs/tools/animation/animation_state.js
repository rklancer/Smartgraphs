// ==========================================================================
// Project:   Smartgraphs.ANIMATION_TOOL
// Copyright: ©2011 Concord Consortium
// Author:    Erich Ocean <erich.ocean@me.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  In this graph controller state, one pane shows an animation (and in other panes may show 'linked' animations)

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
    owner: SC.outlet('statechart.owner'),

    stopTool: function () {
      var parentState = this.get('parentState');
      this.gotoState(parentState.get('name') + '.OFF');
    },

    enterState: function () {
      // show the controls in the 'main' pane, which will animate the data
      this.get('owner').revealAllControls();
      this.get('owner').showControls();

      // route animation information to the relevant graph controllers
      Smartgraphs.animationTool.setupGraphControllers();
    },

    exitState: function () {
      Smartgraphs.animationTool.stopAnimating();
      Smartgraphs.animationTool.clearGraphControllers();
      Smartgraphs.animationTool.clearSetup();
      this.get('owner').hideControls();
    },

    // ..........................................................
    // SUBSTATES
    //

    ANIMATION_CLEARED: SC.State.design({

      owner: SC.outlet('statechart.owner'),

      enterState: function () {
        Smartgraphs.animationTool.clearAnimation();
        this.get('owner').highlightStartControl();
      },

      startControlWasClicked: function () {
        this.gotoState('ANIMATION_RUNNING');
      }

    }),


    ANIMATION_RUNNING: SC.State.design({

      owner: SC.outlet('statechart.owner'),

      enterState: function () {
        Smartgraphs.animationTool.startAnimating();
        this.get('owner').highlightStopControl();
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

      owner: SC.outlet('statechart.owner'),

      enterState: function () {
        Smartgraphs.animationTool.stopAnimating();
        this.get('owner').highlightStartControl();
        this.get('owner').enableClearControl();
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

      owner: SC.outlet('statechart.owner'),

      enterState: function () {
        this.get('owner').highlightClearControl();
        Smartgraphs.animationTool.incrementProperty('playCount');
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
