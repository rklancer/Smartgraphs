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
  
  /* the rate at which samples are received */
  
  dt: 0.1,
  
  sensorIsReady: NO,

  _appletView: null,
  _inputStarted: NO,
  _recording: NO,
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
    
    if ( !this._appletView ) {
      this._appletView = Smartgraphs.appletPage.sensorAppletView.create();
      Smartgraphs.mainPage.get('mainPane').appendChild(this._appletView);
    }

    if (this.get('sensorIsReady')) {
      Smartgraphs.sendAction('sensorIsReadyToRecord');
    }
    else {
      Smartgraphs.sendAction('waitForSensorToLoad');
    }

    return YES;
  },
  
  disableInput: function () {
    this._inputStarted = NO;
    this._recording = NO;
    this._series = null;
    this._pane = null;
  },
  
  startRecording: function () {
    this._recording = YES;
    this._nsamples = 0;
    this._appletView.start();
  },
  
  stopRecording: function () {
    this._recording = NO;
    this._appletView.stop();
  },
  
  clearRecordedData: function () {
    SC.RunLoop.begin();
    this._series.get('points').invoke('destroy');
    SC.RunLoop.end();
  },

  /**
    applet callback
  */
  sensorsReady: function () {
    SC.RunLoop.begin();
    this.set('sensorIsReady', YES);
    if (this._inputStarted) {
      Smartgraphs.sendAction('sensorIsReadyToRecord');
    }
    SC.RunLoop.end();
  },

  /**
    applet callback
  */
  dataReceived: function (type, numPoints, data) {
    
    if ( !(this._inputStarted && this._recording) ) {
      return;
    }
    
    var dt = this.get('dt');
    var downsampleRatio = this.get('downsampleRatio');
    var x, y;
    var point;
    
    for (var i = 0; i < numPoints; i++) {
      x = this._nsamples * dt;
      y = data[i];
      
      if (x > this.get('xMax')) {
        Smartgraphs.sendAction('stopSensor');
        return;
      }
      
      if ( this._nsamples % downsampleRatio === 0 ) {
        SC.RunLoop.begin();
        point = Smartgraphs.store.createRecord(Smartgraphs.DataPoint, { x: x, y: y, guid: Smartgraphs.getNextGuid() });
        this._series.get('points').pushObject(point);
        Smartgraphs.store.commitRecords();
        SC.RunLoop.end();
      }
      this._nsamples++;
    }
  },
  
  /**
    applet callback (applet doesn't send useful information with this callback yet)
  */
  dataStreamEvent: function () {
  }

}) ;
