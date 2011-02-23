// ==========================================================================
// Project:   Smartgraphs.DataPoint
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Smartgraphs.DataPoint = SC.Record.extend(
/** @scope Smartgraphs.DataPoint.prototype */ {

  x: SC.Record.attr(Number),
  y: SC.Record.attr(Number),
  dataset: SC.Record.toOne('Smartgraphs.Dataset', { inverse: 'points', isMaster: YES, aggregate: YES } ),
  
  xRounded: function () {
    return Math.round(this.get('x') * 100) / 100;
  }.property('x').cacheable(),
  
  yRounded: function () {
    return Math.round(this.get('y') * 100) / 100;
  }.property('y').cacheable()

});


SC.RecordAttribute.registerTransform(Smartgraphs.DataPoint, { 
  /** @private - convert the datahash value to a DataPoint record:
     (1) by dereferencing it as a DataPoint id, if it looks like a url (starts with '/')
     (2) by finding an annotation with the specified name and dereferencing its 'point' property, if it looks like a name
 */  
  to: function(idOrName, attr, recordType, parentRecord) {
    var annotation, point;
  
    if (SC.none(idOrName) || (idOrName==="")) return null;
    annotation = Smartgraphs.activityObjectsController.findAnnotation(idOrName);
    point = annotation && annotation.get('point');
    if (point) return point;

    point = Smartgraphs.store.find(recordType, idOrName);
    return point || null;
  },

  /** @private - convert a record instance to a record id */
  from: function(record) { return record ? record.get('id') : null; }
});
