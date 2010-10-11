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
/** @scope Smartgraphs.LineToAxisView.prototype */
{

  // TODO: update these defaults (and also displayProperties)
  radius: 8,
  defaultStroke: '#aa0000',
  defaultStrokeWidth: 2,
  defaultStrokeOpacity: 0.7,
  fill: '#ffffff',
  fillOpacity: 0,
  defaultLeftPadding: 40,

  /**
   SC will call render(context, firstTime) if these properties change
   even if it is not onscreen and not in the DOM (this will change
   later in the SC framework)
   */
  displayProperties: 'item.point.x item.point.y'.w(),

  /**
   We are using renderCallback in views to call non-SC render methods like
   RaphaelCanvas.path (which we use to draw a Raphael line) with the correct attributes.
   This is done this way because Raphael methods shouldn't be called unless
   its tags are already in the DOM.
   */
  renderCallback: function(raphaelCanvas, attrs) {
    console.log("renderCallback called with raphaelCanvas:", raphaelCanvas);
    console.log("                               and attrs:", attrs);
    var linePath;
    if (attrs.shouldHideLinePath) {
      console.log("attrs.shouldHideLinePath:", attrs.shouldHideLinePath);
      linePath = raphaelCanvas.path("M 0 0 L 0 0");
      console.log("hiding linePath:", linePath);
      linePath.hide();
    } else {
      var linePathString = 'M ' + attrs.x + ' ' + attrs.y + ' L ' + attrs.left + ' ' + attrs.y;
      console.log("linePathString:", linePathString);
      linePath = raphaelCanvas.path(linePathString);
    }
    linePath.attr({
      'stroke-width': this.defaultStrokeWidth,
      'stroke': this.defaultStroke,
      'stroke-opacity': this.defaultStrokeOpacity
    }); //.toBack();
    console.log("renderCallback returning linePath:", linePath);
    return linePath;
  },

  /**
   Called by SC (by the parent view)
   */
  render: function(context, firstTime) {
    var graphView = this.getPath('parentView.parentView');
    var annotation = this.get('item');

    /** Collect Raphael attributes for the linePath into attrs */
    var attrs;
    // TODO: Handle points not in the 1st quadrant and handle lines to the x-axis
    var startingPoint = annotation.get('point');
    if (startingPoint) {
      var linePathStartingCoords = graphView.coordinatesForPoint(startingPoint.get('x'), startingPoint.get('y'));
      if (linePathStartingCoords) {
        var linePathEndingCoords = graphView.coordinatesForPoint(0, startingPoint.get('y'));
        console.log("linePathEndingCoords:", linePathEndingCoords);
        var linePathEndingXCoord = linePathEndingCoords ? linePathEndingCoords.x: this.defaultLeftPadding;
        console.log("linePathEndingXCoord:", linePathEndingXCoord);
        attrs = {
          x: linePathStartingCoords.x,
          y: linePathStartingCoords.y,
          left: linePathEndingXCoord
        };
      }
    }
    if (!attrs) {
      // There was some error in getting the needed coordinates
      // Render a hidden linePath so the object can reused if this render method is called again
      attrs = {
        shouldHideLinePath: YES
      };
    }

    /**
     boolean firstTime: Does this view start from scratch and created HTML
     in a context object
     or does it just needs to update properties of a context object?
     */
    if (firstTime) {
      /**
       Create the linePath in Raphael
       context is not a SC object but SC expects it (it was created by SC.Pane.append() )
       This call creates a tag and CSS and stores it in the context.
       for rendering later (by by SC.Pane.append() using innerHTML() )
       */
      context.callback(this, this.renderCallback, attrs);
    }
    else {
      /** Get the linePath from Raphael */
      var linePath = context.raphael();
      /**
       Calling toBack() on the updated linePath puts the linePath earliest in the
       SVG DOM and thus in the back layer on the HTML page
       */
      linePath.attr(attrs); //.toBack();
    }
  }

});
