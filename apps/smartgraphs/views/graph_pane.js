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

  childViews: 'animationView graphView controlsContainer'.w(),
  
  animationView: SC.View.design({
    layout: { left: 0, width: 0 }
  }),

  graphView: Smartgraphs.GraphView.design({
    graphControllerBinding: '.parentView.graphController'
  }),

  controlsContainer: SC.ContainerView.design({
    layout: { bottom: 0, height: 0 }
  }),
  
  showAnimationDidChange: function () {
    var showAnimation = this.get('showAnimation');
    var left = 0, 
        width = 0;
    
    if (showAnimation) {
      left = 35; 
      width = 35;
    }
    
    this.get('graphView').adjust('left', left);
    this.get('graphView').set('showAnimation', showAnimation);
    this.get('animationView').adjust('width', width);

  }.observes('showAnimation'),
  
  controlsNowShowingDidChange: function () {
    var nowShowing = this.get('controlsNowShowing');
    var bottom = 0, 
        height = 0;
    
    if (nowShowing) {
      bottom = 35; 
      height = 35;
    }
    
    this.get('graphView').adjust('bottom', bottom);
    this.get('animationView').adjust('bottom', bottom);
    this.get('controlsContainer').adjust('height', height);
    this.setPath('controlsContainer.nowShowing', nowShowing);

  }.observes('controlsNowShowing')

});
