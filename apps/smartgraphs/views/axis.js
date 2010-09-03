// ==========================================================================
// Project:   Smartgraphs.AxisView
// Copyright: ©2010 Concord Consortium
// @author:   Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs RaphaelViews */

/** @class

  (Document Your View Here)

  @extends SC.View
*/
Smartgraphs.AxisView = RaphaelViews.RaphaelView.extend(
/** @scope Smartgraphs.AxisView.prototype */ {

  init: function () {
    if (this.get('type') === 'x') {
      this.set('displayProperties', 'axes.xMin axes.xMax axes.xSteps'.w());
    }
    else {
      this.set('displayProperties', 'axes.yMin axes.yMax axes.ySteps'.w());
    }
    sc_super();
  },
  
  render: function (context, firstTime) {
    // unfortunately, Raphael can't draw text correctly when the svg element is hidden or offscreen (as it is when
    // rendering with firstTime =TRUE). Thus draw the axis only after the graph is onscreen by waiting until after
    // didCreateLayer. Note that this means the elements that make up the axis are not children of the layer...
    if (!firstTime) this.drawAxis();
  },
  
  didCreateLayer: function () {
    this.invokeLater(this.drawAxis);
  },
  
  drawAxis: function () {
    if (this._axis) this._axis.remove();
    
    var axes = this.get('axes');
    if (axes) {
      var padding = this.getPath('parentView.parentView.parentView.padding');
      var frame = this.getPath('parentView.parentView.parentView.frame');

      var xLeft = frame.x + padding.left;
      var yBottom = frame.y + frame.height - padding.bottom;
      
      if (this.get('type') === 'y') {
        var yMin = axes.get('yMin');
        var yMax = axes.get('yMax');
        var ySteps = axes.get('ySteps');
        var plotHeight = frame.height - padding.top - padding.bottom;
      
        this._axis = this.get('raphaelCanvas').g.axis(xLeft, yBottom, plotHeight, yMin, yMax, ySteps, 1);
      }
      else if (this.get('type') === 'x') {
        var xMin = axes.get('xMin');
        var xMax = axes.get('xMax');
        var xSteps = axes.get('xSteps');
        
        var plotWidth = frame.width - padding.left - padding.right;
        
        this._axis = this.get('raphaelCanvas').g.axis(xLeft, yBottom, plotWidth, xMin, xMax, xSteps, 0);
      }
    }
  }
});
