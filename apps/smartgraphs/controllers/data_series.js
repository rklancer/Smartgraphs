// ==========================================================================
// Project:   Smartgraphs.dataSeriesController
// Copyright: ©2010 Concord Consortium
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/

Smartgraphs.dataSeriesController = SC.ArrayController.create(
/** @scope Smartgraphs.dataSeriesController.prototype */ {

  seriesBinding: SC.Binding.oneWay('Smartgraphs.guidePageController.dataSeries'),
  
  dataPoints: function () {
    var series = this.get('series');
    var query = SC.Query.local(Smartgraphs.DataPoint, {conditions: 'series = {series}', series: series, orderBy: 'x'} );
    return Smartgraphs.store.find(query);
  }.property('series').cacheable(),
  
  contentBinding: SC.Binding.from('.dataPoints'),
  
  allowsMultipleSelection: NO
}) ;
