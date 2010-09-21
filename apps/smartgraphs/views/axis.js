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
      this.set('displayProperties', 'axes.xMin axes.xMax axes.xSteps axes.xLabel parentView.parentView.frame'.w());
    }
    else {
      this.set('displayProperties', 'axes.yMin axes.yMax axes.ySteps axes.yLabel parentView.parentView.frame'.w());
    }
    sc_super();
  },
  
  render: function (context, firstTime) {
    // unfortunately, Raphael can't draw text correctly when the svg element is hidden or offscreen (as it is when
    // rendering with firstTime =TRUE). Thus draw the axis only after the graph is onscreen by waiting until after
    // didCreateLayer. Note that this means the elements that make up the axis are not children of the layer...
    if (!firstTime) {
      this.drawAxis();
      this.drawLabel();
    }
  },
  
  didCreateLayer: function () {
    this._label = null;
    this.invokeLater(this.drawLabel);
    this.invokeLater(this.drawAxis);
  },
  
  drawAxis: function () {
    // the g.raphael axis this._axis has a lot of 'moving parts' so, unlike label, recreate the axis object every time
    // instead of updating it via .attr()
    if (this._axis) this._axis.remove();
    
    var axes = this.get('axes');
    if (!axes) return;
    
    var padding = this.getPath('parentView.parentView.parentView.padding');
    var frame = this.getPath('parentView.parentView.frame');

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
    
    this._axis.all[0].attr({stroke: '#333333'});          // path
    this._axis.all[1].attr({fill: '#333333'});            // text
  },
  
  drawLabel: function () {
    var padding = this.getPath('parentView.parentView.parentView.padding');
    var frame = this.getPath('parentView.parentView.frame');
    
    var axes  = this.get('axes');
    if (!axes) return;
    
    var labelText, x, y, rotation;
    
    if (this.get('type') === 'x') {
      labelText = axes.get('xLabel');
      x = (padding.left + frame.width - padding.right) / 2;
      y = frame.height - 15;
      rotation = 0;
    }
    else {
      labelText = axes.get('yLabel');
      x = 10;
      y = (padding.top + frame.height - padding.bottom) / 2;
      rotation = 270;
    }
    
    if (this._label) {
      this._label.attr({text: labelText, x: x, y: y});
    }
    else {
      this._label = this.get('raphaelCanvas').text(x, y, labelText).attr({font: "14px Arial, sans-serif", fill: '#333333'}).rotate(rotation);
    }
  }
});
