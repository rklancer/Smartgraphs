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
  xMin: null,
  xMax: null,

  sensorIsReady: NO,
  nSamples: 0,
  downsampleRatio: 2,     // don't adjust for IE...?

  /**
    The time interval between data points returned by the sensor
  */
  dt: 0.1,

  setup: function (args) {
    var datadef         = this.getDatadef(args.data),
        pane            = Smartgraphs.activityViewController.validPaneFor(args.controlsPane),
        graphController = this.graphControllerForPane(pane),
        xAxis,
        xMin,
        xMax;

    if (!datadef || !pane) {
      console.error("invalid setup for sensorTool");
      return;
    }

    if (!graphController) {
      console.error("sensorTool setup couldn't find correct graph controller");
      return;
    }

    this.set('datadef', datadef);
    this.set('datadefName', datadef.get('name'));
    this.set('controlsPane', pane);
    this.set('graphController', graphController);

    xAxis = graphController.get('xAxis');
    this.set('xMin', SC.none(args.xMin) ? xAxis && xAxis.get('min') : args.xMin);
    this.set('xMax', SC.none(args.xMax) ? xAxis && xAxis.get('max') : args.xMax);

    Smartgraphs.statechart.gotoState(this.get('state'));
  },

  clearSetup: function () {
    this.set('datadefName', null);
    this.set('datdef', null);
    this.set('controlsPane', null);
    this.set('graphController', null);
    // don't clear sensorIsReady!
  },

  startRecording: function () {
    this.setPath('datadef.isStreaming', YES);
    this._nSamples = 0;
    Smartgraphs.sensorAppletController.start();
  },

  stopRecording: function () {
    this.setPath('datadef.isStreaming', NO);
    Smartgraphs.sensorAppletController.stop();
  },

  clearRecordedData: function () {
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
    var dt              = this.get('dt'),
        downsampleRatio = this.get('downsampleRatio'),
        x,
        y,
        i;

    for (i = 0; i < numPoints; i++) {
      x = this._nSamples * dt;
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

      if ( this._nSamples % downsampleRatio === 0 ) {
        SC.RunLoop.begin();
        this.get('datadef').addPoint(x, y);
        SC.RunLoop.end();
      }

      this._nSamples++;
    }
  },

  /**
    applet callback (applet doesn't send useful information with this callback yet)
  */
  dataStreamEvent: function () {
  }

});
