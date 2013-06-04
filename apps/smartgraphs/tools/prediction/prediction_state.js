// ==========================================================================
// Project:   Smartgraphs.PREDICTION_TOOL
// Copyright: ©2011 Concord Consortium
// Author:    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  In this graph controller state, the user can "draw" on the graph to enter a hand-drawn prediction of what a data
  graph looks like (or will look like).

  @extends SC.State
  @version 0.1
*/
Smartgraphs.PREDICTION_TOOL = SC.State.extend(
/** @scope Smartgraphs.PREDICTION_TOOL.prototype */ {

  initialSubstate: 'OFF',

  // default UI behavior = 'extend' lines. Alternative is 'freehand' behavior. See EXTEND and FREEHAND states below.
  uiBehavior: 'extend',

  OFF: SC.State.design({
    toolRoot: SC.outlet('parentState'),

    predictionToolStartTool: function (context, args) {
      var toolRoot = this.get('toolRoot');
      toolRoot.set('annotationName', args.annotationName);

      // FIXME. Awesome. activity-json parsing is handled all over the codebase, including below...
      if (args.uiBehavior === 'freehand') {
        toolRoot.set('uiBehavior', args.uiBehavior);
      }
      this.gotoState(this.getPath('parentState.ON'));
    }
  }),

  ON: SC.State.design({

    toolRoot: SC.outlet('parentState'),
    owner:    SC.outlet('statechart.owner'),

    initialSubstate: 'CHOOSE_BEHAVIOR',

    enterState: function () {
      var toolRoot = this.get('toolRoot'),
          annotationName = toolRoot.get('annotationName'),
          annotation = Smartgraphs.predictionTool.getAnnotation(annotationName);

      if (!annotation) {
        throw SC.Error.desc("Prediction tool was started with a bogus annotation name '%@'".fmt(annotationName));
      }
      if (!SC.kindOf(annotation, Smartgraphs.FreehandSketch)) {
        throw SC.Error.desc("Prediction tool was started with a non-FreehandSketch annotation name '%@'".fmt(annotationName));
      }

      this.get('owner').showControls();
      this.get('owner').revealOnlyClearControl();

      annotation.clear();
      Smartgraphs.predictionTool.appendSketch(this, annotation);
      Smartgraphs.predictionTool.predictionStarting(this);

      toolRoot.set('annotation', annotation);
    },

    exitState: function () {
      var toolRoot = this.get('toolRoot');

      this.get('owner').hideControls();
      Smartgraphs.predictionTool.predictionFinished(this);

      toolRoot.set('annotation', null);
      toolRoot.set('annotationName', null);
    },

    stopTool: function () {
      this.gotoState(this.getPath('toolRoot.OFF'));
    },

    // I'm sure this is some kind of antipattern, but it's not clear how else the ON state can dynamically choose its
    // initial substate every time it's entered ('initialSubstate' is interpreted during initStatechart; and there
    // doesn't seem to be for the ON state to NOT enter one of its substates until it chooses to do so; as far as
    /// SC.Statechart is concerned, entering ON "really" means entering one of its substates

    CHOOSE_BEHAVIOR: SC.State.design({
      toolRoot: SC.outlet('parentState.toolRoot'),

      enterState: function () {
        var uiBehavior = this.getPath('toolRoot.uiBehavior');

        // Awesome. FIXME: we parse the activity JSON in many places, including below
        if (uiBehavior === 'extend') {
          this.gotoState(this.getPath('parentState.EXTEND'));
        }
        else if (uiBehavior === 'freehand') {
          this.gotoState(this.getPath('parentState.FREEHAND'));
        }
        else {
          throw SC.Error.desc("Prediction behavior was started with unknown UI behavior argument '%@'".fmt(uiBehavior));
        }
      }
    }),

    // "EXTEND" option -- extend straight lines from mousedown to mousedown

    EXTEND: SC.State.design({

      toolRoot: SC.outlet('parentState.toolRoot'),

      initialSubstate: 'START',

      START: SC.State.design({

        toolRoot: SC.outlet('parentState.toolRoot'),
        owner:    SC.outlet('statechart.owner'),

        enterState: function () {
          this.getPath('toolRoot.annotation').clear();
          this.get('owner').disableAllControls();
        },

        mouseDownAtPoint: function (context, args) {
          this.getPath('toolRoot.annotation').addPoint(args.x, args.y);
        },

        mouseDraggedToPoint: function (context, args) {
          this.getPath('toolRoot.annotation').addPoint(args.x, args.y);
          this.getPath('parentState.CONTINUE');
        },

        mouseUpAtPoint: function (context, args) {
          this.getPath('toolRoot.annotation').addPoint(args.x, args.y);
          this.gotoState(this.getPath('parentState.CONTINUE'));
        }

      }),

      CONTINUE: SC.State.design({

        toolRoot: SC.outlet('parentState.toolRoot'),
        owner: SC.outlet('statechart.owner'),

        enterState: function () {
          this.get('owner').highlightClearControl();
        },

        mouseDownAtPoint: function (context, args) {
          this.getPath('toolRoot.annotation').addPoint(args.x, args.y);
        },

        mouseDraggedToPoint: function (context, args) {
          this.getPath('toolRoot.annotation').updateLatestPoint(args.x, args.y);
        },

        mouseUpAtPoint: function (context, args) {
          this.getPath('toolRoot.annotation').updateLatestPoint(args.x, args.y);
        },

        clearControlWasClicked: function () {
          this.gotoState(this.getPath('parentState.START'));
        }
      })
    }),

    // "FREEHAND" option -- draw a single stroke and update it as the mouse moves

    FREEHAND: SC.State.design({

      toolRoot: SC.outlet('parentState.toolRoot'),

      initialSubstate: 'START',

      START: SC.State.design({
        toolRoot: SC.outlet('parentState.toolRoot'),
        owner:    SC.outlet('statechart.owner'),

        enterState: function () {
          this.getPath('toolRoot.annotation').clear();
          this.get('owner').disableAllControls();
          Smartgraphs.predictionTool.predictionStarting(this.get('toolRoot'));
        },

        mouseDownAtPoint: function (context, args) {
          this.getPath('toolRoot.annotation').addPoint(args.x, args.y);
          this.gotoState(this.getPath('parentState.DRAWING'));
        }
      }),

      DRAWING: SC.State.design({
        toolRoot: SC.outlet('parentState.toolRoot'),
        owner:    SC.outlet('statechart.owner'),

        addPoint: function (x, y) {
          this.getPath('toolRoot.annotation').addPoint(x, y);
        },

        mouseDraggedToPoint: function (context, args) {
          this.addPoint(args.x, args.y);
        },

        mouseUpAtPoint: function (context, args) {
          this.addPoint(args.x, args.y);
          this.gotoState(this.getPath('parentState.DONE'));
        }
      }),

      DONE: SC.State.design({
        toolRoot: SC.outlet('parentState.toolRoot'),
        owner:    SC.outlet('statechart.owner'),

        enterState: function () {
          Smartgraphs.predictionTool.predictionFinished(this.get('toolRoot'));
          this.get('owner').highlightClearControl();
        },

        clearControlWasClicked: function () {
          this.gotoState(this.getPath('parentState.START'));
        }
      })
    })

  })
});
