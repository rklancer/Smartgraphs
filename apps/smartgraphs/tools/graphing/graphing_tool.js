/*globals Smartgraphs */

sc_require('tools/tool');

/** @class

  @extends Smartgraphs.Tool
*/
Smartgraphs.graphingTool = Smartgraphs.Tool.create(
/** @scope Smartgraphs.graphingTool.prototype */ {

  name: 'graphing',
  state: 'GRAPHING_TOOL',
  lineCount: 0,
  pointMovedNumber: null, // used this tool-variable for checking that which point from the data point is moved
  pointMoved: false, // this tool-variable used to check whether point is moved or not.
  annotationName: null,
  datadefName: null,
  requestedCursorStyle: 'default',
  graphLogicalBounds: {xmin: 0, xmax: 0, ymin: 0, ymax: 0},
  graphPane: null,
  pointRadius: null, // this tool-variable stores radius of point and used to check point overlap

  setup: function (args) {
    this.set('graphPane', args.pane);
    var graphController = this.graphControllerForPane(args.pane);
    var otherPane = this.otherPaneFor(args.pane);
    var tableController = this.tableControllerForPane(otherPane);
    tableController.setRoundingFunc('Fixed');
    graphController.graphingToolStartTool({ annotationName: args.annotationName, shape: args.shape, datadefName: args.data});
    this.set('annotationName', args.annotationName);
    this.set('datadefName', args.data);
    
    this.getAnnotation(args.annotationName).set("isOverlayAnnotation", true);
    var graphView = this.graphViewForPane(args.pane);
    graphView._updateAllViews();
  },

  appendSketch: function (state, sketch) {
    this.graphControllerForState(state).addAnnotation(sketch);
  },
  
  appendRepresentation: function (state, rep) {
    this.graphControllerForState(state).addDatadef(rep);
  },

  hideGraphTitle: function () {
    var graphView = this.graphViewForPane(this.get('graphPane'));
    graphView.get('titleView').set('isVisible', false);
  },

  showGraphTitle: function () {
    var graphView = this.graphViewForPane(this.get('graphPane'));
    graphView.get('titleView').set('isVisible', true);
  },

  graphingStarting: function (state) {
    var graphController = this.graphControllerForState(state);
    if (graphController && graphController.graphingToolGraphingStarting) {
      graphController.graphingToolGraphingStarting();
    }
  },

  graphingFinished: function (state) {
    var graphController = this.graphControllerForState(state);
    if (graphController && graphController.graphingToolGraphingFinished) {
      graphController.graphingToolGraphingFinished();
    }
  },

  graphViewForPane: function (pane) {
    return Smartgraphs.activityPage.getPath(Smartgraphs.activityViewController.firstOrSecondFor(pane) + 'GraphPane.graphView');
  },

  showToolTip: function (bShow) {
    var graphController = this.graphControllerForPane(this.get('graphPane'));
    graphController.set('toolTipVisibilityOverrideFromToolState', bShow);
  },

  coordinatesForPoint: function (x, y) {
    var graphView = this.graphViewForPane(this.get('graphPane'));
    return graphView.coordinatesForPoint(x, y);
  },

  updateGraphLogicalBounds: function () {
    var graphView = this.graphViewForPane(this.get('graphPane'));
    this.set('graphLogicalBounds', graphView.graphCanvasView._getLogicalBounds());
  },

  plotPoint: function (point) {
    if (!this.isPointOverlap(point)) {
      var datadef = this.getDatadef(this.get('datadefName'));
      datadef.addPoint(point.x, point.y);
    }
  },

  isPointOverlap: function (point) {
    var curPoint = this.coordinatesForPoint(point.x, point.y);
    var radius = this.getPointRadius();
    var datadef = this.getDatadef(this.get('datadefName'));
    var datadefPoints = datadef.get('points');
    var pointMovedNumber = this.get('pointMovedNumber');
    for (var i = 0; i < datadefPoints.length; i++) {
      if (i === pointMovedNumber) {
        continue;
      }
      var datadefPoint = this.coordinatesForPoint(datadefPoints[i][0], datadefPoints[i][1]);
      var distance = Math.sqrt(Math.pow(datadefPoint.x - curPoint.x, 2) +  Math.pow(datadefPoint.y - curPoint.y, 2));
      if (distance < radius + radius) {
        return true;
      }
    }
    return false;
  },

  getPointRadius: function () {
    var radius = this.get('pointRadius');
    if (radius === null) {
      this.setPointRadius();
      radius = this.get('pointRadius');
    }
    return radius;
  },

  setPointRadius: function () {
    var graphView = this.graphViewForPane(this.graphPane);
    var childViews = graphView.dataHolder.childViews;
    for (var i = 0; i < childViews.length; i++) {
      if (childViews[i].childViews.length > 0) {
        var radius = childViews[i].childViews[0].get("notHoveredRadius");
        this.set('pointRadius', radius);
        return;
      }
    }
  },

  drawLineThroughPoints: function (point1, point2) {
    if (point1[0] > point2[0]) {
      var point3 = point2;
      point2 = point1;
      point1 = point3;
    }
    var pointLogicalBoundsArr = this.getLineEndPointsArray(point1, point2);
    var annotation = this.getAnnotation(this.get('annotationName'));
    annotation.addPoint(pointLogicalBoundsArr[0][0], pointLogicalBoundsArr[0][1]);
    annotation.addPoint(pointLogicalBoundsArr[1][0], pointLogicalBoundsArr[1][1]);
    this.set('lineCount', this.get('lineCount') + 1);
  },

  getLinePointWithinLogicalBounds: function (point, m, c) {
    var x, y;
    var graphLogicalBounds = this.get('graphLogicalBounds');
    x = point[0];
    y = point[1];
    if (x < graphLogicalBounds.xMin) {
      x = graphLogicalBounds.xMin;
      y = m * x + c;
    } else if (x > graphLogicalBounds.xMax) {
      x = graphLogicalBounds.xMax;
      y = m * x + c;
    }
    if (y < graphLogicalBounds.yMin) {
      y = graphLogicalBounds.yMin;
      x = (y - c) / m;
    } else if (y > graphLogicalBounds.yMax) {
      y = graphLogicalBounds.yMax;
      x = (y - c) / m;
    }
    return [x, y];
  },

  getLineEndPointsArray: function (point1, point2) {
    var graphLogicalBounds, m, c, x1, y1, x2, y2;
    graphLogicalBounds = this.get('graphLogicalBounds');
    if (point2[0] === point1[0]) {
      x1 = point1[0];
      y1 = graphLogicalBounds.yMin;
      x2 = x1;
      y2 = graphLogicalBounds.yMax;
      
      return [[x1, y1], [x2, y2]];
    }
    
    m = (point2[1] - point1[1]) / (point2[0] - point1[0]);
    c = point2[1] - m * point2[0];
    
    if (m === 0) {
      x1 = graphLogicalBounds.xMin;
      y1 = point1[1];
      x2 = graphLogicalBounds.xMax;
      y2 = y1;
      
      return [[x1, y1], [x2, y2]];
    }
    
    var pointArr;
    
    x1 = graphLogicalBounds.xMin;
    y1 = m * x1 + c;
    pointArr = this.getLinePointWithinLogicalBounds([x1, y1], m, c);
    x1 = pointArr[0];
    y1 = pointArr[1];
    
    y2 = m > 0 ? graphLogicalBounds.yMax : graphLogicalBounds.yMin;
    x2 = (y2 - c) / m;
    pointArr = this.getLinePointWithinLogicalBounds([x2, y2], m, c);
    x2 = pointArr[0];
    y2 = pointArr[1];
    
    return [[x1, y1], [x2, y2]];
  }
});
