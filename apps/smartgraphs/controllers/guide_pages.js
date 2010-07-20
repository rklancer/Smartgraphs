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
  allowsEmptySelection: NO,
  allowsMultipleSelection: NO,

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
  }.property('selection')

}) ;
