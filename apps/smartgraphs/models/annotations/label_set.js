// ==========================================================================
// Project:   Smartgraphs.LabelSet
// Copyright: ©2011 Concord Consortium
// Author:    Richard Klancer <rpk@pobox.com>
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

  labels: SC.Record.toMany('Smartgraphs.Label'),
  
  isRemovalEnabled: NO,
  
  createChildLabel: function () {
    var label = this.get('store').createRecord(Smartgraphs.Label, {
      activity: this.getPath('activity.id'),
      url:      Smartgraphs.getNextGuid(),
      name:     null,      // anonymous label
      text:    'New Label'
    });
    label.set('labelSet', this);
    this.get('labels').pushObject(label);
    return label;
  },
  
  removeLabel: function (label) {
    this.get('labels').removeObject(label);
  },
  
  enableRemoval: function () {
    this.set('isRemovalEnabled', YES);
    this.get('labels').invoke('notifyPropertyChange', 'isRemovalEnabled');
  },
  
  disableRemoval: function () {
    this.set('isRemovalEnabled', NO);
    this.get('labels').invoke('notifyPropertyChange', 'isRemovalEnabled');    
  }

});

Smartgraphs.LabelSet.viewClass = Smartgraphs.LabelSetView;
