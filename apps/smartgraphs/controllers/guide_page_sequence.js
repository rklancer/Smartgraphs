// ==========================================================================
// Project:   Smartgraphs.guidePageSequenceController
// Copyright: ©2010 Concord Consortium
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
Smartgraphs.guidePageSequenceController = SC.ArrayController.create(
/** @scope Smartgraphs.guidePageSequenceController.prototype */ {

  allowsEmptySelection: NO,
  allowsMultipleSelection: NO,

   // override selectObject to allow self-bindings in guidePageSequenceController to sync...

  selectObject: function (value) {
    SC.RunLoop.begin();
    sc_super();
    SC.RunLoop.end();
  },

  sequenceDidChange: function () {
    var sequence = this.get('sequence');
    var pages = sequence.get('pages');
    this.set('content', pages);

    var firstPage = pages.objectAt(0);
    if (firstPage) {
      firstPage.set('isSelectable', true);
      this.set('selectedPage', firstPage);
    }
  }.observes('sequence'),


  selectedPage: function (key, value) {
    if (value !== undefined && value.get('isSelectable')) {
      this.selectObject(value);
    }
    return this.get('selection').toArray().objectAt(0);
  }.property('selection'),


  indexOfSelectedPage : function () {
    var selection = this.get('selection');
    var indexSet = selection.indexSetForSource(this);
    var index = indexSet ? indexSet.toArray().objectAt(0) : undefined;

    return index;
  }.property('selectedPage', 'content', '[]').cacheable(),


  previousPage: function () {
    var index = this.get('indexOfSelectedPage');

    return (index > 0) ? this.objectAt(index-1) : null;
  }.property('selectedPage', 'content', '[]').cacheable(),


  nextPage: function () {
    var index = this.get('indexOfSelectedPage');

    return (index + 1 < this.get('length')) ? this.objectAt(index+1) : null;
  }.property('selectedPage', 'content', '[]').cacheable(),


  isFirstPageBinding: SC.Binding.bool('.previousPage').not(),
  isLastPageBinding: SC.Binding.bool('.nextPage').not(),

  canSelectPreviousPageBinding: SC.Binding.not('.isFirstPage'),
  nextPageIsSelectableBinding: SC.Binding.oneWay('*nextPage.isSelectable'),

  canSelectNextPage: function () {
    return (!this.get('isLastPage') && this.get('nextPageIsSelectable'));
  }.property('isLastPage', 'nextPageIsSelectable').cacheable(),

  selectPreviousPage: function () {
    if (this.get('canSelectPreviousPage')) {
      this.selectObject( this.get('previousPage') );
    }
  },

  selectNextPage: function () {
    if (this.get('canSelectNextPage')) {
      this.selectObject( this.get('nextPage') );
    }
  }
}) ;
