// ==========================================================================
// Project:   Smartgraphs.animationTool
// Copyright: ©2011 Concord Consortium
// Author:    Erich Ocean <erich.ocean@me.com>
// ==========================================================================
/*globals Smartgraphs */

sc_require('tools/tool');

/** @class

  // TODO(?): move the animation tool's stateful properties out of this object and into the corresponding SC.State 
  // objects so that each graph can have its own animation tool instance. RPK 6-17-11
  
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
  
  defaultDuration:     3000,  // milliseconds, default is 3 seconds
  defaultChannelWidth: 70,    // in pixels
  defaultLoop:         false, // whether the animation should loop or just stop at the end

  backgroundImageURL: '',
  duration: 3000,   
  channelWidth: 70,
  loop: false,

  animations: [],
  linkedAnimations: [],
  
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
        animations       = args.animations       || [],
        linkedAnimations = args.linkedAnimations || [],
        staticImageHashes = args.staticImages || [],
        controller;
    
    if (!pane) return;
    
    this._pane = pane;
    
    this.set('loop', args.loop === undefined ? this.get('defaultLoop') : args.loop);
   
    this.set('backgroundImageURL', args.backgroundImage || '');
    this.set('duration',           args.duration        || this.get('defaultDuration'));      // duration of 0 makes no sense
    this.set('channelWidth',       args.channelWidth    || this.get('defaultChannelWidth'));  // channelWidth of 0 makes no sense
    
    this.set('staticImages', staticImageHashes.map(function (hash) {
      return {
        image:              hash.image        || '',
        xOffset:            hash.xOffset      || 0,
        yOffset:            hash.yOffset      || 0,
        width:              hash.width        || 70,
        height:             hash.height       || 30
      };
    }));

    this.set('animations', animations.map(function (hash) {
      return {
        datadefName:        hash.data,
        foregroundImageURL: hash.image        || '',
        xOffset:            hash.xOffset      || 0,
        yOffset:            hash.yOffset      || 0,
        width:              hash.width        || 70,
        height:             hash.height       || 30
      };
    }));
    
    this.set('linkedAnimations', linkedAnimations.map(function (hash) {
      return {
        pane: Smartgraphs.activityViewController.validPaneFor(hash.pane)
        // TODO add information from the 'animations' key
        // TODO throw error or skip over bad 'pane' argument
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
    this.set('linkedAnimations', []);
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
    return YES;
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
    return YES;
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
