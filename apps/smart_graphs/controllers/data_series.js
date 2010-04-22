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
  xs: function () {
    return this.get('content').map( function (pair) { return pair[0]; } );
  }.property('content').cacheable(),
  
  ys: function () {
    return this.get('content').map( function (pair) { return pair[1]; } );
  }.property('content').cacheable(),
  
  _contentDidChange: function () {
    console.log('dataSeriesController invalidating property "content"');
    this.notifyPropertyChange('content');
  }.observes('.content.[]')
}) ;
