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
    // TODO: differentiate the pane containing the applet, which might as well stay resident in the DOM once it
    // loads, and the pane containing the applet controls, which we can append and remove at will.
    Smartgraphs.appletPage.get('appletPane').append();
  },
  
  willLoseFirstResponder: function() {
    Smartgraphs.appletPage.get('appletPane').remove();
    Smartgraphs.selectedSeriesController.set('content', null);
  },
  
  // ..........................................................
  // ACTIONS
  //
  
  // TODO migrate this into SENSOR_RECORDING state
  sensorDataReceived: function (context, args) {
    Smartgraphs.selectedPointsController.addSensorPoint(args.x, args.y);
  }
  
}) ;
