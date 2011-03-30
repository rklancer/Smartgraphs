// ==========================================================================
// Project:   Smartgraphs.sensorController
// Copyright: ©2010 Concord Consortium
// Author:    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
Smartgraphs.sensorController = SC.Object.create(
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
    The time interval between data points returned by the sensor
    (Eventually we will read this from the new applet)
  */
  dt: 0.1,
  
  sensorIsReady: NO,

  _appletView: null,
  _inputIsEnabled: NO,
  _isRecording: NO,
  _pane: null,
  _dataset: null,
  
  pane: function () {
    return this._pane;
  }.property(),
  
  register: function (pane, dataset, xMin, xMax) {
    if (this._inputIsEnabled) return NO;    

    pane = Smartgraphs.activityViewController.validPaneFor(pane);
    
    var meters = Smartgraphs.store.find(Smartgraphs.Unit, '/builtins/units/meters');
    var seconds = Smartgraphs.store.find(Smartgraphs.Unit, '/builtins/units/seconds');
    
    if (pane && dataset && dataset.get('xUnits') === seconds && dataset.get('yUnits') === meters) {
      this._pane = pane;
      this._dataset = dataset;
      
      if (xMin) this.set('xMin', xMin);
      if (xMax) this.set('xMax', xMax);
      
      return YES;
    }
    return NO;
  },
  
  /** 
    Called on entry to SENSOR state (i.e., the parent state of the various SENSOR_* states).
    register() must be called prior to calling this method
  */
  enableInput: function () {
    if (this._inputIsEnabled || !this._pane || !this._dataset) {
      return NO;
    }
    this._inputIsEnabled = YES;
    
    if ( !this._appletView ) {
      this._appletView = Smartgraphs.appletPage.sensorAppletView.create();
      Smartgraphs.mainPage.get('mainPane').appendChild(this._appletView);
    }

    if (this.get('sensorIsReady')) {
      Smartgraphs.statechart.sendAction('sensorHasLoaded');
    }
    else {
      Smartgraphs.statechart.sendAction('waitForSensorToLoad');
    }

    return YES;
  },

  /** 
    Called on exit from SENSOR state (i.e., the parent state of the various SENSOR_* states).
  */
  disableInput: function () {
    this._inputIsEnabled = NO;
    this._dataset = null;
    this._pane = null;
  },
  
  /**
    Called on entry to SENSOR_RECORDING state.
  */
  startRecording: function () {
    this._isRecording = YES;
    this._dataset.set('isStreaming', YES);
    this._dataset.set('streamSource', this);
    
    this._nsamples = 0;
    this._appletView.start();
    
    // inform the data set record how many points we expect to add, so the display can make room.
    var startLength = this._dataset.getPath('points.length');
    var expectedLength = startLength + Math.floor(1 + this.get('xMax') / (this.get('downsampleRatio') * this.get('dt')));
    this._dataset.set('expectedLength', expectedLength);
  },
  
  /**
    Called on exit from SENSOR_RECORDING state.
  */
  stopRecording: function () {
    this._isRecording = NO;
    this._dataset.set('isStreaming', NO);
    this._appletView.stop();
  },
  
  clearRecordedData: function () {
    SC.RunLoop.begin();
    var points = this._dataset.get('points');

    // need to cache the items in the 'points' ManyArray as forEach doesn't deal well with points being removed while
    // it is iterating over them
    var toDestroy = [];
    points.forEach( function (point) {
      toDestroy.push(point);
    });
    
    // set 'dataset' to null or else destroyed points hang around in our 'points' ManyArray, just with DESTROYED status
    toDestroy.forEach( function (point) {
      point.set('dataset', null);
      point.destroy();
    });
    SC.RunLoop.end();
  },

  /**
    applet callback
  */
  sensorsReady: function () {
    SC.RunLoop.begin();
    this.set('sensorIsReady', YES);
    if (this._inputIsEnabled) {
      Smartgraphs.statechart.sendAction('sensorHasLoaded');
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
        
        // 'stopSensor' action results in an applet method being called inline. This does not work well in all
        // browsers (they seem to trip up when the applet method is called from within an applet callback.)
        // Therefore, use setTimeout to trigger the stopSensor action after the callback finishes. Note that using
        // this.invokeLater() rather than setTimeout did not seem to work (the invokeLater blocks queued up 
        // indefinitely.)

        setTimeout( function () {
          SC.RunLoop.begin();
          Smartgraphs.statechart.sendAction('stopSensor');
          SC.RunLoop.end();
        }, 10);

        return;
      }
      
      if ( this._nsamples % downsampleRatio === 0 ) {
        SC.RunLoop.begin();
        point = Smartgraphs.store.createRecord(Smartgraphs.DataPoint, { x: x, y: y, guid: Smartgraphs.getNextGuid() });
        this._dataset.set('latestPoint', point);
        this._dataset.get('points').pushObject(point);
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
