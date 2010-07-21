// ==========================================================================
// Project:   Smartgraphs.GraphView
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Smartgraphs RaphaelViews */

/** @class

  (Document Your View Here)

  @extends SC.View
*/
Smartgraphs.GraphView = SC.View.extend(
/** @scope Smartgraphs.GraphView.prototype */ {
  childViews: 'canvas'.w(),

  canvas: RaphaelViews.RaphaelCanvasView.design({
    childViews: 'axes'.w(),
    
    axes: RaphaelViews.RaphaelView.design({
      // TODO this may need to be modified to include all the axes properties if axes properties are adjusted live
      graphBinding: '.parentView.parentView.graph',
      displayProperties: 'graph graph.axes graph.allSeries.[]',
      
      renderCallback: function (raphaelCanvas, x, y, width, height, fill, stroke) {
        return raphaelCanvas.rect(x, y, width, height).attr({ fill: fill, stroke: stroke });
      },

      render: function (context, firstTime) {
        if (firstTime) {
          // a test.
          context.callback(this, this.renderCallback, 50, 50, 100, 100, '#cc0000', '#cc0000');
          this.renderChildViews(context, firstTime);      // don't forget to render child views
        }
      },

      coordinatesFor: function (x, y) {
      }
    })
  })
});
