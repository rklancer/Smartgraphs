// ==========================================================================
// Project:   Smartgraphs.DatasetView
// Copyright: ©2010 Concord Consortium
// @author:   Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs RaphaelViews */

sc_require('views/data_point');

/** @class

  @extends RaphaelViews.RaphaelCollectionView
*/

Smartgraphs.DatasetView = RaphaelViews.RaphaelCollectionView.extend({

  exampleView: Smartgraphs.DataPointView, 
  // keep this set to YES prevents the collection view from redrawing all the points when re-rendering
  useFastPath: YES,
  colorBinding: '.item.color',
  selectionBinding: '.item.selection',
  isSelectableBinding: '.item.isSelectable',
  
  content: function () {
    var dataset = this.get('item');
    if (!dataset) return null;
    
    return Smartgraphs.store.find(SC.Query.local(Smartgraphs.DataPoint, { 
      conditions: 'dataset = {dataset}',
      dataset: dataset,
      orderBy: 'id'
    }));
  }.property('dataset').cacheable()
  
});
