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
  
  // TODO should inherit these colors (and possibly other properties) from parent view
  datasetColorBinding: '.parentView.color',
  color: function () {
    return this.get('overrideColor') || this.get('datasetColor');
  }.property('overrideColor', 'datasetColor'),
    
  notSelectedFillBinding: '.color',
  notSelectedStrokeBinding: '.color',
  selectedFill: '#aa0000',
  selectedStroke: '#aa0000',
  
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
  
  init: function () {
    sc_super();
    this._baseValues = {};
    this.contentDidChange();
  },
  
  mouseEntered: function () {
    this.set('isHovered', YES);
  },
  
  mouseExited: function () {
    this.set('isHovered', NO);
  },
  
  mouseDown: function () {
    Smartgraphs.statechart.sendAction('dataPointSelected', this, null);
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
  },
  
  contentDidChange: function () {
    var newContent = this.get('content');
    var oldContent = this._oldContent;
    this._oldContent = newContent;

    var queues = this.getPath('parentView.graphView.graphController.overrideQueuesByTarget');
        
    if (oldContent) {
      queues[SC.guidFor(oldContent)].removeObserver('[]', this, this._overridePropertyDidChange);
    }

    var targetGuid = SC.guidFor(newContent);
    if (!queues[targetGuid]) queues[targetGuid] = [];
    
    queues[targetGuid].addObserver('[]', this, this._overridePropertyDidChange);
  }.observes('content'),
  
  _overridePropertyDidChange: function (queue) {
    queue.beginPropertyChanges();
    var self = this;
    queue.forEach( function (change) {
      if (self._baseValues[change.property] === undefined) {
        self._baseValues[change.property] = self.get(change.property) || null;
      }
      self.set(change.property, change.restoreBaseValue ? self._baseValues[change.property] : change.value);
    });
    queue.splice(0, queue.length);
    queue.endPropertyChanges();
  }
  
});