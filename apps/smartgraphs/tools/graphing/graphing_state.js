/*globals Smartgraphs */

/** @class

  In this graph controller state, the user can "draw" shapes on the graph by plotting the points.

  @extends SC.State
  @version 0.1
*/
Smartgraphs.GRAPHING_TOOL = SC.State.extend(
/** @scope Smartgraphs.GRAPHING_TOOL.prototype */ {
  
  initialSubstate: 'OFF',

  OFF: SC.State.design({
    toolRoot: SC.outlet('parentState'),

    graphingToolStartTool: function (context, args) {
      var toolRoot = this.get('toolRoot');
      toolRoot.set('annotationName', args.annotationName);
      toolRoot.set('datadefName', args.datadefName);
      
      if (args.shape === 'singleLine') {
        toolRoot.set('shape', args.shape);
      }
      this.gotoState(this.getPath('parentState.ON'));
    }
  }),

  ON: SC.State.design({

    toolRoot: SC.outlet('parentState'),
    owner:    SC.outlet('statechart.owner'),

    initialSubstate: 'CHOOSE_SHAPE',

    enterState: function () {
      var graphingTool = Smartgraphs.graphingTool;

      var toolRoot = this.get('toolRoot'),
          annotationName = toolRoot.get('annotationName'),
          annotation = graphingTool.getAnnotation(annotationName),
          datadefName = toolRoot.get('datadefName'),
          datadef = graphingTool.getDatadef(datadefName);

      if (!annotation) {
        throw SC.Error.desc("Graphing tool was started with a bogus annotation name '%@'".fmt(annotationName));
      }
      if (!SC.kindOf(annotation, Smartgraphs.FreehandSketch)) {
        throw SC.Error.desc("Graphing tool was started with a non-FreehandSketch annotation name '%@'".fmt(annotationName));
      }
      if (!datadef) {
        throw SC.Error.desc("Graphing tool was started with a bogus datadef name '%@'".fmt(datadefName));
      }

      graphingTool.hideGraphTitle();
      graphingTool.graphingStarting(this);
      graphingTool.updateGraphLogicalBounds();

      toolRoot.set('annotation', annotation);
      toolRoot.set('datadef', datadef);
      graphingTool.appendSketch(this, annotation);
      graphingTool.appendRepresentation(this, datadef);
    },

    exitState: function () {
      this.get('owner').hideControls();
      
      var graphingTool = Smartgraphs.graphingTool;
      graphingTool.set('pointMovedNumber', null);
      graphingTool.set('pointMoved', false);
      graphingTool.graphingFinished(this);
      graphingTool.set('lineCount', 0);
      
      var toolRoot = this.get('toolRoot');
      toolRoot.set('annotation', null);
      toolRoot.set('annotationName', null);
      toolRoot.set('datadef', null);
      toolRoot.set('datadefName', null);
    },

    stopTool: function () {
      this.gotoState(this.getPath('toolRoot.OFF'));
    },

    CHOOSE_SHAPE: SC.State.design({
      toolRoot: SC.outlet('parentState.toolRoot'),

      enterState: function () {
        var shape = this.getPath('toolRoot.shape');

        if (shape === 'singleLine') {
          this.gotoState(this.getPath('parentState.SINGLE_LINE'));
        }
        else {
          throw SC.Error.desc("Graphing tool was started with unknown 'shape' argument '%@'".fmt(shape));
        }
      }
    }),

    // "SINGLE_LINE" option -- draw a single line from mousedown to mousedown

    SINGLE_LINE: SC.State.design({

      toolRoot: SC.outlet('parentState.toolRoot'),
      // Adding this variable to avoid indirect fetching of datadefPoints and annotationPoints.
      // Also adding two more values required while dragging.
      initialSubstate: 'START',

      START: SC.State.design({

        pointDraggedInfo: {
          datadef: null,
          annotation: null,
          initialPoint: null
        },

        toolRoot: SC.outlet('parentState.toolRoot'),
        owner:    SC.outlet('statechart.owner'),

        enterState: function () {
          this.get('owner').disableAllControls();
          Smartgraphs.graphingTool.showToolTip(true);
        },

        mouseMoveAtPoint: function (context, args) {
          var graphingTool = Smartgraphs.graphingTool;
          var radius = graphingTool.get('pointRadius');
          if (radius === null) {
            graphingTool.setPointRadius();
          }
          if (graphingTool.isPointOverlap(args)) {
            graphingTool.showToolTip(false);
          }
          else {
            var datadef = this.getPath('toolRoot.datadef');
            var datadefPoints = datadef.get("points");
            if (datadefPoints.length < 2) {
              graphingTool.showToolTip(true);
            }
            else {
              graphingTool.showToolTip(false);
            }
          }
        },

        mouseDownAtPoint: function (context, args) {
          var graphingTool = Smartgraphs.graphingTool;
          var datadef = this.getPath('toolRoot.datadef');
          var datadefPoints = datadef.get("points");
          if (datadefPoints.length < 2) {
            graphingTool.plotPoint({ x: args.x, y: args.y });
            if (datadefPoints.length >= 2) {
              graphingTool.drawLineThroughPoints(datadefPoints[0], datadefPoints[1], this);
              graphingTool.graphingFinished(this);
              graphingTool.showToolTip(false);
            }
          }
        },

        dataPointSelected: function (context, args) {
          var graphingTool = Smartgraphs.graphingTool;
          var datadef = this.getPath('toolRoot.datadef');
          if (!datadef) {
            return;
          }
          var datadefName = datadef.get('name'),
              rep = args.dataRepresentation;

          if (rep && rep.getPath('datadef.name') === datadefName) {
            var datadefPoints = datadef.get('points');
            var annotation = this.getPath('toolRoot.annotation');
            var annotationPoints = annotation.get('points');
            for (var i = 0 ; i < datadefPoints.length; i++) {
              if ((args.x === datadefPoints[i][0]) && (args.y === datadefPoints[i][1])) {
                graphingTool.set('pointMovedNumber', i);
                break;
              }
            }
            datadef.set('dragValueX', args.x);
            datadef.set('dragValueY', args.y);
            this.pointDraggedInfo.datadef = datadef;
            this.pointDraggedInfo.annotation = annotation;
            this.pointDraggedInfo.initialPoint = Smartgraphs.Point.create({x: args.x, y: args.y});
          }
        },

        dataPointDragged: function (context, args) {
          var graphingTool = Smartgraphs.graphingTool;
          if (graphingTool.isPointOverlap(args)) {
            graphingTool.showToolTip(false);
            return;
          }
          var info = this.pointDraggedInfo;
          var datadef = info.datadef;
          if (!datadef) {
            return;
          }
          var datadefName = datadef.get('name'),
              rep = args.dataRepresentation;

          if (rep && rep.getPath('datadef.name') === datadefName) {
            var datadefPoints = datadef.get('points');
            var annotation = info.annotation;
            var annotationPoints = annotation.get('points');
            var pointMovedNumber = graphingTool.get('pointMovedNumber');
            datadef.replacePoint(pointMovedNumber, args.x, args.y);
            datadef.set('dragValueX', args.x);
            datadef.set('dragValueY', args.y);
            if (datadefPoints.length >= 2) {
              var pointLogicalArray = graphingTool.getLineEndPointsArray(datadefPoints[0], datadefPoints[1]);
              annotationPoints.replace(0, 2, pointLogicalArray);
            }
          }
        },

        dataPointUp: function (context, args) {
          var graphingTool = Smartgraphs.graphingTool;
          var info = this.pointDraggedInfo;
          var datadef = info.datadef;
          if (!datadef) {
            return;
          }
          var datadefName = datadef.get('name'),
              rep = args.dataRepresentation;

          if (rep && rep.getPath('datadef.name') === datadefName) {
            var datadefPoints = info.datadef.get('points');
            var pointMovedNumber = graphingTool.get('pointMovedNumber');
            var datadefPoint = datadefPoints[pointMovedNumber];
            var selPoint = Smartgraphs.Point.create({x: datadefPoint[0], y: datadefPoint[1]});
            var initialPoint = info.initialPoint;
            if (initialPoint.xFixed() !== selPoint.xFixed() || initialPoint.yFixed() !== selPoint.yFixed()) {
              graphingTool.set('pointMoved', true);
            }
            graphingTool.set('pointMovedNumber', null);
            info.datadef.set("dragValueX", null);
            info.datadef.set("dragValueY", null);
          }
        }
      })
    })
  })
});
