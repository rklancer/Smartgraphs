// ==========================================================================
// Project:   Smartgraphs.AxesView
// Copyright: ©2010 Concord Consortium
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document Your View Here)

  @extends SC.View
*/
Smartgraphs.AxesView = SC.View.extend(
/** @scope Smartgraphs.AxesView.prototype */ {
  
  // note this assumes that axes has a 'content' property that can be monitored. This will be true for ObjectControllers
  
  displayProperties: 'axes.xMin axes.xMax axes.yMin axes.yMax axes.padding axes.xLabel axes.yLabel'.w(),
  
  didCreateLayer: function () {
    // hacky, hacky, but works for now.
    this.$().css('zIndex', '-1');
  },
  
  render: function (context, firstTime) {

    var parent = this.get('parentView');
    var raphael = parent.get('raphaelObject');

    if (!raphael) {
      return;
    }

    var axes = this.get('axes');
    
    // use xMin as a proxy for all the properties of 'axes' object that have to be defined...
    if (!axes || (axes.get('xMin') === undefined)) { 
      this._clearObjects();
      this.renderChildViews(context, firstTime);
      return;
    }

    var layout = parent.get('layout');    
    var xMin = axes.get('xMin'),
        xMax = axes.get('xMax'),
        yMin = axes.get('yMin'),
        yMax = axes.get('yMax'),
        padding = axes.get('padding'),       
        xSteps = axes.get('xSteps'),
        ySteps = axes.get('ySteps'),
        xLabelText = axes.get('xLabel'),
        yLabelText = axes.get('yLabel');

    var height = layout.height,
        width  = layout.width;

    var plotWidth = width - padding.left - padding.right;
    var plotHeight = height - padding.top - padding.bottom;

    this._clearObjects();
    this._x = raphael.g.axis(padding.left, padding.top + plotHeight, plotWidth, 0, xMax, xSteps, 0);    // x axis
    this._y = raphael.g.axis(padding.left, padding.top + plotHeight, plotHeight, 0, yMax, ySteps, 1);   // y axis

    this._xLabel = 
      raphael.text(padding.left + plotWidth/2, height - 10, xLabelText).attr({font: "14px Arial, sans-serif"});
    this._yLabel = 
      raphael.text(10, padding.top + plotHeight/2, yLabelText).attr({font: "14px Arial, sans-serif"});

    this.renderChildViews(context, firstTime);
    this.invokeLater(this.rotateLabel);
  },
  
  // hack to work around Raphael bug where text doesn't rotate if hidden?
  rotateLabel: function () {
    if (this._yLabel) this._yLabel.rotate(270);
  },
    
  _clearObjects: function () {
    if (this._x) this._x.remove();
    if (this._y) this._y.remove();
    if (this._xLabel) this._xLabel.remove();  
    if (this._yLabel) this._yLabel.remove();
  }  
});

