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

  nextResponder: null,        // will generally be set 
  
  didBecomeFirstResponder: function() {
    // TODO: differentiate the pane containing the applet, which might as well stay resident in the DOM once it
    // loads, and the pane containing the applet controls, which we can append and remove at will.
    Smartgraphs.appletPage.get('appletPane').append();
  },
  
  willLoseFirstResponder: function() {
    Smartgraphs.appletPage.get('appletPane').remove();
  },
  
  // This state is intended to be 'pushed'. resignFirstResponder to get the old firstResponder back
  resignFirstResponder: function (evt) {
    if (Smartgraphs.get('firstResponder') === this) {
      Smartgraphs.makeFirstResponder(this.get('nextResponder'), evt);
    }
    return YES;
  },
  
  // ..........................................................
  // EVENTS
  //
  
  // TODO migrate this into SENSOR_RECORDING state
  sensorDataReceived: function (context, args) {
    Smartgraphs.selectedPointsController.addSensorPoint(args.x, args.y);
  },
  
  // NOTE normally you end sensor input by virtue of finishing the guide step, thus change firstResponder
  endSensorInput: function (context, args) {
    this.resignFirstResponder();
  }
  
}) ;
