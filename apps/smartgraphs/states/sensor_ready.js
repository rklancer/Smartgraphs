// ==========================================================================
// Project:   Smartgraphs.SENSOR_READY
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

sc_require('states/sensor_loaded');

/** @class

  State representing that the sensor applet is loaded and ready for the user to click 'start'

  @extends SC.Responder
  @version 0.1
*/

Smartgraphs.SENSOR_READY = SC.Responder.create(
/** @scope Smartgraphs.SENSOR_READY.prototype */ {

  nextResponder: Smartgraphs.SENSOR_LOADED,
  
  didBecomeFirstResponder: function () {
    Smartgraphs.activityViewController.highlightStartControl();
  },
  
  willLoseFirstResponder: function () {
  },
  
  // ..........................................................
  // ACTIONS
  //
  
  startControlWasClicked: function () {
    return this.startSensor();
  },
  
  startSensor: function () {
    Smartgraphs.makeFirstResponder(Smartgraphs.SENSOR_RECORDING);
    return YES;
  }

});
