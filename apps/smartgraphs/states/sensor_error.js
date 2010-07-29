// ==========================================================================
// Project:   Smartgraphs.SENSOR_ERROR
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  State representing an error with the sensor. You could transition here from SENSOR_RECORDING if data stops coming.

  @extends SC.Responder
  @version 0.1
*/
Smartgraphs.SENSOR_ERROR = SC.Responder.create(
/** @scope Smartgraphs.SENSOR_ERROR.prototype */ {

  /**
    The next state to check if this state does not implement the action.
  */
  nextResponder: Smartgraphs.SENSOR,
  
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
