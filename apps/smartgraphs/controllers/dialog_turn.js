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
    console.log('didReceiveCorrectResponse');
  },
  
  didReceiveIncorrectResponse: function () {
    console.log('didReceiveIncorrectResponse');
  },
  
  didReceiveIncompleteResponse: function () {
    console.log('didReceiveIncompleteResponse');
  },
  
  didReceiveMalformedResponse: function () {
    console.log('didReceiveMalformedResponse');
  },
  
  // TODO: let content dictate what buttons are available (including 'ok', 'show me again', 'i dont know'...)
  checkResponseShouldBeVisibleBinding: SC.Binding.oneWay('Smartgraphs.responseVerifierController.responseCanBeChecked'),
  checkResponseShouldBeEnabledBinding: SC.Binding.oneWay('Smartgraphs.responseVerifierController.responseIsReady')
}) ;
