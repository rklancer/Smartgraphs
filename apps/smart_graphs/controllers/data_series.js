// ==========================================================================
// Project:   SmartGraphs.dataSeriesController
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals SmartGraphs */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/

SmartGraphs.dataSeriesController = SC.ArrayController.create(
/** @scope SmartGraphs.dataSeriesController.prototype */ {
  
  totalChanges: 0,
  
  _valuesDidChange: function () {
    this.incrementProperty('totalChanges');
  },
  
  _arrayDidChange: function () {
    this.forEach(function (item) { 
      console.log("adding observer to item: " + item); 
      item.addObserver('y', this, this._valuesDidChange); }, this);
  }.observes('.[]')
}) ;
