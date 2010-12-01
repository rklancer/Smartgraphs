// ==========================================================================
// Project:   Smartgraphs.ArrowView
// Copyright: ©2010 Concord Consortium
// @author    Parker Morse <pmorse@cantinaconsulting.com>
// ==========================================================================
/*globals Smartgraphs RaphaelViews */

/** @class

  Display view for the Arrow subclass of Smartgraphs.Annotation. Draws a stroke 
  between two points, with an arrowhead at the second end.
  
  @extends RaphaelViews.RaphaelView
*/
Smartgraphs.ArrowView = RaphaelViews.RaphaelView.extend(
/** @scope Smartgraphs.ArrowView.prototype */ {

  strokeBinding: '.item.color',
  strokeWidth: 2,
  strokeOpacity: 0.3,

  /**
    SproutCore will call render(context, firstTime == NO) if these properties change
  */
  displayProperties: 'point1 point2 label stroke strokeWidth strokeOpacity'.w(),
  
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

    var startCoords = graphView.coordinatesForPoint(annotation.get('point1').get('x'), annotation.get('point1').get('y'));
    var endCoords = graphView.coordinatesForPoint(annotation.get('point2').get('x'), annotation.get('point2').get('y'));

    var pathString = this.arrow_path(startCoords.x, startCoords.y, endCoords.x, endCoords.y, 10, 15);

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
    Returns a Raphael path string which draws an arrow. Parameters should be actual screen coordinates, not dataset coordinates.
    
    Original from Noah Paessel, https://gist.github.com/550233
    
    @params startx {Number} X-coordinate of the start point
    @params starty {Number} Y-coordinate of the start point
    @params endx {Number} X-coordinate of the end point
    @params endy {Number} Y-coordinate of the end point
    @params len {Number} Length of the "tip" of the arrowhead
    @params angle {Number} Angle in degrees between the line and each wing of the arrowhead. Should be less than 90.
  */
  arrow_path: function(startx,starty,endx,endy,len,angle) {    
    var theta = Math.atan2((endy-starty),(endx-startx));
    var baseAngleA = theta + angle * Math.PI/180;
    var baseAngleB = theta - angle * Math.PI/180;
    var tipX = endx;
    var tipY = endy;
    var baseAX = endx - len * Math.cos(baseAngleA);
    var baseAY = endy - len * Math.sin(baseAngleA);
    var baseBX = endx - len * Math.cos(baseAngleB);
    var baseBY = endy - len * Math.sin(baseAngleB);
    var pathData = " M " + startx  + " " + starty +
                   " L " + tipX      + " " + tipY +
                   " L " + baseAX  + " " + baseAY +
                   " L " + baseBX  + " " + baseBY +
                   " L " + tipX    + " " + tipY;
    return pathData;
  }

  
});
