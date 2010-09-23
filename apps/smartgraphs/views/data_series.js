// ==========================================================================
// Project:   Smartgraphs.DataSeriesView
// Copyright: ©2010 Concord Consortium
// @author:   Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs RaphaelViews */

/** @class

  @extends SC.View
*/
sc_require('views/data_point');

Smartgraphs.DataSeriesView = RaphaelViews.RaphaelCollectionView.extend({

  exampleView: Smartgraphs.DataPointView, 
  // keep this set to YES prevents the collection view from redrawing all the points when re-rendering
  useFastPath: YES,
  colorBinding: '.item.color',
  
  content: function () {
    var series = this.get('item');
    if (!series) return null;
    
    return Smartgraphs.store.find(SC.Query.local(Smartgraphs.DataPoint, { 
      conditions: 'series = {series}',
      series: series,
      orderBy: 'id'
    }));
  }.property('series').cacheable()
  
});
