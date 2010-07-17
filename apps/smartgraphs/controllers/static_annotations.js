// ==========================================================================
// Project:   Smartgraphs.staticAnnotationsController
// Copyright: ©2010 Concord Consortium, Inc.
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
Smartgraphs.staticAnnotationsController = SC.ArrayController.create(
/** @scope Smartgraphs.staticAnnotationsController.prototype */ {
  
  // could turn thisn into a RecordArray from a query instead of a ManyArray which has trouble updating

  contentBinding: 'Smartgraphs.dialogTurnController.staticAnnotations'

}) ;
