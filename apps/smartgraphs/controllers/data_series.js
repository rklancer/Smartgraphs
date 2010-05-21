// ==========================================================================
// Project:   Smartgraphs.dataSeriesController
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/

Smartgraphs.dataSeriesController = SC.ArrayController.create(
/** @scope Smartgraphs.dataSeriesController.prototype */ {
  
  totalChanges: 0,
  allowsMultipleSelection: NO,
  
  _valuesDidChange: function () {
    this.incrementProperty('totalChanges');
  },
  
  _arrayDidChange: function () {
    this.forEach(function (item) { 
      console.log("adding observer to item: " + item); 
      item.addObserver('y', this, this._valuesDidChange); }, this);
      
      // FIXME (unless we stop using the 'totalChanges' property to indicate need to re-render):
      // need to REMOVE observers too! (to prevent us from rerendering when removed objects change)
  }.observes('.[]')
}) ;
