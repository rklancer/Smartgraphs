// ==========================================================================
// Project:   Smartgraphs.DataPointView
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Smartgraphs RaphaelViews*/

/** @class

  (Document Your View Here)

  @extends SC.View
*/
Smartgraphs.DataPointView = RaphaelViews.RaphaelView.extend(
/** @scope Smartgraphs.DataPointView.prototype */ {
  
  displayProperties: 'content.x content.y isEnabled fill stroke radius'.w(),
  
  notSelectedFill: '#6AA7EF',
  notSelectedStroke: '#6AA7EF',
  selectedFill: '#F35B5E',
  selectedStroke: '#F35B5E',
  
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
    var ret = (this.get('isHovered') ? this.get('hoveredRadius') : this.get('notHoveredRadius'));
    console.log('returning radius %d', ret);
    return ret;
  }.property('isHovered', 'hoveredRadius', 'notHoveredRadius').cacheable(),
  
  mouseEntered: function () {
    console.log('mouseEntered');
    this.set('isHovered', YES);
  },
  
  mouseExited: function () {
    console.log('mouseExited');
    this.set('isHovered', NO);
  },
  
  renderCallback: function (raphaelCanvas, x, y, radius, fill, stroke) {
    console.log('creating point %d, %d', x, y);
    return raphaelCanvas.circle(x, y, radius).attr({ fill: fill, stroke: stroke });
  },
  
  render: function (context, firstTime) {
    console.log('rendering DataPointView');
    var fill = this.get('fill'),
        stroke = this.get('stroke'),
        radius = this.get('radius');
    
    // get the x and y values, and translate to our coordinate system
    var x = this.getPath('content.x'),
        y = this.getPath('content.y');
    var coords = this.getPath('parentView.graphView').coordinatesFor(x, y);
    
    if (firstTime) {
      context.callback(this, this.renderCallback, coords.x, coords.y, radius, fill, stroke);
    }
    else {
      var circle = context.raphael();
      circle.attr({ cx: coords.x, cy: coords.y, r: radius, fill: fill, stroke: stroke });
    }
  }

});