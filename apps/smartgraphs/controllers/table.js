// ==========================================================================
// Project:   Smartgraphs.tableController
// Copyright: ©2010 Concord Consortium
// Author:    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

sc_require('mixins/annotation_support');  

/** @class

  The table controller manages a set of Smartgraphs.Point objects that represent a particular sampling of a
  DataDef. It is intended to be the content of a Smartgraphs.TableView.
  
  At the moment, it also instructs the tableview when to switch between 'table display' and 'numeric display' mode.
  This is done when data is streaming into the datadef from a sensor, because the table view is inefficient at 
  appending new elements and cannot do so at interactive speeds. ('Numeric display' mode displays just the latest
  sensor reading, instead of trying to append the latest sensor reading to a table.)
  
  @extends SC.Object
  @extends Smartgraphs.AnnotationSupport
*/
Smartgraphs.TableController = SC.ArrayController.extend( Smartgraphs.AnnotationSupport,
/** @scope Smartgraphs.tableController.prototype */ {
  
  datadef: null,
  pointset: null,
  
  selectionBinding:    '*pointset.selection',
  isSelectableBinding: '*datadef.isSelectable',
  isStreamingBinding:  '*datadef.isStreaming',
  latestXBinding:      '*datadef.latestX',
  latestYBinding:      '*datadef.latestY',
  xUnitsBinding:       '*datadef.xUnits',
  yUnitsBinding:       '*datadef.yUnits',
  xShortLabelBinding:  '*datadef.xShortLabel',
  yShortLabelBinding:  '*datadef.yShortLabel',
  
  /**
    Whether to display the table (or else the numeric view)
    
    @property {Boolean}
  */
  showTable: function () {
    return !this.get('isStreaming');
  }.property('isStreaming').cacheable(),
  
  
  clear: function () {
    this.clearAnnotations();
    this.set('datadef', null);
    this.set('pointset', null);
    this.set('content', []);    
  },
  
  setupTable: function (config) {      
    var datadef,
        datadefName,
        options = {},
        rep;
        
    this.clear();
    
    if (SC.typeOf(config.data) === SC.T_STRING) {
      datadefName = config.data;
    }
    else {
      datadefName = config.data[0];
      options = config.data[1];
    }

    datadef = Smartgraphs.activityObjectsController.findDatadef(datadefName);
    rep = datadef.getNewRepresentation(options);

    this.set('datadef', datadef);
    this.set('pointset', rep.get('pointset'));
    this.set('content', this.getPath('pointset.points'));
  }

});
