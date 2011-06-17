// ==========================================================================
// Project:   Smartgraphs.animationTool
// Copyright: ©2011 Concord Consortium
// Author:    Erich Ocean <erich.ocean@me.com>
// ==========================================================================
/*globals Smartgraphs */

sc_require('tools/tool');

/** @class

  // TODO move the animation tool's stateful properties out of this object and into the corresponding SC.State objects
  // so that each graph can have its own animation tool instance. RPK 6-17-11
  
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
  _isAnimating: NO,  
  
  backgroundImageURL: '',
  duration: 3000,   // milliseconds, default is 3 seconds
  channelWidth: 70, // in pixels
  animations: [],
  
  pane: function () {
    return this._pane;
  }.property(),
  
  graphPane: function () {
    return Smartgraphs.activityPage.get(Smartgraphs.activityViewController.firstOrSecondFor(this._pane)+'GraphPane');
  }.property('pane'),
  
  isAnimating: function () {
    return this._isAnimating;
  }.property().cacheable(),
  
  setup: function (args) {
    args = args || {};
    
    var pane = Smartgraphs.activityViewController.validPaneFor(args.pane),
        animationHashes = args.animations || [],
        controller;
    
    if (!pane) return;
    
    this._pane = pane;
    
    if (args.backgroundImage) this.set('backgroundImageURL', args.backgroundImage);
    if (args.duration) this.duration = args.duration;
    if (args.channelWidth) this.channelWidth = args.channelWidth;
  
    this.set('animations', animationHashes.map(function (hash) {
      return {
        datadefName:        hash.data,
        foregroundImageURL: hash.image   || '',
        offsetX:            hash.offsetX || 0,
        offsetY:            hash.offsetY || 0
      };
    }));
    
    this._isAnimating = NO;
    this.notifyPropertyChange('isAnimating');

    controller = this.graphControllerForPane(args.pane);
    controller.animationToolStartTool();
  },
  
  clear: function () {
    this.stopAnimating();
    this.set('animations', []);
  },
  
  /**
    Called on entry to ANIMATION_RUNNING state.
  */
  startAnimating: function () {
    if (!this._pane || this._isAnimating) return NO;
    this._isAnimating = YES;
    this.notifyPropertyChange('isAnimating');
    var graphPane = this.get('graphPane');
    graphPane.get('graphView').animate();
  },
  
  /**
    Called on entry to ANIMATION_STOPPED state.
  */
  stopAnimating: function () {
    if (!this._pane || !this._isAnimating) return NO;
    this._isAnimating = NO;
    this.notifyPropertyChange('isAnimating');    
    var graphPane = this.get('graphPane');
    graphPane.get('graphView').stop();
  },
  
  /**
    Called on entry to ANIMATION_CLEARED state.
  */
  clearAnimation: function () {
    this._isAnimating = NO;
    this.notifyPropertyChange('isAnimating');
    var graphPane = this.get('graphPane');
    graphPane.get('graphView').reset();
  }

});