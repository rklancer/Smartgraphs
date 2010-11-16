// ==========================================================================
// Project:   Smartgraphs.LineThroughPointsView
// Copyright: ©2010 Concord Consortium
// @author    Parker Morse <pmorse@cantinaconsulting.com>
// ==========================================================================
/*globals Smartgraphs RaphaelViews */

/** @class

  Display view for the LineThroughPoints annotation model, which represents a line
  running through two defined points and extending to the edges of the graph.
  
  There may be unpredictable results if the two points define a vertical line
  (that is, there is not a real function defining the line).
  
  @extends RaphaelViews.RaphaelView
*/

Smartgraphs.LineThroughPointsView = RaphaelViews.RaphaelView.extend(
/** @scope Smartgraphs.LineThroughPointsView.prototype */ {

  stroke: '#aa0000',
  strokeWidth: 4,
  strokeOpacity: 0.1,

  // SC will call render(context, firstTime == NO) if these properties change
  displayProperties: 'point1 point2 stroke strokeWidth strokeOpacity'.w(),

  // We are using renderCallback in views to call non-SC render methods like
  // RaphaelCanvas.segmentPath with the correct attributes.
  // This is done this way because Raphael methods shouldn't be called unless
  // its tags are already in the DOM.

  renderCallback: function(raphaelCanvas, attrs) {
    var path = raphaelCanvas.path(attrs.d).attr(attrs);
    return path;
  },

  // Called by SC (by the parent view)
  render: function(context, firstTime) {
    var graphView = this.get('graphView');
    var annotation = this.get('item');
    var xMax = graphView.axes.get('xMax');
    var xMin = graphView.axes.get('xMin');
    var yMax = graphView.axes.get('yMax');
    var yMin = graphView.axes.get('yMin');

    var point1 = annotation.get('point1');
    var point2 = annotation.get('point2');
    var points = [];
    
    // Find border "endpoints" of the segment to be drawn, in conceptual form
    var m, b;
    // y = mx + b
    m = (point2.get('y')-point1.get('y'))/(point2.get('x')-point1.get('x'));
    // y - mx = b
    b = point2.get('y') - (m * point2.get('x'));
    // x = (y - b)/m

    if (this._getXFromY(xMin, m, b) < yMin) {
      // start point is on bottom border
      points.push({ 'y': yMin, 'x': this._getXFromY(yMin, m, b) });
      if (this._getYFromX(xMin, m, b) > yMax) {
        // end point is on top border
        points.push({ 'y': yMax, 'x': this._getXFromY(yMax, m, b) });
      } else {
        // end point is on right border
        points.push({ 'x': xMax, 'y': this._getYFromX(xMax, m, b) });
      } // Because we started at the bottom and are going left/right, end point can't be on left
    } else if (yMin <= this._getXFromY(xMin, m, b) <= yMax) {
      // start point on left border
      points.push( { 'x': xMin, 'y': this._getYFromX(xMin, m, b) });
      if (this._getYFromX(xMax, m, b) < yMin) {
        // end point on bottom border
        points.push( { 'y': yMin, 'x': this._getXFromY(yMin, m, b) });
      } else if (yMin < this._getYFromX(xMax, m, b) < yMax) {
        // end point on right border
        points.push( { 'x': xMax, 'y': this._getYFromX(xMax, m, b) });
      } else {
        // end point is on top border
        points.push({ 'y': yMax, 'x': this._getXFromY(yMax, m, b) });
      }
    } else if (yMax < this._getXFromY(xMin, m, b)) {
      // start point on top border
      points.push({ 'y': yMax, 'x': this._getXFromY(yMax, m, b) });
      if ((m * xMax + b) < yMin) {
        // end point is on bottom border
        points.push({ 'y': yMin, 'x': this._getXFromY(yMin, m, b) });
      } else {
        // end point is on right border
        points.push({ 'x': xMax, 'y': this._getYFromX(xMax, m, b) });
      } // Because we started at the top and are going left/right, end point can't be on left
    }
    
    var coords, point;
    var pathComponents = [];

    for (var i = 0, len = points.length; i < len; i++) {
      pathComponents.push( i === 0 ? 'M' : 'L');
      point = points[i];
      coords = graphView.coordinatesForPoint(point.x, point.y);
      pathComponents.push(coords.x);
      pathComponents.push(coords.y);
    }
    var pathString = pathComponents.join(' ');

    var attrs = {
      d: pathString,
      stroke: this.get('stroke'),
      'stroke-width': this.get('strokeWidth'),
      'stroke-opacity': this.get('strokeOpacity')
    };

    // boolean firstTime: Does this view start from scratch and create HTML in a context object or does it just need
    // to update properties of a context object?

    if (firstTime) {
       // Queue up the callback with will create the Raphael path object on the SVG canvas, once it is created.
       // In non-Raphael views, context is not a SC object but SC expects it (it was created by SC.Pane.append() ) This
       // call creates a tag and CSS and stores it in the context. for rendering later (by by SC.Pane.append() using
       // innerHTML()
      context.callback(this, this.renderCallback, attrs);
    }
    else {
      // get the Raphael path object from the context
      var path = context.raphael();
      // and update it
      path.attr(attrs);
    }
  },
  
  /**
   * Find the y coordinate of a line at point x, given x and the slope-intercept numbers (m and b).
   * 
   * @private
   * 
   * @param {Numeric} x The x coordinate
   * @param {Numeric} m The line's slope
   * @param {Numeric} b The line's y-intercept
   *
   */
  _getYFromX: function (x, m, b) {
    return (m * x) + b;
  },
  
  /**
   * Find the x coordinate of a line at point y, given y and the slope-intercept numbers (m and b).
   * 
   * @private
   * 
   * @param {Numeric} y The y coordinate
   * @param {Numeric} m The line's slope
   * @param {Numeric} b The line's y-intercept
   *
   */
  _getXFromY: function (y, m, b) {
    if (m === 0) { // If the slope is 0, line is horizontal. We don't want to try division by 0.
      return b;
    } else {
      return (y - b)/m;
    }
  }

});
