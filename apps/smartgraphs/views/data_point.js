// ==========================================================================
// Project:   Smartgraphs.DataPointView
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs RaphaelViews*/

/** @class

  (Document Your View Here)

  @extends SC.View
*/
Smartgraphs.DataPointView = RaphaelViews.RaphaelView.extend(
/** @scope Smartgraphs.DataPointView.prototype */ {
  
  displayProperties: 'content.x content.y isEnabled fill stroke radius'.w(),
  
  //graphViewBinding: '*parentView.graphView',
  
  // TODO should inherit these colors (and possibly other properties) from parent view
  notSelectedFill: '#1F77B4',
  notSelectedStroke: '#1F77B4',
  selectedFill: '#FF7F0E',
  selectedStroke: '#FF7F0E',
  
  hoveredRadius: 5,
  notHoveredRadius: 3,
  isEnabled: YES,
  isHovered: NO,
  isSelected: NO,

  // required by CollectionFastPath
  layerIsCacheable: YES,
  isPoolable: YES,
  
  fill: function () {
    return (this.get('isSelected') ? this.get('selectedFill') : this.get('notSelectedFill'));
  }.property('isSelected', 'selectedFill', 'notSelectedFill').cacheable(),
  
  stroke: function () {
    return (this.get('isSelected') ? this.get('selectedStroke') : this.get('notSelectedStroke'));
  }.property('isSelected', 'selectedStroke', 'notSelectedStroke').cacheable(),
  
  radius: function () {
    return (this.get('isHovered') ? this.get('hoveredRadius') : this.get('notHoveredRadius'));
  }.property('isHovered', 'hoveredRadius', 'notHoveredRadius').cacheable(),
  
  mouseEntered: function () {
    this.set('isHovered', YES);
  },
  
  mouseExited: function () {
    this.set('isHovered', NO);
  },
  
  renderCallback: function (raphaelCanvas, x, y, radius, fill, stroke) {
    return raphaelCanvas.circle(x, y, radius).attr({ fill: fill, stroke: stroke });
  },
  
  render: function (context, firstTime) {
    var fill = this.get('fill'),
        stroke = this.get('stroke'),
        radius = this.get('radius');
    
    // get the x and y values, and translate to our coordinate system
    var x = this.getPath('content.x'),
        y = this.getPath('content.y');
    var coords = this.getPath('parentView.graphView').coordinatesForPoint(x, y);
    
    if (firstTime) {
      context.callback(this, this.renderCallback, coords.x, coords.y, radius, fill, stroke);
    }
    else {
      var circle = context.raphael();
      circle.attr({ cx: coords.x, cy: coords.y, r: radius, fill: fill, stroke: stroke });
    }
  }

});