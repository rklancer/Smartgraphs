// ==========================================================================
// Project:   Smartgraphs.axesController
// Copyright: ©2010 Concord Consortium
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
Smartgraphs.axesController = SC.ObjectController.create(
/** @scope Smartgraphs.axesController.prototype */ {
  padding: { top: 20, right: 20, bottom: 40, left: 60 },
  
  contentBinding: SC.Binding.oneWay('Smartgraphs.guidePageController.axes')
}) ;
