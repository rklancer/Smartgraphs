// ==========================================================================
// Project:   Smartgraphs.activityPagesController
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document Your Controller Here)

  @extends SC.ArrayController
*/
Smartgraphs.activityPagesController = SC.ArrayController.create(
/** @scope Smartgraphs.activityPagesController.prototype */ {

  allowsMultipleSelection: NO,
  
  indexOfSelectedPage : function () {
    var selection = this.get('selection');
    var indexSet = selection.indexSetForSource(this);
    return (indexSet ? indexSet.toArray().objectAt(0) : undefined);
  }.property('selection', '[]').cacheable(),

  selectFirstPage: function () {
    if (this.get('length') > 0) {
      this.selectObject(this.objectAt(0));
    }
  },
  
  selectNextPage: function () {
    var index = this.get('indexOfSelectedPage');
    if (index+1 < this.get('length')) {
      this.selectObject(this.objectAt(index+1));
    }
  },
  
  isLastPage: function () {
    return (this.get('indexOfSelectedPage') >= (this.get('length') - 1));
  }.property('indexOfSelectedPage', 'length').cacheable()
}) ;
