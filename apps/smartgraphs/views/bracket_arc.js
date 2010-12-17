// ==========================================================================
// Project:   Smartgraphs.BracketArcView
// Copyright: ©2010 Concord Consortium
// @author    Parker Morse <pmorse@cantinaconsulting.com>
// ==========================================================================
/*globals Smartgraphs RaphaelViews */

sc_require('mixins/arrow_drawing');

/** @class

  (Document Your View Here)

  @extends RaphaelViews.RaphaelView
*/
Smartgraphs.BracketArcView = RaphaelViews.RaphaelView.extend( Smartgraphs.ArrowDrawing,
/** @scope Smartgraphs.BracketArcView.prototype */ {

  canShowInTable: YES,
  
  strokeBinding: '.item.color',
  isHighlightedBinding: '.item.isHighlighted',
  
  strokeWidth: function () {
    return this.get('isHighlighted') ? 3 : 2;
  }.property('isHighlighted'),
  
  strokeOpacity: function () {
    return this.get('isHighlighted') ? 0.9 : 0.5;
  }.property('isHighlighted'),

  /**
    SproutCore will call render(context, firstTime == NO) if these properties change
  */
  displayProperties: 'point1 point2 label stroke isHighlighted strokeWidth strokeOpacity'.w(),
  
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
    // var graphView = this.get('graphView');
    var annotation = this.get('item');
    var start = { 'x': annotation.get('startX'), 'y': annotation.get('startY') };
    var end = { 'x': annotation.get('endX'), 'y': annotation.get('endY') };
    
    // Figure out the pathString
    var pathString = "M " + start.x + " " + start.y + 
                     "C " + (start.x - 40) + " " + start.y +  
                     " " + (end.x - 40) + " " + end.y + 
                     " " + end.x + " " + end.y;
    // TODO: Needs arrowheads. 
    
    // TODO: Currently this assumes that the arc is vertical and the available width is ~40 pixels. Ultimately it's possible to 
    // use a height param to let the arc grow arbitrarily away from the line described by the two points, not to mention
    // specify which side of the line the arc should be on. To figure out that "control point" we would need to figure out
    // the absolute angle of the line perpendicular from the line described by the two points, then find a point {height}
    // pixels away from the endpoint in that direction. Which should be possible with a little math.
    
    // N.B. maybe this is the place to use that SVG feature which rotates the frame of reference temporarily?
    
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
  }
});
