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

sc_require('states/sensor');

Smartgraphs.SENSOR_RECORDING = SC.Responder.create(
/** @scope Smartgraphs.SENSOR_RECORDING.prototype */ {

  nextResponder: Smartgraphs.SENSOR,
  
  didBecomeFirstResponder: function() {
    // Called when this state becomes first responder
  },
  
  willLoseFirstResponder: function() {
    // Called when this state loses first responder
  }
  
  // ..........................................................
  // ACTIONS
  //
  
  
}) ;
