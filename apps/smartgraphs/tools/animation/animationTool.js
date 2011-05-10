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

  _pane: null,
  length: 3000, // default to three seconds
  
  foregroundImageURL: '',
  backgroundImageClassName: '',
  offsetX: 0,
  offsetY: 0,
  
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
      this.length = args.length || 3000; // in milliseconds
      
      this._inAnimating = NO;
      
      if (args.foregroundImageURL) this.foregroundImageURL = args.foregroundImageURL;
      if (args.backgroundImageClassName) this.backgroundImageClassName = args.backgroundImageClassName;
      this.offsetX = args.offsetX || 0;
      this.offsetY = args.offsetY || 0;
      
      Smartgraphs.statechart.gotoState(this.get('state'));
    }
  },
  
  _inAnimating: NO,
  _progress: 0, // in milliseconds
  
  /**
    Called on entry to ANIMATION_RUNNING state.
  */
  startAnimating: function () {
    if (!this._pane || this._isAnimating) return NO;
    this._isAnimating = YES;
    var graphPane = this.get('graphPane');
    graphPane.get('graphView').animate();
    return YES;
  },
  
  /**
    Called on entry to ANIMATION_STOPPED state.
  */
  stopAnimating: function () {
    if (!this._pane || !this._isAnimating) return NO;
    this._isAnimating = NO;
    var graphPane = this.get('graphPane');
    graphPane.get('graphView').stop();
    return YES;
  },
  
  /**
    Called on entry to ANIMATION_CLEARED state.
  */
  clearAnimation: function () {
    var graphPane = this.get('graphPane');
    graphPane.get('graphView').reset();
  }

});