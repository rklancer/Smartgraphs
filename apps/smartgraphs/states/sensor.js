// ==========================================================================
// Project:   Smartgraphs.SENSOR
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  Superstate representing that the sensor applet is being loaded up and controls should be shown
  
  Substates include SENSOR_READY, SENSOR_RECORDING, SENSOR_ERROR.

  @extends SC.Responder
  @version 0.1
*/
sc_require('states/activity_step');

Smartgraphs.SENSOR = SC.Responder.create(
/** @scope Smartgraphs.SENSOR.prototype */ {

  nextResponder: Smartgraphs.ACTIVITY_STEP,
  
  didBecomeFirstResponder: function() {
    var registeredOk = Smartgraphs.sensorController.startInput();
    if ( !registeredOk ) Smartgraphs.makeFirstResponder(Smartgraphs.ACTIVITY_STEP);
  },
  
  willLoseFirstResponder: function() {
    Smartgraphs.sensorController.endInput();    
  }
  
  // ..........................................................
  // ACTIONS
  //
  
}) ;
