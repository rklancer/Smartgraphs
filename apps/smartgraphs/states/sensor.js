// ==========================================================================
// Project:   Smartgraphs.SENSOR
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Smartgraphs */

/** @class

  Superstate representing that the sensor applet is being loaded up and controls should be shown
  
  Substates include SENSOR_READY, SENSOR_RECORDING, SENSOR_ERROR.

  @extends SC.Responder
  @version 0.1
*/
Smartgraphs.SENSOR = SC.Responder.create(
/** @scope Smartgraphs.SENSOR.prototype */ {

  /**
    The next state to check if this state does not implement the action.
  */
  nextResponder: null,
  
  didBecomeFirstResponder: function() {
    // Called when this state becomes first responder
  },
  
  willLoseFirstResponder: function() {
    // Called when this state loses first responder
  },
  
  // ..........................................................
  // EVENTS
  //
  
  // add event handlers here
  someAction: function() {
    
  }
  
}) ;
