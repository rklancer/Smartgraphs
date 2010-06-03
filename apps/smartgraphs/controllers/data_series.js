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
  seriesGuidBinding: SC.Binding.oneWay('Smartgraphs.guidePageController.dataSeries.guid'),
  
  content: function () {
    var series = this.get('series');
    var query = SC.Query.local(Smartgraphs.DataPoint, {conditions: 'series = {series}', series: series, orderBy: 'x'} );
    return Smartgraphs.store.find(query);
  }.property('series').cacheable(),
  
  addDataPoint: function (x, y) {
    // for simplicity's sake, put this in a runloop for now...
    SC.RunLoop.begin();
    Smartgraphs.store.createRecord(Smartgraphs.DataPoint, {x: x, y: y, series: this.getPath('series.guid')});
    Smartgraphs.store.commitRecords();
    SC.RunLoop.end();
  },
  
  allowsMultipleSelection: NO
}) ;
