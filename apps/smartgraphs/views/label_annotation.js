// ==========================================================================
// Project:   Smartgraphs.LabelAnnotationView
// Copyright: ©2011 Concord Consortium
// @author    Parker Morse <pmorse@cantinaconsulting.com>
// ==========================================================================
/*globals Smartgraphs RaphaelViews */

/** @class

  (Document Your View Here)

  @extends SC.View
*/
Smartgraphs.LabelAnnotationView = RaphaelViews.RaphaelView.extend(
/** @scope Smartgraphs.LabelAnnotationView.prototype */ {

  canShowInTable: NO, // TODO: Maybe eventually yes?
  
  strokeBinding: '.item.color',
  isHighlightedBinding: '.item.isHighlighted',
  // labelBinding: '.item.label', // Frustratingly, this doesn't work.
  
  strokeWidth: function () {
    return this.get('isHighlighted') ? 2 : 1;
  }.property('isHighlighted'),
  
  strokeOpacity: function () {
    return this.get('isHighlighted') ? 1.0 : 0.8;
  }.property('isHighlighted'),

  /**
    SproutCore will call render(context, firstTime == NO) if these properties change
  */
  displayProperties: 'point label stroke size isHighlighted strokeWidth strokeOpacity'.w(),
  
  /**
    We are using renderCallback in views to call non-SC render methods like
    RaphaelCanvas.segmentPath with the correct attributes.
    This is done this way because Raphael methods shouldn't be called unless
    its tags are already in the DOM.
  */
  renderCallback: function(raphaelCanvas, attrs) {
    var label = raphaelCanvas.text(attrs.labelX, attrs.labelY, attrs.label).attr({'font-size': attrs.size});
    return label;
  },

  // Called by SC (by the parent view)
  render: function(context, firstTime) {
    var graphView = this.get('graphView');
    var label = this.get('item').get('label');
    var point = this.get('item').get('point');
    var size = this.get('item').get('size');
    
    var labelCoords = graphView.coordinatesForPoint(point.get('x'), point.get('y') + 0.5);

    var attrs = {
      'label': label,
      'labelX': labelCoords.x,
      'labelY': labelCoords.y,
      'size': size
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
