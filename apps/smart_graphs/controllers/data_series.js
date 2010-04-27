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
  
  _valuesDidChange: function () {
    console.log('values did change');
    this.notifyPropertyChange('arrangedObjects');
  },
  
  _arrayDidChange: function () {
    this.forEach(function (item) { 
      console.log("adding observer to item: " + item); 
      item.addObserver('y', this, this._valuesDidChange); }, this);
  }.observes('.[]')
}) ;
