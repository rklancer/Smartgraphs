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
  contentBinding: '.item.labels',

  didCreateLayer: function () {
    sc_super();
    this.get('item').set('view', this);
  },

  didRemoveFromGraphView: function () {
    this.get('childViews').forEach(function (view) {
      if (view.didRemoveFromGraphView) view.didRemoveFromGraphView();
    });
  },

  labelInEditMode: function () {
    var childLabels = this.get('childViews');
    var noOfLabels = childLabels.length; 
    for (var i = 0; i < noOfLabels; i++) {
      var label = childLabels[i];
      if (label.get('isEditing')) {
        return label;
      }
    }
    return null;
  }.property(),

  labelInArrowDragMode: function () {
    var childLabels = this.get('childViews');
    var noOfLabels = childLabels.length; 
    for (var i = 0; i < noOfLabels; i++) {
      var label = childLabels[i];
      if (label.get('isArrowDragging')) {
        return label;
      }
    }
    return null;
  }.property()
});
