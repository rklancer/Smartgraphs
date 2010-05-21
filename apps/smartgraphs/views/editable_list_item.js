// ==========================================================================
// Project:   Smartgraphs.EditableListItemView
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document Your View Here)

  @extends SC.View
*/
Smartgraphs.EditableListItemView = SC.ListItemView.extend(
/** @scope Smartgraphs.EditableListItemView.prototype */ {

  // as per http://groups.google.com/group/sproutcore/browse_thread/thread/6564941be2b51276/fcf4eb11a1ea268f?#fcf4eb11a1ea268f
  inlineEditorShouldBeginEditing: function () {
    return YES;
  }
});
