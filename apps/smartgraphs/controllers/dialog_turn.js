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
  
  contentDidChange: function () {
    this.invokeOnce(this._updateDialogIsComplete);  
  }.observes('content'),
  
  _updateDialogIsComplete: function () {
    if (this.get('isLastTurn')) {
      Smartgraphs.guidePageSequenceController.set('nextPageIsSelectable', YES);
    }
  },
  
  didReceiveCorrectResponse: function () {
    var nextTurn = this.get('nextTurnForNominalResponse');
    Smartgraphs.guidePageController.set('selectedDialogTurn', nextTurn);
  },
  
  didReceiveIncorrectResponse: function () {
    var nextTurn = this.get('nextTurnForIncorrectResponse');
    Smartgraphs.guidePageController.set('selectedDialogTurn', nextTurn);
  },
  
  didReceiveIncompleteResponse: function () {
    console.log('didReceiveIncompleteResponse');
  },
  
  didReceiveMalformedResponse: function () {
    console.log('didReceiveMalformedResponse');
  },
  
  // TODO: let content dictate what buttons are available (including 'ok', 'show me again', 'i dont know'...)
  
  // NOTE this pattern!
  // first define the property 'checkResponseShouldBeVisible' on the controller, so it doesn't pass through to the proxied content
  // then define a binding that will update the property on the controller.
  // (without it, you'll have two model objects attempting to share the same SC.Binding object)
  checkResponseShouldBeVisible: null,
  checkResponseShouldBeVisibleBinding: SC.Binding.oneWay('Smartgraphs.responseVerifierController.responseCanBeChecked'),

  checkResponseShouldBeEnabled: null,
  checkResponseShouldBeEnabledBinding: SC.Binding.oneWay('Smartgraphs.responseVerifierController.responseIsReady')
}) ;
