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
      page.set('pageNumber', n++);
    });
  }.observes('[]'),
  
  outline: function () {
    var page_n = 0;
    return SC.Object.create({
      title: 'toplevel',
      treeItemIsExpanded: YES,
      pages: this.map( function (page) { return page; } ),
      treeItemChildren: this.map( function (page) {
        var n = 1;
        page_n++;
        return SC.Object.create({
          title: page.get('name') || 'Page %@'.fmt(page_n),
          treeItemIsExpanded: YES,
          steps: page.get('steps'),          
          treeItemChildren: page.get('steps').map( function (step) {
            return SC.Object.create({
              title: 'Step %@'.fmt(n++),
              treeItemIsExpanded: YES,
              treeItemChildren: null
            });
          })
        });
      })
    });
    // FIXME this will NOT update when steps are added/removed or have their properties changed
  }.property('[]').cacheable()
  
});
