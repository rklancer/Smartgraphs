// ==========================================================================
// Project:   Smartgraphs.SENSOR_RECORDING
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  State representing that the sensor is in the process of recording data.

  @extends SC.Responder
  @version 0.1
*/

sc_require('states/sensor_ready');

Smartgraphs.SENSOR_RECORDING = SC.Responder.create(
/** @scope Smartgraphs.SENSOR_RECORDING.prototype */ {

  nextResponder: Smartgraphs.SENSOR_READY,
  
  didBecomeFirstResponder: function () {
    Smartgraphs.activityViewController.highlightControlsForRecordingState();
  },
  
  willLoseFirstResponder: function () {
  },
  
  // ..........................................................
  // ACTIONS
  //
  
  stopControlWasClicked: function () {
    Smartgraphs.sensorController.stopRecording();
    Smartgraphs.activityViewController.highlightControlsForReadyState();
    Smartgraphs.makeFirstResponder(Smartgraphs.SENSOR_READY);
    return YES;
  },
  
  clearControlWasClicked: function () {
    Smartgraphs.sensorController.clearRecordedData();
    Smartgraphs.activityViewController.highlightControlsForReadyState();
    Smartgraphs.makeFirstResponder(Smartgraphs.SENSOR_READY);
    return YES;
  }
  
}) ;
