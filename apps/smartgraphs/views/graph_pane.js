// ==========================================================================
// Project:   Smartgraphs.GraphPane
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document Your View Here)

  @extends SC.View
*/
Smartgraphs.GraphPane = SC.View.extend(
/** @scope Smartgraphs.GraphPane.prototype */ {

  childViews: 'graphView controlsContainer'.w(),
  
  graphView: Smartgraphs.GraphView.design({
    graphControllerBinding: '.parentView.graphController',
    viewName: 'secondGraphView'
  }),

  controlsContainer: SC.ContainerView.design({
    layout: { bottom: 0, height: 0 }
  })

});
