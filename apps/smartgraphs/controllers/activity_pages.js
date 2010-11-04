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

  currentPageNumber: function () {
    var indexSet = this.get('selection').indexSetForSource(this);
    return indexSet && indexSet.firstObject();
  }.property('selection', '[]').cacheable(),

  pageInfo: function () {
    var pageNumber = this.get('currentPageNumber');
    var length = this.get('length');
    
    // Avoid displaying when there is no content
    if (length === 0 || pageNumber === undefined) {
      return "";
    }
    
    // (the only reason page number > total pages is if this.length = 0, which we already check for)
    return "Page " + (pageNumber+1) + " of " + length;
  }.property('currentPageNumber', 'length').cacheable(),

  selectFirstPage: function () {
    if (this.get('length') > 0) {
      this.selectObject(this.objectAt(0));
    }
  },

  selectNextPage: function () {
    var index = this.get('currentPageNumber');
    if (index + 1 < this.get('length')) {
      this.selectObject(this.objectAt(index + 1));
    }
  },

  isLastPage: function () {
    return (this.get('currentPageNumber') >= (this.get('length') - 1));
  }.property('currentPageNumber', 'length').cacheable(),
  
  contentsDidChange: function () {
    var n = 0;
    this.forEach(function (page) {
      page.set('pageNumber', n);
      n++;
    });
  }.observes('[]'),
  
  outline: function () {
    var ret = SC.Object.create();
    
    var page_n = 1;
    ret.set('treeItemChildren', this.map( function (page) {
      var n = 1;
      var ret = SC.Object.create();
      ret.set('treeItemChildren', page.get('steps').map( function (step) {
         return SC.Object.create({
           title: 'Step %@'.fmt(n++)
         });
      }));
      
      //ret.set('title', page.get('name'));
      ret.set('title', 'Page %@'.fmt(page_n++));
      ret.set('treeItemIsExpanded', YES);
      return ret;
    }));
    
    ret.set('treeItemIsExanded', YES);
    ret.set('title', 'who cares what the top level title is?');
    
    return ret;
    // FIXME this will NOT update when steps are added/removed or have their properties changed
  }.property('content')
  
});
