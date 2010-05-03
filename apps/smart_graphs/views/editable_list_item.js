// ==========================================================================
// Project:   SmartGraphs.EditableListItemView
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals SmartGraphs */

/** @class

  (Document Your View Here)

  @extends SC.View
*/
SmartGraphs.EditableListItemView = SC.ListItemView.extend(
/** @scope SmartGraphs.EditableListItemView.prototype */ {

  // as per http://groups.google.com/group/sproutcore/browse_thread/thread/6564941be2b51276/fcf4eb11a1ea268f?#fcf4eb11a1ea268f
  inlineEditorShouldBeginEditing: function () {
    return YES;
  }
});
