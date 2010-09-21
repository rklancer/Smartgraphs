// ==========================================================================
// Project:   Smartgraphs.SENSOR_STOPPED
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  State representing that the sensor applet has been stopped, ready for data to be cleared or for user to finish
  working with the sensor.

  @extends SC.Responder
  @version 0.1
*/

sc_require('states/sensor_loaded');

Smartgraphs.SENSOR_STOPPED = SC.Responder.create(
/** @scope Smartgraphs.SENSOR_STOPPED.prototype */ {

  nextResponder: Smartgraphs.SENSOR_LOADED,
  
  didBecomeFirstResponder: function () {
    Smartgraphs.activityViewController.highlightClearControl();
  },
  
  willLoseFirstResponder: function () {
  },
  
  // ..........................................................
  // ACTIONS
  //
  
  clearControlWasClicked: function () {
    return this.clearSensor();
  },
  
  clearSensor: function () {
    Smartgraphs.sensorController.clearRecordedData();
    Smartgraphs.makeFirstResponder(Smartgraphs.SENSOR_READY);
    return YES;
  }

});