// ==========================================================================
// Project:   Smartgraphs.SENSOR
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

sc_require('states/activity_step');

/** @class

  Superstate representing that the sensor applet is being loaded up or has been loaded

  @extends SC.Responder
  @version 0.1
*/

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
  
  sensorHasLoaded: function () {
    Smartgraphs.makeFirstResponder(Smartgraphs.SENSOR_LOADED);
    return YES;
  },
  
  waitForSensorToLoad: function () {
    Smartgraphs.makeFirstResponder(Smartgraphs.SENSOR_LOADING);
    return YES;
  }
  
}) ;
