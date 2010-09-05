// ==========================================================================
// Project:   Smartgraphs.selectedPointsController
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/

// TODO!!!! Separate out 'prediction graph' functionality like _cleanupData and other functionality like
// addSensorPoint()

Smartgraphs.selectedPointsController = SC.ArrayController.create(
/** @scope Smartgraphs.selectedPointsController.prototype */ {

  contentBinding: 'Smartgraphs.selectedSeriesController.points',
  
  addSensorPoint: function (x, y) {
    var point = Smartgraphs.store.createRecord(Smartgraphs.DataPoint, { x: x, y: y, guid: Smartgraphs.getNextGuid() });
    this.pushObject(point);
    Smartgraphs.store.commitRecords();
  }
  
}) ;
