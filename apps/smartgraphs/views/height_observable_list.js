// ==========================================================================
// Project:   Smartgraphs.HeightObservableListView
// Copyright: ©2010 Consord Consortium
// ==========================================================================
/*globals Smartgraphs */

/** @class

  A ListView with a 'height' property that changes when rowHeight
  
  Note that if variable row heights are being used, the 'height' property does not know when the row heights change.

  @extends SC.ListView
*/
Smartgraphs.HeightObservableListView = SC.ListView.extend(
/** @scope Smartgraphs.HeightObservableListView.prototype */ {

  lengthBinding: '*content.length',

  height: function(){
    this.computeLayout();
    var frame = this.get('frame');
    return this.get('calculatedHeight') + (frame.top || 0) + (frame.bottom || 0);
  }.property('length', 'frame', 'rowHeight').cacheable()

});
