// ==========================================================================
// Project:   Smartgraphs.LineToAxisView
// Copyright: ©2010 Concord Consortium
// @author:   Dr. Baba Kofi Weusijana <kofi@edutek.net>
// ==========================================================================
/*globals Smartgraphs RaphaelViews */

/** @class

  // TODO (Document Your View Here)

  @extends RaphaelViews.RaphaelView
*/

Smartgraphs.LineToAxisView = RaphaelViews.RaphaelView.extend(
/** @scope Smartgraphs.LineToAxisView.prototype */ {

  // TODO: update these defaults (and also displayProperties)
  radius: 8,
  stroke: '#cc0000',
  strokeWidth: 2,
  strokeOpacity: 1.0,
  fill: '#ffffff',
  fillOpacity: 0,

  /**
   SC will call render(context, firstTime) if these properties change
   even if it is not onscreen and not in the DOM (this will change
   later in the SC framework)
   */
  displayProperties: 'item.point.x item.point.y'.w(),

  /**
   We are using renderCallback in views to call non-SC render methods like
   RaphaelCanvas.path (a line) with the correct attributes.
   This is done this way because Raphael methods shouldn't be called unless
   its tags are already in the DOM.
   */
  renderCallback: function (raphaelCanvas, attrs) {
    console.log("renderCallback called with raphaelCanvas:", raphaelCanvas);
    console.log("                               and attrs:", attrs);
    //return raphaelCanvas.circle(attrs.x, attrs.y, attrs.r).attr(attrs);//.toBack();
    var pathString = 'M ' + attrs.x + ' ' + attrs.y + ' L ' + attrs.left + ' ' + attrs.y;
    console.log("pathString:", pathString);
    var path = raphaelCanvas.path(pathString).attr({
      'stroke-width': 2,
      'stroke': '#aa0000',
      'stroke-opacity': 0.7
    });//.toBack();
    console.log("renderCallback returning path:", path);
    return path;
  },

  /**
   Called by SC (by the parent view)
   */
  render: function (context, firstTime) {
    var graphView = this.getPath('parentView.parentView');
    var annotation = this.get('item');
    
    var point = annotation.get('point');
    var x = point ? point.get('x') : 0;
    var y = point ? point.get('y') : 0;
    var coords = graphView.coordinatesForPoint(x, y);
    console.log("coords:",coords);

    /** Raphael attributes for a circle */
    // TODO: Compute the left attribute from the axis padding
    var attrs = {
      x: coords.x,
      y: coords.y,
      left: x - 1
    };

    /**
     boolean firstTime: Does this view start from scratch and created HTML
     in a context object
     or does it just needs to update properties of a context object?
     */
    console.log("firstTime:",firstTime);
    if (firstTime) {
      /**
       Create the line(path) in Raphael
       context is not a SC object but SC expects it (it was created by SC.Pane.append() )
       This call creates a tag and CSS and stores it in the context.
       for rendering later (by by SC.Pane.append() using innerHTML() )
       */
      console.log("Creating the line(path) in Raphael");
      context.callback(this, this.renderCallback, attrs);
    }
    else {
      /** Get the line(path) from Raphael */
      console.log("Getting the line(path) from Raphael");
      var path = context.raphael();
      console.log("path:",path);
      /**
       Calling toBack() on the updated circle puts the circle earliest in the
       SVG DOM and thus in the back layer on the HTML page
       */
      path.attr(attrs);//.toBack();
      console.log("updated path:",path);
    }
  }
  
});
