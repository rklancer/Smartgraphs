// ==========================================================================
// Project:   Smartgraphs.dialogTurnController
// Copyright: ©2010 Concord Consortium
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
Smartgraphs.dialogTurnController = SC.ObjectController.create(
/** @scope Smartgraphs.dialogTurnController.prototype */ {

  contentBinding: 'Smartgraphs.guidePageController.selectedDialogTurn',
  
  didReceiveCorrectResponse: function () {
  },
  
  didReceiveIncorrectResponse: function () { 
  },
  
  didReceiveIncompleteResponse: function () {
  },
  
  didReceiveMalformedResponse: function () {
  }

}) ;
