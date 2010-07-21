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
      
      renderCallback: function (raphaelCanvas) {
        Smartgraphs.raphael = raphaelCanvas;

        // a total hack.
        this.invokeLater(function () { 
          raphaelCanvas.g.axis(10, 200, 200, 0, 10, 10, 0); 
        });
        return raphaelCanvas.rect(1,1,1,1).attr({opacity: 0});
      },

      render: function (context, firstTime) {
        if (firstTime) {
          context.callback(this, this.renderCallback);
          this.renderChildViews(context, firstTime);      // don't forget to render child views
        }
      },

      coordinatesFor: function (x, y) {
      }
    })
  })
});
