// ==========================================================================
// Project:   Smartgraphs.AnnotatableParentView
// Copyright: ©2011 Concord Consortium
// Author:    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs RaphaelViews */

/** @class

  Used to extend DatasetViews and Annotation views so they respect override properties set by 'property override' annotations.

*/

Smartgraphs.AnnotatableParentView = {

  // FIXME I don't know why 'initMixin' won't work here.
  init: function () {
    sc_super();
    this._apv_baseValues = {}; 
    this._apv_targetGuids = [];       
    
    var queues = this.getPath('controller.overrideQueuesByTarget');
    var target = this.get('item');
    var targetGuid = SC.guidFor(target);
    if (!queues[targetGuid]) queues[targetGuid] = [];
    
    queues[targetGuid].addObserver('[]', this, this._apv_overridePropertyDidChange);
    this._apv_targetGuids.push(targetGuid);
  },
  
  willRemoveFromDataView: function () {
    var queues = this.getPath('controller.overrideQueuesByTarget');
    var self = this;
    this._apv_targetGuids.forEach( function (targetGuid) {
      queues[targetGuid].removeObserver('[]', self, self._apv_overridePropertyDidChange);
    });
    this._apv_targetGuids = [];    
  },
  
  _apv_overridePropertyDidChange: function (queue) {
    queue.beginPropertyChanges();
    var self = this;
    queue.forEach( function (change) {
      if (self._apv_baseValues[change.property] === undefined) {
        self._apv_baseValues[change.property] = self.get(change.property);
      }
      self.set(change.property, change.restoreBaseValue ? self._apv_baseValues[change.property] : change.value);
    });
    queue.splice(0, queue.length);
    queue.endPropertyChanges();
  }
  
};
