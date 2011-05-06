// ==========================================================================
// Project:   Smartgraphs.animationController
// Copyright: ©2011 Concord Consortium
// Author:    Erich Ocean <erich.ocean@me.com>
// ==========================================================================
/*globals Smartgraphs */

Smartgraphs.animationController = SC.Object.create(
/** @scope Smartgraphs.animationController.prototype */ {
  
  _pane: null,
  _speed: 1,
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
      this._speed = options.speed || 1;
      this._loop = (options.loop !== undefined) ? options.loop : true;
      
      return YES;
    }
    return NO;
  },
  
  /**
    Called on entry to ANIMATION_RUNNING state.
  */
  startAnimating: function () {
    // this._isRecording = YES;
    // this._dataset.set('isStreaming', YES);
    // this._dataset.set('streamSource', this);
    // 
    // this._nsamples = 0;
    // this._appletView.start();
    // 
    // // inform the data set record how many points we expect to add, so the display can make room.
    // var startLength = this._dataset.getPath('points.length');
    // var expectedLength = startLength + Math.floor(1 + this.get('xMax') / (this.get('downsampleRatio') * this.get('dt')));
    // this._dataset.set('expectedLength', expectedLength);
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
