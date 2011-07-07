// ==========================================================================
// Project:   Smartgraphs.GraphPane
// Copyright: ©2011 Concord Consortium
// Author:    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document Your View Here)

  @extends SC.View
*/
Smartgraphs.GraphPane = SC.View.extend(
/** @scope Smartgraphs.GraphPane.prototype */ {

  childViews: 'animationChannelView graphView controlsContainer'.w(),
  
  // MUST come before graphView
  animationChannelView: SC.View.design({
    
    animationInfoBinding:      '.parentView*graphController.animationInfo',
    isVisibleBinding:          '*animationInfo.hasAnimation',
    backgroundImageURLBinding: '*animationInfo.backgroundImageURL',
    channelWidthBinding:       '*animationInfo.channelWidth',

    layout: { left: 10, top: 15, width: 0, bottom: 0 },

    displayProperties: ['backgroundImageURL', 'channelWidth'],
    
    render: function (context, firstTime) {      
      sc_super();
      if (!firstTime) {
        this._setBackgroundImage(this.get('backgroundImageURL'));
        this.adjust('width', this.get('channelWidth'));
      }
    },
    
    didCreateLayer: function () {
      this._setBackgroundImage(this.get('backgroundImageURL'));
      this.adjust('width', this.get('channelWidth'));
    },
    
    _setBackgroundImage: function (url) {
      var image = url ? ['url(', url, ')'].join('') : '';
      this.$().css('backgroundImage', image);
    }    
  }),
  
  graphView: Smartgraphs.GraphView.design({
    graphControllerBinding: '.parentView.graphController'
  }),
  
  controlsContainer: SC.ContainerView.design({
    layout: { bottom: 0, height: 0 }
  }),
  
  controlsNowShowingDidChange: function () {
    var nowShowing = this.get('controlsNowShowing'),
        bottom = 0,
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
