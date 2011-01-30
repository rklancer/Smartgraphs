// ==========================================================================
// Project:   Smartgraphs.TableItemView
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Smartgraphs */

/** @class

  This is a custom ListItemView for display in Smartgraphs tables. 
  
  The addition here is support for background highlighting based on annotations.

  @extends SC.View
*/
Smartgraphs.TableItemView = SC.ListItemView.extend(
/** @scope Smartgraphs.TableItemView.prototype */ {

  displayProperties: ['backgroundColor'],
  
  classNames: "table-item-view",
  backgroundColor: function () {
    return this.get('overrideColor') || '';
  }.property('overrideColor').cacheable(),
  
  mouseDown: function () {
    // Borrowed from DataPointView in the graph
    Smartgraphs.statechart.sendAction('dataPointSelected', this, null);
    // 'tee' the dataPointSelected event, but don't consider the mouseDown handled; let the parent collection view
    // also handle it
    return NO;
  },
  
  // TODO: This is copied from DataPointView (and, more loosely, with annotation/dataset views). Remove duplication.
  init: function () {
    sc_super();
    this._baseValues = {};
    this.contentDidChange();
  },
  
  contentDidChange: function () {
    var newContent = this.get('content');
    var oldContent = this._oldContent;
    this._oldContent = newContent;

    var queues = this.getPath('parentView.parentView.tableController.overrideQueuesByTarget');
        
    if (oldContent) {
      queues[SC.guidFor(oldContent)].removeObserver('[]', this, this._overridePropertyDidChange);
    }

    var targetGuid = SC.guidFor(newContent);
    if (!queues[targetGuid]) queues[targetGuid] = [];
    
    queues[targetGuid].addObserver('[]', this, this._overridePropertyDidChange);
  }.observes('content'),
  
  _overridePropertyDidChange: function (queue) {
    queue.beginPropertyChanges();
    var self = this;
    queue.forEach( function (change) {
      if (self._baseValues[change.property] === undefined) {
        self._baseValues[change.property] = self.get(change.property) || null;
      }
      self.set(change.property, change.restoreBaseValue ? self._baseValues[change.property] : change.value);
    });
    this.invokeLast( function () { queue.splice(0, queue.length); } );    // let other observers also work through the queue
    queue.endPropertyChanges();
  }
  
  
});
