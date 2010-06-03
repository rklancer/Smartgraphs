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
  
  displayProperties: 'axes.xMin axes.xMax axes.yMin axes.yMax axes.padding axes.xLabel axes.yLabel'.w(),
  
  didCreateLayer: function () {
    // hacky, hacky, but works for now.
    this.$().css('zIndex', '-1');
  },
  
  render: function (context, firstTime) {
    var parent = this.get('parentView');
    var raphael = parent.get('raphaelObject');
    var layout = parent.get('layout');
    var axes = this.get('axes');

    if (!axes) return;
    
    var xMin = axes.get('xMin'),
        xMax = axes.get('xMax'),
        yMin = axes.get('yMin'),
        yMax = axes.get('yMax'),
        padding = axes.get('padding'),       
        xSteps = axes.get('xSteps'),
        ySteps = axes.get('ySteps'),
        xLabelText = axes.get('xLabel'),
        yLabelText = axes.get('yLabel');

    if (raphael && padding && layout && (xMin !== undefined) && (xMax !== undefined) && (yMin !== undefined) && (yMax !== undefined)) {
      var height = layout.height,
          width  = layout.width;

      var plotWidth = width - padding.left - padding.right;
      var plotHeight = height - padding.top - padding.bottom;
      
      if (this._x) {
        this._x.remove();
      }
      this._x = raphael.g.axis(padding.left, padding.top + plotHeight, plotWidth, 0, xMax, xSteps, 0);    // x axis
    
      if (this._y) this._y.remove();
      this._y = raphael.g.axis(padding.left, padding.top + plotHeight, plotHeight, 0, yMax, ySteps, 1);   // y axis

      if (this._xLabel) this._xLabel.remove();
      this._xLabel = 
        raphael.text(padding.left + plotWidth/2, height - 10, xLabelText).attr({font: "14px Arial, sans-serif"});

      if (this._yLabel) this._yLabel.remove();
      this._yLabel = 
        raphael.text(10, padding.top + plotHeight/2, yLabelText).attr({font: "14px Arial, sans-serif"}).rotate(270);

      this.renderChildViews(context, firstTime);
    }
  }
});
