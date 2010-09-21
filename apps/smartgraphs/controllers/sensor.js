// ==========================================================================
// Project:   Smartgraphs.sensorController
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
Smartgraphs.sensorController = SC.ObjectController.create(
/** @scope Smartgraphs.sensorController.prototype */ {

  
  xMin: null,
  xMax: null,

  /**
    A downsample ratio of 1 = 1:1 = sample every point
    a downsample ration of 2 = 2:1 = sample every other point
    etc.
    
    TODO: make downsample ratio settable from startSensorInput action?
  */
  downsampleRatio: 2,
  
  sensorIsReady: NO,
  appletIsAppended: NO,
  _inputStarted: NO,
  _pane: null,
  _series: null,
  
  pane: function () {
    return this._pane;
  }.property(),
  
  register: function (pane, series, xMin, xMax) {
    pane = Smartgraphs.activityViewController.validPaneFor(pane);
    
    if (pane && series && series.get('isExample') === NO) {
      this._pane = pane;
      this._series = series;
      
      if (xMin) this.set('xMin', xMin);
      if (xMax) this.set('xMax', xMax);
      
      return YES;
    }
    return NO;
  },
  
  enableInput: function () {
    if (this._inputStarted || !this._pane || !this._series) {
      return NO;
    }
    this._inputStarted = YES;
    
    if ( !this.get('appletIsAppended') ) {
      Smartgraphs.mainPage.get('mainPane').appendChild( Smartgraphs.appletPage.sensorAppletView.create() );
      this.set('appletIsAppended', YES);
    }

    if (this.get('sensorIsReady')) {
      Smartgraphs.sendAction('sensorIsReadyToRecord');
    }
    else {
      Smartgraphs.sendAction('waitForSensorToLoad');
    }
      
    //   
    //   Smartgraphs.activityViewController.showControls(this._pane);
    // }
    // else {
    //   Smartgraphs.activityViewController.showSensorLoadingView(this._pane);
    // }
    
    return YES;
  },
  
  disableInput: function () {
    Smartgraphs.activityViewController.hideControls();
    this._inputStarted = NO;
    this._series = null;
    this._pane = null;
  },
  
  startRecording: function () {
  },
  
  stopRecording: function () {
  },
  
  reset: function () {
  },

  sensorsReady: function () {
    SC.RunLoop.begin();
    this.set('sensorIsReady', YES);

    if (this._inputStarted) {
      Smartgraphs.sendAction('indicateSensorIsReady');
      //Smartgraphs.activityViewController.showControls(this._pane) ;
    }
    SC.RunLoop.end();
  },
  
  sensorDataReceived: function (type, numPoints, data) {
  }

}) ;
