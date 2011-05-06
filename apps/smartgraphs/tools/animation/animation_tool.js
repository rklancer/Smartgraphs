// ==========================================================================
// Project:   Smartgraphs.animationTool
// Copyright: ©2011 Concord Consortium
// Author:    Erich Ocean <erich.ocean@me.com>
// ==========================================================================
/*globals Smartgraphs */

sc_require('tools/tool');

/** @class

  @extends Smartgraphs.Tool
*/
Smartgraphs.animationTool = Smartgraphs.Tool.create(
/** @scope Smartgraphs.animationTool.prototype */ {
  
  name: 'animation',
  state: 'ANIMATION_TOOL',
  
  /**
    Stubbable method to find the appropriate graph controller to use for a given 'pane' argument
    
    @param {String} pane
      The pane we want the label tool to operate in; generally one of 'top', 'bottom', or 'single'
  */
  graphControllerForPane: function (pane) {
    return Smartgraphs.activityViewController.graphControllerForPane(pane);
  },
  
  _pane: null,
  
  backgroundImageURL: '',
  backgroundImageClassName: '',
  duration: 3000,   // milliseconds, default is 3 seconds
  channelWidth: 70, // in pixels
  animations: [],
  
  pane: function () {
    return this._pane;
  }.property(),
  
  graphPane: function () {
    return Smartgraphs.activityPage.get(Smartgraphs.activityViewController.firstOrSecondFor(this._pane)+'GraphPane');
  }.property('pane'),
  
  setup: function (args) {
    args = args || {};
    var pane = Smartgraphs.activityViewController.validPaneFor(args.pane);
    
    if (pane) {
      this._pane = pane;
      
      if (args.backgroundImageClassName) this.backgroundImageClassName = args.backgroundImageClassName;
      if (args.backgroundImageURL) this.backgroundImageURL = args.backgroundImageURL;
      if (args.duration) this.duration = args.duration ;
      if (args.channelWidth) this.channelWidth = args.channelWidth ;
      
      var animation = args.animation || [] ;
      var cookedAnimations = [];
      if (animation.length) {
        animation.forEach(function(hash) {
          var params = {};

          params.foregroundImageURL = hash.foregroundImageURL || '';
          params.offsetX = hash.offsetX || 0;
          params.offsetY = hash.offsetY || 0;
          cookedAnimations.push(params);
        });
        this.animations = cookedAnimations;
      }
      
      this._isAnimating = NO;
      // Smartgraphs.statechart.gotoState(this.get('state'));
    }

    var controller = this.graphControllerForPane(args.pane);
    controller.animationToolStartTool();
  },
  
  _isAnimating: NO,
  
  /**
    Called on entry to ANIMATION_RUNNING state.
  */
  startAnimating: function () {
    if (!this._pane || this._isAnimating) return NO;
    this._isAnimating = YES;
    var graphPane = this.get('graphPane');
    return graphPane.get('graphView').animate();
  },
  
  /**
    Called on entry to ANIMATION_STOPPED state.
  */
  stopAnimating: function () {
    if (!this._pane || !this._isAnimating) return NO;
    this._isAnimating = NO;
    var graphPane = this.get('graphPane');
    return graphPane.get('graphView').stop();
  },
  
  /**
    Called on entry to ANIMATION_CLEARED state.
  */
  clearAnimation: function () {
    this._isAnimating = NO;
    var graphPane = this.get('graphPane');
    return graphPane.get('graphView').reset();
  }

});