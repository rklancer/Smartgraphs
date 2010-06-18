// ==========================================================================
// Project:   Smartgraphs.HeightAdjustingListView
// Copyright: ©2010 Consord Consortium
// ==========================================================================
/*globals Smartgraphs */

/** @class

  A ListView that recomputes its layout when its content length or rowHeight changes.
  
   Note that, as far as heights are concerned, it only observes its own 'rowHeight' property; it does not recompute 
   its layout when individual list item row heights change.

  @extends SC.ListView
*/
Smartgraphs.HeightAdjustingListView = SC.ListView.extend(
/** @scope Smartgraphs.HeightAdjustingListView.prototype */ {

  contentLengthBinding: '*content.length',
  
  _recomputeLayout: function () {
    this.computeLayout();
  }.observes('contentLength', 'rowHeight')

});
