// ==========================================================================
// Project:   Smartgraphs.guidePagesController
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document Your Controller Here)

  @extends SC.ArrayController
*/
Smartgraphs.guidePagesController = SC.ArrayController.create(
/** @scope Smartgraphs.guidePagesController.prototype */ {

  contentBinding: 'Smartgraphs.guideController.pages',
  allowsMultipleSelection: NO,

  /**
    Selects the page at the passed index. Use this instead of selectObject() because it checks whether the page
    is selectable
  */
  selectPageAtIndex: function (idx) {
    if (this.get('length') > idx) {
      var page = this.objectAt(idx);
      if (page.get('isSelectable')) {
        this.selectObject(page);
      }
    }
  },
  
  selectedPage: function () {
    return this.get('selection').toArray().objectAt(0);
  }.property('selection', '[]').cacheable(),
  
  indexOfSelectedPage : function () {
    var selection = this.get('selection');
    var indexSet = selection.indexSetForSource(this);
    return (indexSet ? indexSet.toArray().objectAt(0) : undefined);
  }.property('selectedPage').cacheable(),
  
  previousPage: function () {
    var index = this.get('indexOfSelectedPage');
    return (index > 0) ? this.objectAt(index-1) : null;
  }.property('selectedPage').cacheable(),

  nextPage: function () {
    var index = this.get('indexOfSelectedPage');
    return (index+1 < this.get('length')) ? this.objectAt(index+1) : null;
  }.property('selectedPage').cacheable(),
  
  isFirstPage: null,
  isFirstPageBinding: SC.Binding.bool('.previousPage').not(),
  
  isLastPage: null,
  isLastPageBinding: SC.Binding.bool('.nextPage').not(),

  nextPageIsSelectable: null,
  nextPageIsSelectableBinding: SC.Binding.oneWay('*nextPage.isSelectable'),
  
  canSelectPreviousPage: null,
  canSelectPreviousPageBinding: SC.Binding.not('.isFirstPage'),
  
  canSelectNextPage: function () {
    return (!this.get('isLastPage') && this.get('nextPageIsSelectable'));
  }.property('isLastPage', 'nextPageIsSelectable').cacheable()
  
}) ;
