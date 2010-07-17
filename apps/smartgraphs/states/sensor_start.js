// ==========================================================================
// Project:   Smartgraphs.SENSOR_START
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Smartgraphs */

/** @class

  State representing that the sensor applet is being loaded up and controls should be shown
  
  Transitions to SENSOR_READY when the sensor applet 

  @extends SC.Responder
  @version 0.1
*/
Smartgraphs.SENSOR_START = SC.Responder.create(
/** @scope Smartgraphs.SENSOR_START.prototype */ {

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
