// ==========================================================================
// Project:   Smartgraphs.SENSOR
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  State representing that the sensor applet is being loaded up and controls should be shown

  @extends SC.Responder
  @version 0.1
*/
sc_require('states/activity_step');

Smartgraphs.SENSOR = SC.Responder.create(
/** @scope Smartgraphs.SENSOR.prototype */ {

  nextResponder: Smartgraphs.ACTIVITY_STEP,
  
  didBecomeFirstResponder: function () {
    var enableSucceeded = Smartgraphs.sensorController.enableInput();
    if ( !enableSucceeded ) {
      Smartgraphs.makeFirstResponder(Smartgraphs.ACTIVITY_STEP);
    }
  },
  
  willLoseFirstResponder: function () {
    Smartgraphs.sensorController.disableInput();
    Smartgraphs.activityViewController.hideControls();    
  },
  
  // ..........................................................
  // ACTIONS
  //
  
  sensorIsReadyToRecord: function () {
    Smartgraphs.makeFirstResponder(Smartgraphs.SENSOR_READY);
    return YES;
  },
  
  waitForSensorToLoad: function () {
    Smartgraphs.makeFirstResponder(Smartgraphs.SENSOR_LOADING);
    return YES;
  }
  
}) ;
