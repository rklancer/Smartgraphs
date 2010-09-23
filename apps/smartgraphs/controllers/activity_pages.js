// ==========================================================================
// Project:   Smartgraphs.activityPagesController
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// Author: Dr. Baba Kofi Weusijana <kofi@edutek.net>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document Your Controller Here)

  @extends SC.ArrayController
*/
Smartgraphs.activityPagesController = SC.ArrayController.create(
/** @scope Smartgraphs.activityPagesController.prototype */
{

  allowsMultipleSelection: NO,

  indexOfSelectedPage: function () {
    var selection = this.get('selection');
    var indexSet = selection.indexSetForSource(this);
    return (indexSet ? indexSet.toArray().objectAt(0) : undefined);
  }.property('selection', '[]').cacheable(),

  pageInfo: function () {
    var index = this.get('indexOfSelectedPage');
    var length = this.get('length');
    
    // Avoid displaying when there is no content
    if (length === 0 || index === undefined) {
      return "";
    }
    
    // (the only reason page number > total pages is if this.length = 0, which we already check for)
    return "Page " + (index+1) + " of " + length;
  }.property('indexOfSelectedPage', 'length').cacheable(),

  selectFirstPage: function () {
    if (this.get('length') > 0) {
      this.selectObject(this.objectAt(0));
    }
  },

  selectNextPage: function () {
    var index = this.get('indexOfSelectedPage');
    if (index + 1 < this.get('length')) {
      this.selectObject(this.objectAt(index + 1));
    }
  },

  isLastPage: function () {
    return (this.get('indexOfSelectedPage') >= (this.get('length') - 1));
  }.property('indexOfSelectedPage', 'length').cacheable()
  
});
