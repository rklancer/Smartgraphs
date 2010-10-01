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
    graphControllerBinding: '.parentView.graphController'
  }),

  controlsContainer: SC.ContainerView.design({
    layout: { bottom: 0, height: 0 }
  }),
  
  controlsNowShowingDidChange: function () {
    var nowShowing = this.get('controlsNowShowing');
    var bottom = 0, 
        height = 0;
    
    if (nowShowing) {
      bottom = 35; 
      height = 35;
    }
    
    this.get('graphView').adjust('bottom', bottom);
    this.get('controlsContainer').adjust('height', height);
    this.setPath('controlsContainer.nowShowing', nowShowing);

  }.observes('controlsNowShowing')

});
