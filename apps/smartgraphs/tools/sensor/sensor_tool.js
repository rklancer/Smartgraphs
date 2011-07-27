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
  
  setup: function (args) {
    this.set('datadefName', args.data);
    Smartgraphs.statechart.gotoState(this.get('state'));
  },
  
  clearSetup: function () {
    this.set('datadefName', null);
  }

});