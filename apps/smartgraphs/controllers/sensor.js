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
    a downsample ratio of 2 = 2:1 = sample every other point
    etc.
    
    TODO: make downsample ratio settable from startSensorInput action?
  */
  downsampleRatio: function () {
    return $.browser.msie ? 3 : 2;          // is there feature detection for 'lousy javascript performance'?
  }(),
  
  /**
    the time interval between data points returned by the sensor
    (eventually we will read this from the new applet)
  */
  
  dt: 0.1,
  
  sensorIsReady: NO,

  _appletView: null,
  _inputIsEnabled: NO,
  _isRecording: NO,
  _pane: null,
  _series: null,
  
  pane: function () {
    return this._pane;
  }.property(),
  
  register: function (pane, series, xMin, xMax) {
    if (this._inputIsEnabled) return NO;    

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
    if (this._inputIsEnabled || !this._pane || !this._series) {
      return NO;
    }
    this._inputIsEnabled = YES;
    
    if ( !this._appletView ) {
      this._appletView = Smartgraphs.appletPage.sensorAppletView.create();
      Smartgraphs.mainPage.get('mainPane').appendChild(this._appletView);
    }

    if (this.get('sensorIsReady')) {
      Smartgraphs.sendAction('sensorHasLoaded');
    }
    else {
      Smartgraphs.sendAction('waitForSensorToLoad');
    }

    return YES;
  },
  
  disableInput: function () {
    this._inputIsEnabled = NO;
    this._isRecording = NO;
    this._series = null;
    this._pane = null;
  },
  
  startRecording: function () {
    this._isRecording = YES;
    this._nsamples = 0;
    this._appletView.start();
  },
  
  stopRecording: function () {
    this._isRecording = NO;
    this._appletView.stop();
  },
  
  clearRecordedData: function () {
    SC.RunLoop.begin();
    var points = this._series.get('points');

    // need to cache the items in the 'points' ManyArray as forEach doesn't deal well with points being removed while
    // it is iterating over them
    var toDestroy = [];
    points.forEach( function (point) {
      toDestroy.push(point);
    });
    
    // set 'series' to null or else destroyed points hang around in our 'points' ManyArray, just with DESTROYED status
    toDestroy.forEach( function (point) {
      point.set('series', null);
      point.destroy();
    });
    Smartgraphs.store.commitRecords();
    SC.RunLoop.end();
  },

  /**
    applet callback
  */
  sensorsReady: function () {
    SC.RunLoop.begin();
    this.set('sensorIsReady', YES);
    if (this._inputIsEnabled) {
      Smartgraphs.sendAction('sensorHasLoaded');
    }
    SC.RunLoop.end();
  },

  /**
    applet callback
  */
  dataReceived: function (type, numPoints, data) {
    
    if ( !(this._inputIsEnabled && this._isRecording) ) {
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
