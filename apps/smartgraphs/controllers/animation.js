// ==========================================================================
// Project:   Smartgraphs.animationController
// Copyright: ©2011 Concord Consortium
// Author:    Erich Ocean <erich.ocean@me.com>
// ==========================================================================
/*globals Smartgraphs */

Smartgraphs.animationController = SC.Object.create(
/** @scope Smartgraphs.animationController.prototype */ {
  
  _pane: null,
  _length: 3000, // default to three seconds
  _loop: true,
  
  pane: function () {
    return this._pane;
  }.property(),
  
  register: function (pane, options) {
    // console.log(options);
    pane = Smartgraphs.activityViewController.validPaneFor(pane);
    options = options || {};
    
    if (pane) {
      this._pane = pane;
      this._length = options.length || 3000; // in milliseconds
      this._loop = (options.loop !== undefined) ? options.loop : true;
      
      this._inAnimating = NO;
      this._progress = 0;
      return YES;
    }
    return NO;
  },
  
  _inAnimating: NO,
  _progress: 0, // in milliseconds
  
  /**
    Called on entry to ANIMATION_RUNNING state.
  */
  startAnimating: function () {
    // if (!this._pane || this._isAnimating) return NO;
    // this._isAnimating = YES;
  },
  
  /**
    Called on entry to ANIMATION_STOPPED state.
  */
  stopAnimating: function () {
    // this._isRecording = NO;
    // this._dataset.set('isStreaming', NO);
    // this._appletView.stop();
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
