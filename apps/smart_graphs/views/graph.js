// ==========================================================================
// Project:   SmartGraphs.GraphView
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals SmartGraphs Raphael */



/** @class

  (Document Your View Here)

  @extends SC.View
*/

SmartGraphs.GraphView = SC.View.extend(
/** @scope SmartGraphs.GraphView.prototype */ {

  /**
  @public
  */
  
  // you'll want to add in a controller here.
  
  highlighted: null,
  
  classNames: ['graph-view'],
  displayProperties: ['selection', 'series'],

  _isGraphed : false,
  _raphaelObjForId: {},     // index of raphael objects by id
  _highlightedNodeId: undefined,
  
  NO_HIGHLIGHT_ATTR: { opacity: 0.5, r: 4 },
  HIGHLIGHT_ATTR: { opacity: 1.0, r: 5 },
  DATA_POINT_ID_MATCHER: /data-point-(\d+)/,
  
  
  render: function (context, firstTime) {
    var series = this.get('series');
    var selection = this.get('selection');
    var selectionAsText;
    
    if (firstTime) {
      context = context.begin('div').addClass('graph').end();
    }
    
    if (series && !this._isGraphed) {
      this._renderGraph(this.$('.graph')[0]);
      console.log('rendered');
      this._isGraphed = true;
    }
  },
  
  _renderGraph: function (node) {
    var padding = { top: 20, right: 20, bottom: 20, left: 20 };
    
    var xMax = 5,
        yMax = 25;
    
    var h = this.$().height();
    var w = this.$().width();

    var raph = Raphael;  // make jslint stop complaining that Raphael is a constructor        
    var r = raph(node, w, h);

    var plotWidth = w - padding.left - padding.right;
    var plotHeight = h - padding.top - padding.bottom;
    
    var xScale = plotWidth / xMax;
    var yScale = plotHeight / yMax;

    r.g.axis(padding.left, padding.top + plotHeight, plotWidth, 0, xMax, xMax, 0);    // x axis
    r.g.axis(padding.left, padding.top + plotHeight, plotHeight, 0, yMax, yMax, 1);   // y axis
    
    var series = this.get('series');
    
    for (var i = 0, ii = series.get('length'); i < ii; i++) {
      var pair = series.objectAt(i);
      var x = padding.left + (pair[0] * xScale);
      var y = padding.top + plotHeight - (pair[1] * yScale);
      
      var point = r.circle(x, y).attr({
        stroke: "#aa0000",
        fill: "#aa0000"
      }).attr(this.NO_HIGHLIGHT_ATTR);
  
      point.node.id = 'data-point-%@'.fmt(i);
      this._raphaelObjForId[point.node.id] = point;
    }  

    this._r = r;    // for console debugging
  },
  
  mouseDown: function (e) { 
    var match = this.DATA_POINT_ID_MATCHER.exec(e.target.id);
    if (match) {
      console.log('hello from data point' + match[1]);
    }
  },
  
  mouseMoved: function (e) {    
    var t = e.target;
    var nodeIdToHighlight;
    var idxToHighlight;
    
    var match = this.DATA_POINT_ID_MATCHER.exec(t.id);    
    if (match) {
      nodeIdToHighlight = t.id;
      idxToHighlight = parseInt(match[1], 10);
    }
    
    if (nodeIdToHighlight !== this._highlightedNodeId) {   // (do nothing if which node is highlighted didn't change)
      // remove old highlight, if any
      if (this._highlightedNodeId) {
        this._raphaelObjForId[this._highlightedNodeId].attr(this.NO_HIGHLIGHT_ATTR);
        this._highlightedNodeId = undefined;
      }

      // add new highlight, if any
      if (nodeIdToHighlight) {
        this._raphaelObjForId[nodeIdToHighlight].attr(this.HIGHLIGHT_ATTR);
        this._highlightedNodeId = nodeIdToHighlight;
      }
    
      // set public property to reflect the pair at whichever node, if any, is now highlighted
      this.set('highlighted', (idxToHighlight === undefined) ? null : this.get('series').objectAt(idxToHighlight));
    }
  }
});
