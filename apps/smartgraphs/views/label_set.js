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
  
  exampleView: Smartgraphs.LabelView,
  // unfortunately, the current CollectionViewFastPath implementation confuses labels
  useFastPath: NO,
  contentBinding: '.item.labels'

});
