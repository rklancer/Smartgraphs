// ==========================================================================
// Project:   Smartgraphs.AnnotatableItemView
// Copyright: ©2011 Concord Consortium
// Author:    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs RaphaelViews */

/** @class

  Mix this into DataPointViews and TableItemViews so they respect override properties set by annotations.
*/

Smartgraphs.AnnotatableItemView = {

  initMixin: function () {
    this._aiv_baseValues = {};
    this._aiv_targetGuids = [];
    this._aiv_contentDidChange();
  },
  
  _aiv_contentDidChange: function () {
    var newContent = this.get('content');
    var oldContent = this._oldContent;
    this._oldContent = newContent;

    var queues = this.getPath(this.get('controllerPath')).get('overrideQueuesByTarget');
        
    if (oldContent) {
      queues[SC.guidFor(oldContent)].removeObserver('[]', this, this._aiv_overridePropertyDidChange);
    }

    var targetGuid = SC.guidFor(newContent);
    if (!queues[targetGuid]) queues[targetGuid] = [];
    
    queues[targetGuid].addObserver('[]', this, this._aiv_overridePropertyDidChange);
    this._aiv_targetGuids.push(targetGuid);    
  }.observes('content'),
  
  willRemoveFromDataView: function () {
    var queues = this.getPath(this.get('controllerPath')).get('overrideQueuesByTarget');
    var self = this;
    this._aiv_targetGuids.forEach( function (targetGuid) {
      queues[targetGuid].removeObserver('[]', self, self._aiv_overridePropertyDidChange);
    });
    this._aiv_targetGuids = [];
  },
  
  _aiv_overridePropertyDidChange: function (queue) {
    queue.beginPropertyChanges();
    var self = this;
    queue.forEach( function (change) {
      if (self._aiv_baseValues[change.property] === undefined) {
        self._aiv_baseValues[change.property] = self.get(change.property) || null;
      }
      self.set(change.property, change.restoreBaseValue ? self._aiv_baseValues[change.property] : change.value);
    });
    this.invokeLast( function () { queue.splice(0, queue.length); } );    // let other observers also work through the queue
    queue.endPropertyChanges();
  }
  
};
