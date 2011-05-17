// ==========================================================================
// Project:   Smartgraphs.LabelSet
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals Smartgraphs */

sc_require('models/annotation');
sc_require('views/label_set');

/** @class

  A label set is a named, arbitrarily-sized collection of anonymous labels.

  @extends Smartgraphs.Annotation
  @version 0.1
*/
Smartgraphs.LabelSet = Smartgraphs.Annotation.extend(
/** @scope Smartgraphs.LabelSet.prototype */ {

  labels: SC.Record.toMany('Smartgraphs.LabelAnnotation'),
  
  createChildLabel: function () {
    var label = this.get('store').createRecord(Smartgraphs.LabelAnnotation, {
      activity: this.getPath('activity.id'),
      url:      Smartgraphs.getNextGuid(),
      name:     null,      // anonymous label
      text:    'New Label'
    });
    this.get('labels').pushObject(label);
    return label;
  },
  
  removeLabel: function () {
  },
  
  enableRemoval: function () {
  },
  
  disableRemoval: function () {
  }

});

Smartgraphs.LabelSet.viewClass = Smartgraphs.LabelSetView;
