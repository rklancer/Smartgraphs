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

  controlsContainerNowShowing: null,
  controlsContainer: SC.ContainerView.design({
    layout: { bottom: 0, height: 0 },
    graphControllerBinding: '.parentView.graphController',
    nowShowingBinding: '.parentView.controlsContainerNowShowing'
  }),

  showInControlsPanelBinding: '*graphController.showInControlsPanel',
  showInControlsPanelDidChange: function () {
    var showInControlsPanel = this.get('showInControlsPanel'),
        bottom = 0,
        height = 0;

    if (showInControlsPanel) {
      bottom = 35;
      height = 35;

      if (showInControlsPanel === Smartgraphs.GraphController.CONTROLS) {
        this.set('controlsContainerNowShowing', this.get('graphControlsView'));
      }
      if (showInControlsPanel === Smartgraphs.GraphController.SENSOR_LOADING) {
        this.set('controlsContainerNowShowing', Smartgraphs.activityPage.sensorLoadingView);
      }
    }

    this.get('animationChannelView').adjust('bottom', bottom);
    this.get('graphView').adjust('bottom', bottom);
    this.get('controlsContainer').adjust('height', height);
  }.observes('showInControlsPanel'),

  // this is not a child view of the GraphPane, but gets put into the controlsContainer when needed
  graphControlsView: SC.View.design({
    layout: { height: 35 },

    graphControllerBinding: '*parentView.graphController',

    childViews: 'startControl stopControl clearControl'.w(),

    startControl: SC.ButtonView.design({
      layout: { centerX: -110, bottom: 10, width: 80, height: 24 },
      isVisibleBinding: '.parentView*graphController.startControlIsVisible',
      isEnabledBinding: '.parentView*graphController.startControlIsEnabled',
      isDefaultBinding: '.parentView*graphController.startControlIsDefault',

      title: 'Start',
      action: 'startControlWasClicked',
      target: SC.outlet('parentView.graphController.statechart')
    }),

    stopControl: SC.ButtonView.design({
      layout: { centerX: 0, bottom: 10, width: 80, height: 24 },
      isVisibleBinding: '.parentView*graphController.stopControlIsVisible',
      isEnabledBinding: '.parentView*graphController.stopControlIsEnabled',
      isDefaultBinding: '.parentView*graphController.stopControlIsDefault',

      title: 'Stop',
      action: 'stopControlWasClicked',
      target: SC.outlet('parentView.graphController.statechart')
    }),

    clearControl: SC.ButtonView.design({
      layout: { centerX: 110, bottom: 10, width: 80, height: 24 },
      isVisibleBinding: '.parentView*graphController.clearControlIsVisible',
      isEnabledBinding: '.parentView*graphController.clearControlIsEnabled',
      isDefaultBinding: '.parentView*graphController.clearControlIsDefault',

      title: 'Reset',
      action: 'clearControlWasClicked',
      target: SC.outlet('parentView.graphController.statechart')
    })
  })

});
