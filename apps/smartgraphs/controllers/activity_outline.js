// ==========================================================================
// Project:   Smartgraphs.activityOutlineController
// Copyright: ©2010 Concord Consortium
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
Smartgraphs.activityOutlineController = SC.TreeController.create(
/** @scope Smartgraphs.activityOutlineController.prototype */ {

  contentBinding: SC.Binding.oneWay('Smartgraphs.activityPagesController.outline'),
  treeItemIsGrouped: YES

}) ;
