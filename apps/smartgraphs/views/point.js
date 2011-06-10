// ==========================================================================
// Project:   Smartgraphs.PointView
// Copyright: ©2010 Concord Consortium
// Author:    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs RaphaelViews*/

/** @class

  (Document Your View Here)

  @extends SC.View
*/

Smartgraphs.PointView = RaphaelViews.RaphaelView.extend( 
/** @scope Smartgraphs.PointView.prototype */ {
  
  displayProperties: 'content.x content.y isEnabled fill stroke radius'.w(),
  
  controllerPath: 'parentView.graphView.graphController',
  controller: SC.outlet('parentView.graphView.graphController'),

  dataRepresentation: SC.outlet('parentView.dataRepresentation'),
  datadefName: SC.outlet('dataRepresentation.datadef.name'),
  
  datasetColorBinding: '.parentView.color',
  overrideColor: null,
  
  color: function () {
    return this.get('overrideColor') || this.get('datasetColor');
  }.property('overrideColor', 'datasetColor'),
  
  modifiersBinding: '.controller.modifiers',
  modifiersBindingDefault: SC.Binding.oneWay(),
    
  notSelectedFillBinding: '.color',
  notSelectedStrokeBinding: '.color',
  selectedFill: '#aa0000',
  selectedStroke: '#aa0000',
  
  hoveredRadius: 4,
  notHoveredRadius: 2,
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
  
  modifiersDidChange: function () {    
    var modifiers = this.get('modifiers') || {},
        x = this.getPath('content.x'),
        y = this.getPath('content.y'),
        datadefName = this.get('datadefName'),
        color;
        
    if (modifiers[[x, y, datadefName]]) {
      this.set('overrideColor', modifiers[[x, y, datadefName]].get('color'));
    }
    else {
      this.set('overrideColor', null);
    }
  }.observes('modifiers'),

  mouseEntered: function () {
    this.set('isHovered', YES);
  },
  
  mouseExited: function () {
    this.set('isHovered', NO);
  },
  
  mouseDown: function () {
    this.get('controller').dataPointSelected(this.get('dataRepresentation'), this.getPath('content.x'), this.getPath('content.y'));
    // 'tee' the dataPointSelected event, but don't consider the mouseDown handled; let the parent collection view
    // also handle it
    return NO;
  },
  
  renderCallback: function (raphaelCanvas, x, y, radius, fill, stroke) {
    return raphaelCanvas.circle(x, y, radius).attr({ fill: fill, stroke: stroke });
  },
  
  render: function (context, firstTime) {
    var graphView = this.getPath('parentView.graphView');
    if (!graphView) {
      // apparently render may have been called after we were removed from our old parent. Redraw after add to new parent.
      this.displayDidChange();
      return;
    }
    
    var fill = this.get('fill'),
        stroke = this.get('stroke'),
        radius = this.get('radius');
    
    // get the x and y values, and translate to our coordinate system
    var x = this.getPath('content.x'),
        y = this.getPath('content.y');

    var coords = graphView.coordinatesForPoint(x, y);
    
    if (firstTime) {
      context.callback(this, this.renderCallback, coords.x, coords.y, radius, fill, stroke);
    }
    else {
      var circle = context.raphael();
      circle.attr({ cx: coords.x, cy: coords.y, r: radius, fill: fill, stroke: stroke });
    }
  }
  
});