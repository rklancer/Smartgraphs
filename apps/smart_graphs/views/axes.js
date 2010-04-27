// ==========================================================================
// Project:   SmartGraphs.AxesView
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals SmartGraphs */

/** @class

  (Document Your View Here)

  @extends SC.View
*/
SmartGraphs.AxesView = SC.View.extend(
/** @scope SmartGraphs.AxesView.prototype */ {
  
  displayProperties: 'xMin xMax yMin yMax padding'.w(),
  
  didCreateLayer: function () {
    // hacky, hacky, but works for now.
    this.$().css('zIndex', '-1');
  },
  
  render: function (context, firstTime) {
    var parent = this.get('parentView');
    var raphael = parent.get('raphaelObject');
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
      
      if (this._x) {
        this._x.remove();
      }
      this._x = raphael.g.axis(padding.left, padding.top + plotHeight, plotWidth, 0, xMax, xMax, 0);    // x axis
    
      if (this._y) this._y.remove();
      this._y = raphael.g.axis(padding.left, padding.top + plotHeight, plotHeight, 0, yMax, yMax, 1);   // y axis

      this.renderChildViews(context, firstTime);
    }
  }
});
