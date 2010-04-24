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
  
  padding : { top: 20, right: 20, bottom: 20, left: 20 },
  
  displayProperties: 'xMin xMax yMin yMax padding'.w(),
  
  render: function (context, firstTime) {
    var r = this.getPath('parentView.raphaelObject');  

    if (r) {
      var padding = this.get('padding');
      var layout = this.getPath('parentView.layout');

      var height = layout.height,
          width  = layout.width;

      var plotWidth = width - padding.left - padding.right;
      var plotHeight = height - padding.top - padding.bottom;
      
      var xMin = this.get('xMin'),
          xMax = this.get('xMax'),
          yMin = this.get('yMin'),
          yMax = this.get('yMax'),
          xScale = this.get('xScale'),
          yScale = this.get('yScale');

      if (xMin !== undefined && xMax !== undefined) {
        r.g.axis(padding.left, padding.top + plotHeight, plotWidth, 0, xMax, xMax, 0);    // x axis
      }
      
      if (yMin !== undefined && yMax !== undefined) {
        r.g.axis(padding.left, padding.top + plotHeight, plotHeight, 0, yMax, yMax, 1);   // y axis
      }
    }
  }
});
