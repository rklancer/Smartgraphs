// ==========================================================================
// Project:   Smartgraphs.sensorTool
// Copyright: ©2011 Concord Consortium
// Author:    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

sc_require('tools/tool');

/** @class

  @extends Smartgraphs.Tool
*/
Smartgraphs.sensorTool = Smartgraphs.Tool.create(
/** @scope Smartgraphs.sensorTool.prototype */ {

  name: 'sensor',
  state: 'SENSOR_TOOL',
  
  datadefName: null,
  controlsPane: null,
  graphController: null,
  
  appletView: null,
  sensorIsReady: NO,
  
  setup: function (args) {
    this.set('datadefName', args.data);
    this.set('controlsPane', args.controlsPane);
    this.set('graphController', this.graphControllerForPane(args.controlsPane));
    
    if (!this.get('appletView')) this.set('appletView', Smartgraphs.appletPage.sensorAppletView.create());
    
    Smartgraphs.statechart.gotoState(this.get('state'));
  },
  
  clearSetup: function () {
    this.set('datadefName', null);
    this.set('conrolsPane', null);
    this.set('graphController', null);
    // don't clear appletView or sensorIsReady
  },
  
  /**
    applet callback
  */
  sensorsReady: function () {
    SC.RunLoop.begin();
    this.set('sensorIsReady', YES);
    Smartgraphs.statechart.sendAction('sensorHasLoaded');
    SC.RunLoop.end();
  }

});