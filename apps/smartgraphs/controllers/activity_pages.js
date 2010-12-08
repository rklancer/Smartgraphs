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
  shouldShowStepsInOutline: YES,

  // use rather than a binding because the opposite side also uses an obserer (to update immediately)
  currentPageDidChange: function () {
    this.selectObject(Smartgraphs.activityPageController.get('content'));
  }.observes('Smartgraphs.activityPageController.content'),
  
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
  
  selectPreviousPage: function () {
    var index = this.get('currentPageNumber');
    if (index > 0) {
      this.selectObject(this.objectAt(index - 1));
    }
  },

  isLastPage: function () {
    return (this.get('currentPageNumber') >= (this.get('length') - 1));
  }.property('currentPageNumber', 'length').cacheable(),
  
  isFirstPage: function () {
    return (this.get('currentPageNumber') === 0);
  }.property('currentPageNumber').cacheable(),
  
  contentsDidChange: function () {
    var n = 0;
    this.forEach(function (page) {
      page.set('pageNumber', n++);
    });
  }.observes('[]'),
  
  outline: function () {
    var skipSteps = !this.get('shouldShowStepsInOutline');
    var contentLength = this.getPath('content.length') || 0;

    return contentLength === 0 ? null : SC.Object.create({
      title: 'toplevel',
      treeItemIsExpanded: YES,
      pages: this.map( function (page) { return page; } ),
      treeItemChildren: this.map( function (page) {
        var stepNum = 1;
        return SC.Object.create({
          title: page.get('name') || 'Page %@'.fmt(page.get('pageNumber') + 1),
          treeItemIsExpanded: YES,
          page: page,
          steps: skipSteps ? undefined : page.get('steps'),       
          treeItemChildren: skipSteps ? undefined : page.get('steps').map( function (step) {
            return SC.Object.create({
              title: 'Step %@'.fmt(stepNum++),
              step: step,
              treeItemIsExpanded: YES,
              treeItemChildren: null
            });
          })
        });
      })
    });
    // FIXME this will NOT update when steps are added/removed or have their properties changed
  }.property('[]', 'shouldShowStepsInOutline').cacheable()
  
});
