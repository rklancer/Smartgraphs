// ==========================================================================
// Project:   Smartgraphs.sensorTool
// Copyright: ©2011 Concord Consortium
// Author:    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

sc_require('tools/tool');

/** @class

  @extends Smartgraphs.Tool
*/
Smartgraphs.sensorTool = Smartgraphs.Tool.create(
/** @scope Smartgraphs.sensorTool.prototype */ {

  name: 'sensor',
  state: 'SENSOR_TOOL',
  
  datadefName: null,
  datadef: null,
  controlsPane: null,
  graphController: null,
  
  appletView: null,
  sensorIsReady: NO,
  nSamples: 0,
  
  /**
    The time interval between data points returned by the sensor
  */
  dt: 0.1,
  
  setup: function (args) {
    this.set('datadefName', args.data);
    this.set('datadef', this.getDatadef(args.data));
    
    this.set('controlsPane', args.controlsPane);
    this.set('graphController', this.graphControllerForPane(args.controlsPane));
    
    if (!this.get('appletView')) this.set('appletView', Smartgraphs.appletPage.sensorAppletView.create());
    
    Smartgraphs.statechart.gotoState(this.get('state'));
  },
  
  clearSetup: function () {
    this.set('datadefName', null);
    this.set('datdef', null);
    this.set('conrolsPane', null);
    this.set('graphController', null);
    // don't clear appletView or sensorIsReady!
  },
  
  
  startRecording: function () {
    this.setPath('datadef.isStreaming', YES);
    this._nSamples = 0;
    this.get('appletView').start();
    console.log('startRecording');   
  },
  
  stopRecording: function () {
    this.setPath('datadef.isStreaming', NO);
    this.get('appletView').stop();
    console.log('stopRecording');
  },
  
  clearRecordedData: function () {
    console.log('clearRecordedData');
    this.get('datadef').clearPoints();
  },
  
  /**
    applet callback
  */
  sensorsReady: function () {
    SC.RunLoop.begin();
    this.set('sensorIsReady', YES);
    Smartgraphs.statechart.sendAction('sensorHasLoaded');
    SC.RunLoop.end();
  },
  
  /**
    applet callback
  */
  dataReceived: function (type, numPoints, data) {
    var dt = this.get('dt'),
        // downsampleRatio = this.get('downsampleRatio');
        x, 
        y,
        i;
      // point;
    
    for (i = 0; i < numPoints; i++) {
      x = this._nSamples * dt;
      y = data[i];
      
      // if (x > this.get('xMax')) {
      //   
      //   // 'stopSensor' action results in an applet method being called inline. This does not work well in all
      //   // browsers (they seem to trip up when the applet method is called from within an applet callback.)
      //   // Therefore, use setTimeout to trigger the stopSensor action after the callback finishes. Note that using
      //   // this.invokeLater() rather than setTimeout did not seem to work (the invokeLater blocks queued up 
      //   // indefinitely.)
      // 
      //   setTimeout( function () {
      //     SC.RunLoop.begin();
      //     Smartgraphs.statechart.sendAction('stopSensor');
      //     SC.RunLoop.end();
      //   }, 10);
      // 
      //   return;
      // }
      
      // if ( this._nsamples % downsampleRatio === 0 ) {
      //   SC.RunLoop.begin();
      //   point = Smartgraphs.store.createRecord(Smartgraphs.DataPoint, { x: x, y: y, guid: Smartgraphs.getNextGuid() });
      //   this._dataset.set('latestPoint', point);
      //   this._dataset.get('points').pushObject(point);
      //   SC.RunLoop.end();
      // }
      
      this.get('datadef').addPoint(x, y);
      this._nSamples++;
    }
  },
  /**
    applet callback (applet doesn't send useful information with this callback yet)
  */
  dataStreamEvent: function () {
  }

});