// ==========================================================================
// Project:   SmartGraphs.SeriesView
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals SmartGraphs */

/** @class

  (Document Your View Here)

  @extends SC.View
*/
SmartGraphs.SeriesView = SC.View.extend(
/** @scope SmartGraphs.SeriesView.prototype */ {
  
  _raphaelObjForId: {},     // index of raphael objects representing data points in this series, by id
  _dataPointForId: {},
  _highlightedPoint: null,   // unclear whether this is a DOM object or a DataPoint record...

  NO_HIGHLIGHT_ATTR: { r: 4 },
  HIGHLIGHT_ATTR: { r: 6 },
  SELECTED_ATTR: { stroke: '#aa0000', fill: '#aa0000', opacity: 0.8 },
  NOT_SELECTED_ATTR: { stroke: "#BFADA7", fill: "#BFADA7", opacity: 0.5 },
  DATA_POINT_ID_MATCHER : '',
  id : '',
  
  init: function () {
    sc_super();
    
    this.id = SC.guidFor(this);
    this.DATA_POINT_ID_MATCHER = new RegExp(this.id + "-data-point-(\\d+)");
    var parent = this.get('parentView');
    parent.registerChildView(this, this.id);
  },
  
  displayProperties: 'xMin xMax yMin yMax padding selection content content.totalChanges content.[]'.w(),
  
  didCreateLayer: function () {
    this.$().css('zIndex', '-1');
  },
  
  mouseDown: function (e) {
    debugger;
    var pair = this._dataPointForId[e.target.id];
    
    if (pair) {
      var controller = this.get('controller');
      var selection = this.get('selection');
      
      if (selection.contains(pair)) {
        controller.deselectObject(pair);
      }
      else {
        controller.selectObject(pair, YES);
      }
    }
  },
  
  mouseEntered: function (e) {
    debugger;
    console.log('mouseEntered ' + e.target.id);
    var point = this._raphaelObjForId[e.target.id];
    
    if (point) point.attr(this.HIGHLIGHT_ATTR);
    this._highlightedPoint = point;
  },
  
  mouseExited: function (e) {
    var point = this._highlightedPoint;
    if (point) point.attr(this.NO_HIGHLIGHT_ATTR);    
    this._highlightedPoint = null;
  },
  
  render: function (context, firstTime) {

    var parent = this.get('parentView');
    var raphaelNode = parent.$().children()[0];
    var raphael = (raphaelNode && raphaelNode.raphael) ? raphaelNode.raphael : null;
    
    var padding = this.get('padding');
    var layout = parent.get('layout');
    var xMin = this.get('xMin'),
        xMax = this.get('xMax'),
        yMin = this.get('yMin'),
        yMax = this.get('yMax');
    
    if (raphael && padding && layout && (xMin !== undefined) && (xMax !== undefined) && (yMin !== undefined) && (yMax !== undefined)) {
      var height = layout.height,
          width  = layout.width;

      var plotWidth = width - padding.left - padding.right;
      var plotHeight = height - padding.top - padding.bottom;          

      var xScale = plotWidth / xMax;
      var yScale = plotHeight / yMax;
      
      var rObjs = this._raphaelObjForId;
      for (var objName in rObjs) {
        if (rObjs.hasOwnProperty(objName)) rObjs[objName].remove();
      }

      this._raphaelObjForId = {};
      this._dataPointForId = {};
      
      var series = this.get('content');
      var selection = this.get('selection');
      
      for (var i = 0, ii = series.get('length'); i < ii; i++) {
        var pair = series.objectAt(i);
        var x = padding.left + (pair.get('x') * xScale);
        var y = padding.top + plotHeight - (pair.get('y') * yScale);
    
        var point = raphael.circle(x, y).attr(this.NO_HIGHLIGHT_ATTR);
        
        // we want: if this point corresponds to the highlighted PAIR, highlight it.
        // but note that this requires a different data model
        
        if (selection.contains(pair)) {
          point.attr(this.SELECTED_ATTR);
        }
        else {
          point.attr(this.NOT_SELECTED_ATTR);
        }
    
        point.node.id = this.id + '-data-point-%@'.fmt(i);
        this._raphaelObjForId[point.node.id] = point;
        this._dataPointForId[point.node.id] = pair;
      }
    }
  }
});
