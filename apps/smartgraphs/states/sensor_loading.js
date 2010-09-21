// ==========================================================================
// Project:   Smartgraphs.SENSOR_LOADING
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  State representing an error with the sensor. You could transition here from SENSOR_RECORDING if data stops coming.

  @extends SC.Responder
  @version 0.1
*/

sc_require('states/sensor');

Smartgraphs.SENSOR_LOADING = SC.Responder.create(
/** @scope Smartgraphs.SENSOR_LOADING.prototype */ {

  nextResponder: Smartgraphs.SENSOR,
  
  didBecomeFirstResponder: function () {
    Smartgraphs.activityViewController.showSensorLoadingView(Smartgraphs.sensorController.get('pane'));
  },
  
  willLoseFirstResponder: function () {
  }
  
  // ..........................................................
  // ACTIONS
  //

  
}) ;
