// ==========================================================================
// Project:   Smartgraphs.HighlightedSegmentView
// Copyright: ©2010 Concord Consortium
// Author:   Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs RaphaelViews */

/** @class

  // TODO (Document Your View Here)

  @extends SC.View
*/

Smartgraphs.HighlightedSegmentView = RaphaelViews.RaphaelView.extend(
/** @scope Smartgraphs.HighlightedSegmentView.prototype */
{
  canShowInTable: NO,
  
  strokeBinding: '.item.color',
  strokeWidth: 14,
  strokeOpacity: 0.1,
  
  // SC will call render(context, firstTime == NO) if these properties change
  displayProperties: 'points.[] stroke strokeWidth strokeOpacity'.w(),

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
    
    var points = annotation.get('points');
    var coords, point;
    var pathComponents = [];
    
    for (var i = 0, len = points.get('length'); i < len; i++) {
      pathComponents.push( i === 0 ? 'M' : 'L');
      point = points.objectAt(i);
      coords = graphView.coordinatesForPoint(point.get('x'), point.get('y'));
      pathComponents.push(coords.x);
      pathComponents.push(coords.y);
    }
    var pathString = pathComponents.join(' ');

    var attrs = {
      d: pathString,
      stroke: this.get('stroke'),
      'stroke-width': this.get('strokeWidth'),
      'stroke-opacity': this.get('strokeOpacity'),
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round'
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
