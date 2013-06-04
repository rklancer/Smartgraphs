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
    Whether to mark this tool on data point.

    @property {Boolean}
  */

  markOnDataPoints: false,

  /**
    Maximum number of labels allowed in labelset.

    @property {Number}
  */
  maxNoOfLabels: null,

  /**
    Name of the dataset associated with this tool.

    @property {String}
  */
  datadefName: null,
  /**
    The label or labelset we are managing. Set during entry to LABEL_TOOL state and unset on state exit.

    @property {Smartgraphs.Label|Smartgraphs.LabelSet}
  */
  annotation: null,

  /**
    The graphpane to which the tool is assigned

    @property {String}
   */
  pane: null,

  /**
    Whether to allow label annotation to shift with change in coordinates.

    @property {Boolean}
  */
  allowCoordinatesChange: NO,

  initialSubstate: 'OFF',

  closeLabelIfInEditing: function () {
    var graphView = Smartgraphs.labelTool.graphViewForPane(this.get('pane'));
    var topAnnotationsHolder = graphView.getPath('topAnnotationsHolder');
    var label = topAnnotationsHolder.getLabelInEditMode();
    if (label) {
      label.commitEditing();
      return YES;
    }
    return NO;
  },

  OFF: SC.State.design({
    labelToolStartTool: function (context, args) {
      var parentState = this.get('parentState');
      parentState.set('annotationName', args.annotationName);
      parentState.set('markOnDataPoints', args.markOnDataPoints);
      parentState.set('maxNoOfLabels', args.maxNoOfLabels);
      parentState.set('datadefName', args.datadefName);
      parentState.set('pane', args.pane);
      if (args.allowCoordinatesChange) {
        parentState.set('allowCoordinatesChange', args.allowCoordinatesChange);
      }

      this.gotoState(parentState.get('name') + '.ON');
    }
  }),

  ON: SC.State.design({
    toolRoot: SC.outlet('parentState'),
    initialSubstate: 'START',

    stopTool: function () {
      var parentState = this.get('parentState');
      this.gotoState(parentState.get('name') + '.OFF');
    },

    enterState: function () {
      var parentState    = this.get('parentState'),
          annotationName = parentState.get('annotationName'),
          annotation     = Smartgraphs.labelTool.getAnnotation(annotationName);

      parentState.set('annotation', annotation);
    },

    exitState: function () {
      var parentState = this.get('parentState');

      parentState.get('annotation').disableRemoval();
      parentState.set('annotation', null);
      parentState.set('annotationName', null);
    },

    // EVENT HANDLERS

    mouseDownAtPoint: function (context, args) {
      var toolRoot = this.get('toolRoot');
      toolRoot.closeLabelIfInEditing();

      if (!this.parentState.markOnDataPoints) {
        this.get('statechart').sendAction('addLabel', this, {x: args.x, y: args.y, shouldMarkTargetPoint: YES});
      }
      else {
        var datadefName = this.getPath('toolRoot.datadefName');
        var dataRepresentation = context.getDataRepresentation(datadefName);
        var point = dataRepresentation.getNearestPoint(args);
        if (point !== null) {
          this.get('statechart').sendAction('addLabel', this, {x: point.x, y: point.y, shouldMarkTargetPoint: NO});
        }
      }
      return YES;
    },

    dataPointSelected: function (context, args) {
      var toolRoot = this.get('toolRoot');
      toolRoot.closeLabelIfInEditing();
      this.get('statechart').sendAction('addLabel', this, {x: args.x, y: args.y, shouldMarkTargetPoint: NO});
      return YES;
    },

    // SUBSTATES

    START: SC.State.design({
      toolRoot: SC.outlet('parentState.toolRoot'),
      enterState: function () {
        var annotation = this.getPath('toolRoot.annotation');

        if (SC.kindOf(annotation, Smartgraphs.Label)) {
          this.gotoState('LABEL_ONE');
        }
        else if (SC.kindOf(annotation, Smartgraphs.LabelSet)) {
          this.gotoState('LABEL_MANY');
        }
      }
    }),

    LABEL_ONE: SC.State.design({
      toolRoot: SC.outlet('parentState.toolRoot'),
      initialSubstate: 'NOT_ADDED',

      NOT_ADDED: SC.State.design({
        toolRoot: SC.outlet('parentState.toolRoot'),
        enterState: function () {
          Smartgraphs.labelTool.addLabelsStarting(this);
        },

        exitState: function () {
          Smartgraphs.labelTool.addLabelsFinished(this);
        },

        addLabel: function (context, args) {
          var label = this.getPath('toolRoot.annotation');
          var allowCoordinatesChange = this.getPath('toolRoot.allowCoordinatesChange');
          label.set('x', args.x);
          label.set('y', args.y);
          label.set('shouldMarkTargetPoint', args.shouldMarkTargetPoint);
          label.set('createdByLabelTool', YES);
          label.set('allowCoordinatesChange', allowCoordinatesChange);

          // Tell label to re-check the position
          label.set('isPositionUpdateRequired', null);

          Smartgraphs.labelTool.appendLabel(this, label);
          this.gotoState('ADDED');
          return YES;
        }
      }),

      ADDED: SC.State.design({
        toolRoot: SC.outlet('parentState.toolRoot'),
        enterState: function () {
          var label = this.getPath('toolRoot.annotation');
          label.enableRemoval();
          label.set('isEditable', YES);
        },
        exitState: function () {
          // For the time being, SG never marks label text non-editable.
          //this.getPath('toolRoot.annotation').set('isEditable', NO);
        },
        dataPointSelected: function (context, args) {
          var toolRoot = this.get('toolRoot');
          toolRoot.closeLabelIfInEditing();
          var allowCoordinatesChange = this.getPath('toolRoot.allowCoordinatesChange');
          if (!allowCoordinatesChange) {
            return;
          }
          if (this.getPath('toolRoot.markOnDataPoints') === true) {
            var label = this.getPath('toolRoot.annotation');
            var labelView = label.get('view');
            labelView.commitEditing();

            label.set('x', args.x);
            label.set('y', args.y);
            label.set('isPositionUpdateRequired', YES);
          }
        },
        mouseDownAtPoint: function (context, args) {
          var toolRoot = this.get('toolRoot');
          toolRoot.closeLabelIfInEditing();
          var allowCoordinatesChange = this.getPath('toolRoot.allowCoordinatesChange');
          if (!allowCoordinatesChange) {
            return;
          }
          var label = this.getPath('toolRoot.annotation');
          var labelView = label.get('view');
          labelView.commitEditing();

          var datadefName = this.getPath('toolRoot.datadefName');
          var dataRepresentation = context.getDataRepresentation(datadefName);
          var point = dataRepresentation.getNearestPoint(args);
          if (point) {
            label.set('x', point.x);
            label.set('y', point.y);
            label.set('isPositionUpdateRequired', YES);
          }
        },
        removeLabel: function (context, args) {
          var label = this.getPath('toolRoot.annotation');

          if (args.label === label) {
            Smartgraphs.labelTool.removeLabel(this, label);
            this.gotoState('NOT_ADDED');
          }
          return YES;
        }
      })
    }),

    LABEL_MANY: SC.State.design({
      toolRoot: SC.outlet('parentState.toolRoot'),
      initialSubstate: 'ADDING',
      enterState: function () {
        var labelSet = this.getPath('toolRoot.annotation');
        labelSet.enableRemoval();
        var arrLabels = labelSet.get('labels');
        var allowCoordinatesChange = this.getPath('toolRoot.allowCoordinatesChange');
        for (var i = 0; i < arrLabels.length(); i++) {
          arrLabels.objectAt(i).set('allowCoordinatesChange', allowCoordinatesChange);
        }
        Smartgraphs.labelTool.appendLabelSet(this, labelSet);
      },

      exitState: function () {
        var labelSet = this.getPath('toolRoot.annotation');
        labelSet.disableRemoval();
        var arrLabels = labelSet.get('labels');
        for (var i = 0; i < arrLabels.length(); i++) {
          // For the time being, SG never marks label text non-editable.
          // arrLabels.objectAt(i).set('isEditable', NO);
          arrLabels.objectAt(i).set('allowCoordinatesChange', NO);
        }
        Smartgraphs.labelTool.addLabelsFinished(this);
      },

      ADDING: SC.State.design({
        toolRoot: SC.outlet('parentState.toolRoot'),
        enterState: function () {
          Smartgraphs.labelTool.addLabelsStarting(this);
        },

        addLabel: function (context, args) {
          var toolRoot = this.get('toolRoot');
          toolRoot.closeLabelIfInEditing();
          var allowCoordinatesChange = this.getPath('toolRoot.allowCoordinatesChange');
          var labelSet = this.getPath('toolRoot.annotation');
          var label = labelSet.createChildLabel();
          label.set('x', args.x);
          label.set('y', args.y);
          label.set('createdByLabelTool', YES);
          label.set('shouldMarkTargetPoint', args.shouldMarkTargetPoint);
          label.set('isEditable', YES);
          label.set('allowCoordinatesChange', allowCoordinatesChange);

          var nMaxNoOfLabels = this.getPath('toolRoot.maxNoOfLabels');
          if (nMaxNoOfLabels) {
            var nTotalLabels = labelSet.getPath('labels.length');
            if (nTotalLabels === nMaxNoOfLabels) {
              this.gotoState('MAX_LABELS_ADDED');
            }
          }
          return YES;
        }
      }),

      MAX_LABELS_ADDED: SC.State.design({
        enterState: function () {
          Smartgraphs.labelTool.addLabelsFinished(this);
        }
      }),

      removeLabel: function (context, args) {
        var labelSet = this.getPath('toolRoot.annotation');
        labelSet.removeLabel(args.label);
        var addingState = this.getSubstate('ADDING');
        if (!addingState.get('isCurrentState')) {
          this.gotoState('ADDING');
        }
        return YES;
      }
    })
  })
});
