// ==========================================================================
// Project:   Smartgraphs.SENSOR_TOOL
// Copyright: ©2011 Concord Consortium
// Author:    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  Superstate representing that the sensor applet is being loaded or has been loaded

  @extends SC.State
  @version 0.1
*/

Smartgraphs.SENSOR_TOOL = SC.State.extend(
/** @scope Smartgraphs.SENSOR_TOOL.prototype */ {

  initialSubstate: 'SENSOR_START',

  exitState: function () {
    Smartgraphs.sensorTool.stopRecording();
    Smartgraphs.sensorTool.get('graphController').hideControls();
  },

  // ..........................................................
  // ACTIONS
  //

  sensorHasLoaded: function () {
    this.gotoState('SENSOR_LOADED');
    return YES;
  },

  waitForSensorToLoad: function () {
    this.gotoState('SENSOR_LOADING');
    return YES;
  },


  SENSOR_START: SC.State.design({

    enterState: function () {
      Smartgraphs.sensorAppletController.append({listenerPath: 'Smartgraphs.sensorTool'});

      if (Smartgraphs.sensorTool.get('sensorIsReady')) {
        Smartgraphs.statechart.sendAction('sensorHasLoaded');
      }
      else {
        Smartgraphs.statechart.sendAction('waitForSensorToLoad');
      }
    }

  }),


  SENSOR_LOADING: SC.State.design({
    enterState: function () {
      Smartgraphs.sensorTool.get('graphController').showSensorLoadingView();
    }
  }),


  SENSOR_LOADED: SC.State.design({

    enterState: function () {
      Smartgraphs.sensorTool.get('graphController').revealAllControls();
      Smartgraphs.sensorTool.get('graphController').showControls();
    },

    initialSubstate: 'SENSOR_READY',


    SENSOR_READY: SC.State.design({

      enterState: function () {
        Smartgraphs.sensorTool.get('graphController').highlightStartControl();
      },

      startControlWasClicked: function () {
        return this.startSensor();
      },

      startSensor: function () {
        this.gotoState('SENSOR_RECORDING');
        return YES;
      }
    }),


    SENSOR_RECORDING:  SC.State.design({

      enterState: function () {
        Smartgraphs.sensorTool.startRecording();
        Smartgraphs.sensorTool.get('graphController').highlightStopControl();
      },

      exitState: function () {
        Smartgraphs.sensorTool.stopRecording();
      },

      stopControlWasClicked: function () {
        return this.stopSensor();
      },

      stopSensor: function () {
        this.gotoState('SENSOR_STOPPED');
        return YES;
      }
    }),


    SENSOR_STOPPED: SC.State.design({

      enterState: function () {
        Smartgraphs.sensorTool.get('graphController').highlightClearControl();
      },

      clearControlWasClicked: function () {
        return this.clearSensor();
      },

      clearSensor: function () {
        Smartgraphs.sensorTool.clearRecordedData();
        this.gotoState('SENSOR_READY');
        return YES;
      }
    })

  })

});
