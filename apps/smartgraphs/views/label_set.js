// ==========================================================================
// Project:   Smartgraphs.LabelSetView
// Copyright: ©2011 Concord Consortium
// Author:    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs RaphaelViews */


/** @class

  @extends RaphaelViews.RaphaelCollectionView
*/
Smartgraphs.LabelSetView = RaphaelViews.RaphaelCollectionView.extend({
  
  init: function () {
    sc_super();
    window.lsv = this;
  },

  exampleView: Smartgraphs.LabelAnnotationView,
  // unfortunately, the current CollectionViewFastPath implementation confuses labels
  useFastPath: NO,
  contentBinding: '.item.labels'

});
