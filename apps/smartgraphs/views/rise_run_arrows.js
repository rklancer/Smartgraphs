// ==========================================================================
// Project:   Smartgraphs.RiseRunArrowsView
// Copyright: ©2010 Concord Consortium
// @author    Parker Morse <pmorse@cantinaconsulting.com>
// ==========================================================================
/*globals Smartgraphs RaphaelViews */

/** @class

  Display view for the RiseRunArrows annotation model, which represents two arrows
  completing a right triangle (where the two points on the graph represent the 
  hypotenuse). The horizontal thus represents the "run" and the vertical the "rise"
  making up the two components of the graph's slope.

  @extends RaphaelViews.RaphaelView
*/
Smartgraphs.RiseRunArrowsView = RaphaelViews.RaphaelView.extend(
/** @scope Smartgraphs.RiseRunArrowsView.prototype */ {

  strokeWidth: 2,
  strokeOpacity: 0.3,
  strokeRiseBinding: '.item.riseColor',
  strokeRunBinding: '.item.runColor',

  /**
    SproutCore will call render(context, firstTime == NO) if these properties change
  */
  displayProperties: 'point1 point2 vertex strokeRise strokeRun strokeWidth strokeOpacity'.w(),
  
  /**
    We are using renderCallback in views to call non-SC render methods like
    RaphaelCanvas.segmentPath with the correct attributes.
    This is done this way because Raphael methods shouldn't be called unless
    its tags are already in the DOM.
  */
  renderCallback: function(raphaelCanvas, attrs) {
    var path = raphaelCanvas.path(attrs.d).attr(attrs);
    return path;
  },

  // Called by SC (by the parent view)
  render: function(context, firstTime) {
    var graphView = this.get('graphView');
    var annotation = this.get('item');

    var point1 = annotation.get('point1');
    var point2 = annotation.get('point2');
    var vertex = annotation.get('vertex');

    var points = [point1, vertex, point2];

    var coords, point;
    var pathComponents = [];

    for (var i = 0, len = points.length; i < len; i++) {
      pathComponents.push( i === 0 ? 'M' : 'L');
      point = points[i];
      coords = graphView.coordinatesForPoint(point.get('x'), point.get('y'));
      pathComponents.push(coords.x);
      pathComponents.push(coords.y);
    }
    var pathString = pathComponents.join(' ');
    
    // FIXME: This basically draws one path with a corner. It could easily be adapted to arrowheads but it can't do
    // two colors, which means it's not what we need here. Rather, we need to draw two arrows, and they each need
    // their own label.
    var attrs = {
      d: pathString,
      stroke: this.get('strokeRise'),
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
  }
});
