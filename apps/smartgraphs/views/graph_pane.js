// ==========================================================================
// Project:   Smartgraphs.GraphPane
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Smartgraphs RaphaelViews */

/** @class

  (Document Your View Here)

  @extends SC.View
*/
Smartgraphs.GraphPane = SC.View.extend(
/** @scope Smartgraphs.GraphPane.prototype */ {

  childViews: 'animationChannelView graphView controlsContainer'.w(),
  
  // MUST come before graphView
  animationChannelView: SC.ContainerView.design({
    layout: { left: 10, top: 15, width: 70, bottom: 0 },
    classNames: 'blue'.w(),
    isVisibleBinding: '.parentView.showAnimation'
  }),
  
  graphView: Smartgraphs.GraphView.design({
    graphControllerBinding: '.parentView.graphController',
    showAnimationBinding: '.parentView.showAnimation'
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
    
    this.get('animationChannelView').adjust('bottom', bottom);
    this.get('graphView').adjust('bottom', bottom);
    this.get('controlsContainer').adjust('height', height);
    this.setPath('controlsContainer.nowShowing', nowShowing);
  }.observes('controlsNowShowing')

});
