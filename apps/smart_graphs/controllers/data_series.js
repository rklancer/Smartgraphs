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
  }.property('series').cacheable(),
  
  ys: function () {
    return this.get('content').map( function (pair) { return pair[1]; } );
  }.property('series').cacheable(),
  
  f: function () {
    console.log('yo');
  }.observes('content')
}) ;
