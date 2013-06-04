// ==========================================================================
// Project:   Smartgraphs.LineThroughPointsView
// Copyright: ©2010 Concord Consortium
// Author:    Parker Morse <pmorse@cantinaconsulting.com>
// ==========================================================================
/*globals Smartgraphs RaphaelViews */

/** @class

  Display view for the LineThroughPoints annotation model, which represents a line
  running through two defined points and extending to the edges of the graph.

  @extends RaphaelViews.RaphaelView
*/

Smartgraphs.LineThroughPointsView = RaphaelViews.RaphaelView.extend(
/** @scope Smartgraphs.LineThroughPointsView.prototype */ {

  canShowInTable: NO,

  strokeBinding: '.item.color',
  strokeWidth: 2,
  strokeOpacity: 0.7,

  // SC will call render(context, firstTime == NO) if these properties change
  displayProperties: 'x1 y1 x2 y2 stroke strokeWidth strokeOpacity'.w(),

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
    var graphView  = this.get('graphView'),
        annotation = this.get('item'),
        x1         = annotation.get('x1'),
        y1         = annotation.get('y1'),
        x2         = annotation.get('x2'),
        y2         = annotation.get('y2'),
        xAxis      = graphView.get('xAxis'),
        yAxis      = graphView.get('yAxis'),
        points     = this.getEndPoints(x1, y1, x2, y2, xAxis, yAxis),
        i,
        coords,
        point,
        pathComponents = [],
        pathString,
        attrs,
        raphaelPath;

    for (i = 0; i < points.length; i++) {
      pathComponents.push( i === 0 ? 'M' : 'L');
      point = points[i];
      coords = graphView.coordinatesForPoint(point.x, point.y);
      pathComponents.push(coords.x);
      pathComponents.push(coords.y);
    }
    pathString = pathComponents.join(' ');

    attrs = {
      'd':              pathString,
      'stroke':         this.get('stroke'),
      'stroke-width':   this.get('strokeWidth'),
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
      raphaelPath = context.raphael();
      // and update it
      raphaelPath.attr(attrs);
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
  _y: function (x, m, b) {
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
  _x: function (y, m, b) {
    if (m === 0) { // If the slope is 0, line is horizontal. We don't want to try division by 0.
      return b;
    } else {
      return (y - b)/m;
    }
  },

  /**
    Find the end points of a line segment through point1 and point2 that is bounded by the xMin, xMax, yMin, yMax of
    the axes
  */
  getEndPoints: function (x1, y1, x2, y2, xAxis, yAxis) {
    var xMax = xAxis.get('max');
    var xMin = xAxis.get('min');
    var yMax = yAxis.get('max');
    var yMin = yAxis.get('min');

    var points = [];

    // case 1: vertical line
    if (x1 === x2) {
      points.push( {x: x1, y: yMin} );
      points.push( {x: x1, y: yMax} );

      return points;
    }

    // Use y = mx + b
    var m = (y2-y1)/(x2-x1);
    // => b = y - mx
    var b = y2 - (m * x2);

    // case 2: leftmost point is on the bottom border
    if (this._y(xMin, m, b) < yMin) {
      // start point is on bottom border
      points.push({ 'y': yMin, 'x': this._x(yMin, m, b) });
      if (this._y(xMax, m, b) > yMax) {
        // end point is on top border
        points.push({ 'y': yMax, 'x': this._x(yMax, m, b) });
      } else {
        // end point is on right border
        points.push({ 'x': xMax, 'y': this._y(xMax, m, b) });
      } // Because we started at the bottom and are going left/right, end point can't be on left

      return points;
    }

    // case 3: leftmost point is on the left border
    if ((yMin <= this._y(xMin, m, b)) && (this._y(xMin, m, b) <= yMax)) {
      points.push( { 'x': xMin, 'y': this._y(xMin, m, b) });
      if (this._y(xMax, m, b) < yMin) {
        // end point on bottom border
        points.push( { 'y': yMin, 'x': this._x(yMin, m, b) });
      } else if (this._y(xMax, m, b) <= yMax) {
        // end point on right border
        points.push( { 'x': xMax, 'y': this._y(xMax, m, b) });
      } else {
        // end point is on top border
        points.push({ 'y': yMax, 'x': this._x(yMax, m, b) });
      }

      return points;
    }

    // case 4: leftmost point is on the top border
    if (yMax < this._y(xMin, m, b)) {
      points.push({ 'y': yMax, 'x': this._x(yMax, m, b) });
      if (this._y(xMax, m, b) < yMin) {
        // end point is on bottom border
        points.push({ 'y': yMin, 'x': this._x(yMin, m, b) });
      } else {
        // end point is on right border
        points.push({ 'x': xMax, 'y': this._y(xMax, m, b) });
      } // Because we started at the top and are going left/right, end point can't be on left

      return points;
    }

    // oops
    return null;
  }

});
