// ==========================================================================
// Project:   Smartgraphs.animationTool
// Copyright: ©2011 Concord Consortium
// Author:    Erich Ocean <erich.ocean@me.com>
// ==========================================================================
/*globals Smartgraphs NO YES sc_require */

sc_require('tools/tool');

/** @class

  @extends Smartgraphs.Tool
*/
Smartgraphs.animationTool = Smartgraphs.Tool.create(
/** @scope Smartgraphs.animationTool.prototype */ {

  name: 'animation',
  state: 'ANIMATION_TOOL',

  /**
    Finds the appropriate graph view for a given 'pane' name

    @param {String} pane
      The pane containing the graph we're interested in; one of 'top', 'bottom', or 'single'

    @returns {Smartgraphs.GraphView}
  */
  graphViewForPane: function (pane) {
    return Smartgraphs.activityPage.getPath(Smartgraphs.activityViewController.firstOrSecondFor(pane)+'GraphPane.graphView');
  },

  defaultDuration:     3000,  // milliseconds, default is 3 seconds
  defaultChannelWidth: 70,    // in pixels
  defaultLoop:         false, // whether the animation should loop or just stop at the end
  defaultBackgroundImageURL: '',

  duration:            3000,
  channelWidth:        70,
  loop:                false,
  backgroundImageURL:  '',

  staticImages: [],
  animations: [],
  linkedAnimationsByPane: {},

  /*
    How many times the animation has played through on this step.
  */
  playCount: 0,

  _mainPane: null,
  mainPane: function () {
    return this._mainPane;
  }.property(),

  _linkedPanes: [],
  linkedPanes: function () {
    return this._linkedPanes;
  }.property(),

  _isAnimating: NO,
  isAnimating: function () {
    return this._isAnimating;
  }.property(),

  linkedGraphs: function () {
    var pane,
        linkedAnimationsByPane = this.get('linkedAnimationsByPane'),
        ret = [];

    for (pane in linkedAnimationsByPane) {
      if ( !linkedAnimationsByPane.hasOwnProperty(pane) ) continue;
      ret.push(this.graphViewForPane(pane));
    }
    return ret;
  }.property(),

  allAnimatedGraphs: function () {
    var ret = this.get('linkedGraphs');
    ret.insertAt(0, this.graphViewForPane(this.get('mainPane')));
    return ret;
  }.property(),

  /**
    Returns the URL for a given image file name, assuming that the image file name is included as a
    static asset in the Smartgraphs build. Need to do this at runtime because sc_static is replaced
    with a full URL at build time (and there isn't an obvious hook to do the replacement at build
    time when the sc_static replacement is made.)
  */
  getImageURL: function(imageName) {
    // don't substitute absolute urls
    if (imageName.charAt(0) === '/') return imageName;

    var f = sc_static("finish.png"), // has to actually exist
        match = f.match(/^(.*)finish.png(.*)$/);
    return match.length > 1 ? match[1] + imageName + match[2] : null;
  },

  setup: function (args) {
    args = args || {},
           self = this;

    var pane = Smartgraphs.activityViewController.validPaneFor(args.pane),
        animationHashes        = args.animations       || [],
        linkedAnimationHashes  = args.linkedAnimations || [],
        staticImageHashes      = args.staticImages     || [],
        linkedAnimationsByPane = {},
        staticImages           = [],
        controller;

    if (!pane) return;

    this.set('loop', args.loop === undefined ? this.get('defaultLoop') : args.loop);
    this.set('backgroundImageURL', this.getImageURL(
                                   args.backgroundImage || this.get('defaultBackgroundImageURL')));
    this.set('duration',           args.duration        || this.get('defaultDuration'));      // duration of 0 makes no sense
    this.set('channelWidth',       args.channelWidth    || this.get('defaultChannelWidth'));  // channelWidth of 0 makes no sense
    this.set('playCount', 0);
    this.set('hideGraph',          args.hideGraph       || NO ); // default to not hiding the graph

    staticImageHashes.forEach(function (hash) {
      var instances = hash.instances || [],
          instance  = null,
          i;

      // flatten out the nested authored json into a single record object
      for (i = 0; i < instances.length; i++) {
        instance         = instances[i];
        instance.image   = self.getImageURL(hash.image || '');
        instance.xOffset = hash.xOffset  || 0;
        instance.yOffset = hash.yOffset  || 0;
        instance.width   = hash.width    || 70;
        instance.height  = hash.height   || 30;
        staticImages.push(instance);
      }
    });

    this.set("staticImages", staticImages);

    this.set('animations', animationHashes.map(function (hash) {
      return {
        datadefName:        hash.data,
        foregroundImageURL: self.getImageURL(hash.image || ''),
        xOffset:            hash.xOffset || 0,
        yOffset:            hash.yOffset || 0,
        width:              hash.width   || 70,
        height:             hash.height  || 30
      };
    }));

    linkedAnimationHashes.forEach(function (hash) {
      var pane       = Smartgraphs.activityViewController.validPaneFor(hash.pane),
          animations = hash.animations || [];

      if (!pane) throw "bad pane argument '@%' in linkedAnimations".fmt(pane);
      if (linkedAnimationsByPane[pane]) throw "repeated set of linkedAnimations for pane '%@'".fmt(pane);

      linkedAnimationsByPane[pane] = animations.map(function (hash) {
        return {
          datadefName: hash.data
        };
      });
    });

    this.set('linkedAnimationsByPane', linkedAnimationsByPane);

    this._mainPane = pane;
    this._isAnimating = NO;
    this.notifyPropertyChange('isAnimating');

    controller = this.graphControllerForPane(args.pane);
    controller.sendAction('animationToolStartTool');
  },

  clearSetup: function () {
    this._mainPane = null;
    this.set('animations', []);
    this.set('linkedAnimationsByPane', {});
    this.set('staticImages', []);
    this.set('playCount', 0);
  },

  makeAnimationInfoObject: function () {
    return SC.Object.create({
      hasAnimation:       YES,
      duration:           null,
      loop:               null,
      channelWidth:       null,
      animations:         [],
      staticImages:       [],
      backgroundImageURL: '',
      linkedAnimations:   []
    });
  },

  setupGraphControllers: function () {
    var linkedAnimationsByPane = this.get('linkedAnimationsByPane'),
        pane,
        controller,
        animationInfo;

    pane = this.get('mainPane');
    controller = this.graphControllerForPane(pane);

    animationInfo = this.makeAnimationInfoObject();
    this.copyPropertiesTo(animationInfo, ['channelWidth', 'backgroundImageURL', 'duration', 'loop', 'animations', 'staticImages', 'hideGraph']);
    controller.set('animationInfo', animationInfo);

    for (pane in linkedAnimationsByPane) {
      if (!linkedAnimationsByPane.hasOwnProperty(pane)) continue;

      controller = this.graphControllerForPane(pane);

      animationInfo = this.makeAnimationInfoObject();
      this.copyPropertiesTo(animationInfo, ['duration', 'loop', 'channelWidth']);
      animationInfo.set('linkedAnimations', linkedAnimationsByPane[pane]);
      controller.set('animationInfo', animationInfo);
    }
  },

  clearGraphControllers: function () {
    var linkedAnimationsByPane = this.get('linkedAnimationsByPane'),
        pane,
        controller;

    pane = this.get('mainPane');
    controller = this.graphControllerForPane(pane);
    controller.set('animationInfo', null);

    for (pane in linkedAnimationsByPane) {
      if (!linkedAnimationsByPane.hasOwnProperty(pane)) continue;

      controller = this.graphControllerForPane(pane);
      controller.set('animationInfo', null);
    }
  },

  copyPropertiesTo: function (object, props) {
    var self = this;
    object.beginPropertyChanges();
    props.forEach( function (prop) {
      object.set(prop, self.get(prop));
    });
    object.endPropertyChanges();
  },

  /**
    Called on entry to ANIMATION_RUNNING state.
  */
  startAnimating: function () {
    if (!this._mainPane || this._isAnimating) return NO;
    this._isAnimating = YES;
    this.notifyPropertyChange('isAnimating');

    this.get('allAnimatedGraphs').invoke('animate');
  },

  /**
    Called on entry to ANIMATION_STOPPED state.
  */
  stopAnimating: function () {
    if (!this._mainPane || !this._isAnimating) return NO;
    this._isAnimating = NO;
    this.notifyPropertyChange('isAnimating');

    this.get('allAnimatedGraphs').invoke('stop');
  },

  /**
    Called on entry to ANIMATION_CLEARED state.
  */
  clearAnimation: function () {
    this._isAnimating = NO;
    this.notifyPropertyChange('isAnimating');

    this.get('allAnimatedGraphs').invoke('reset');
  }

});
