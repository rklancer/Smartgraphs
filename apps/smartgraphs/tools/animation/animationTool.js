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
  _length: 3000, // default to three seconds
  _loop: true,
  
  pane: function () {
    return this._pane;
  }.property(),
  
  setup: function (args) {
    args = args || {};
    var pane = Smartgraphs.activityViewController.validPaneFor(args.pane);
    
    if (pane) {
      this._pane = pane;
      this._length = args.length || 3000; // in milliseconds
      this._loop = (args.loop !== undefined) ? args.loop : true;
      
      this._inAnimating = NO;
      this._progress = 0;
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
    return YES;
  },
  
  /**
    Called on entry to ANIMATION_STOPPED state.
  */
  stopAnimating: function () {
    if (!this._pane || !this._isAnimating) return NO;
    this._isAnimating = NO;
    return YES;
  },
  
  /**
    Called on entry to ANIMATION_CLEARED state.
  */
  clearAnimation: function () {
    // SC.RunLoop.begin();
    // var points = this._dataset.get('points');
    // 
    // // need to cache the items in the 'points' ManyArray as forEach doesn't deal well with points being removed while
    // // it is iterating over them
    // var toDestroy = [];
    // points.forEach( function (point) {
    //   toDestroy.push(point);
    // });
    // 
    // // set 'dataset' to null or else destroyed points hang around in our 'points' ManyArray, just with DESTROYED status
    // toDestroy.forEach( function (point) {
    //   point.set('dataset', null);
    //   point.destroy();
    // });
    // SC.RunLoop.end();
  }

});