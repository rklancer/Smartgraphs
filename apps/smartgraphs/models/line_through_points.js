// ==========================================================================
// Project:   Smartgraphs.LineThroughPoints
// Copyright: ©2010 Concord Consortium
// @author    Parker Morse <pmorse@cantinaconsulting.com>
// ==========================================================================
/*globals Smartgraphs */

sc_require('models/annotation');
sc_require('models/data_point');
sc_require('views/line_through_points');

/** @class

  A line through the entire graph, passing through two given points and extending to the borders
  of the graph canvas in either direction.

  @extends Smartgraphs.Annotation
  @version 0.1
*/

(function () {
  
  
  // FIXME generalize this transform and put it somewhere for use by other record types!
  
  var transform = { 
    /** @private - convert the datahash value to a DataPoint record:
       (1) by dereferencing it as a DataPoint id, if it looks like a url (starts with '/')
       (2) by finding an annotation with the specified name and dereferencing its 'point' property, if it looks like a name
   */  
    to: function(idOrName, attr, recordType, parentRecord) {
      var annotation, point;
    
      if (SC.none(idOrName) || (idOrName==="")) return null;

      if (idOrName[0] === "/") {
        return parentRecord.get('store').find(recordType, idOrName);
      }
      annotation = Smartgraphs.activityObjectsController.findAnnotation(idOrName);
      point = annotation && annotation.get('point');
      return point || null;
    },

    /** @private - convert a record instance to a record id */
    from: function(record) { return record ? record.get('id') : null; }
  };

  Smartgraphs.LineThroughPoints = Smartgraphs.Annotation.extend(
  /** @scope Smartgraphs.LineThroughPoints.prototype */ {

    /**
      The first of the two points which define (but do not limit) the line.
    
      @property {Smartgraphs.DataPoint}
    */
    point1: SC.Record.toOne('Smartgraphs.DataPoint', { transform: transform }),
  
    /**
      The second of the two points which define (but do not limit) the line.
    
      @property {Smartgraphs.DataPoint}
    */
    point2: SC.Record.toOne('Smartgraphs.DataPoint', { transform: transform })

  }) ;

  // let the graph view know how to instantiate a view class to display this item
  Smartgraphs.LineThroughPoints.viewClass = Smartgraphs.LineThroughPointsView;

}());
