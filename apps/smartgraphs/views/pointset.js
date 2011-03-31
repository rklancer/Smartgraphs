// ==========================================================================
// Project:   Smartgraphs.PointsetView
// Copyright: ©2010 Concord Consortium
// Author:   Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs RaphaelViews */

sc_require('views/mixins/annotatable_parent_view');

/** @class

  @extends RaphaelViews.RaphaelCollectionView
*/
Smartgraphs.PointsetView = RaphaelViews.RaphaelCollectionView.extend( Smartgraphs.AnnotatableParentView, {

  exampleView: Smartgraphs.PointView,
  // keep this set to YES prevents the collection view from redrawing all the points when re-rendering
  useFastPath: YES,
  
  modelColorBinding: '.item.color',
  modelColorBindingDefault: SC.Binding.oneWay(),

  color: function () {
    return this.get('overrideColor') || this.get('modelColor');
  }.property('overrideColor', 'modelColor'),

  selectionBinding: '.item.selection',
  isSelectableBinding: '.item.isSelectable',
  
  contentBinding: '.item.points'
  
});
