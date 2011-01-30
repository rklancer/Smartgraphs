// ==========================================================================
// Project:   Smartgraphs.AnnotatableItemView
// Copyright: ©2010 Concord Consortium
// @author    Parker Morse <pmorse@cantinaconsulting.com>
// ==========================================================================
/*globals Smartgraphs RaphaelViews */

/** @class

  Mix this into DataPointViews and TableItemViews so they respect override properties set by annotations.
*/

Smartgraphs.AnnotatableItemView = {

  initMixin: function () {
    this._aiv_baseValues = {};
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
  }.observes('content'),
  
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
