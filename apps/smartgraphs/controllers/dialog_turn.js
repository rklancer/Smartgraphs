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
  _oldContent: null,
  
  contentDidChange: function () {
    var content = this.get('content');

    // update previous dialogTurn's wasVisited 
    if (this._oldContent !== this.get('content')) {
      if (this._oldContent) {
        this._oldContent.set('wasVisited', YES);
      }
    }
    this._oldContent = content;
    this.invokeOnce(this._updateForChangedContent);
  }.observes('content'),
  
  _updateForChangedContent: function () {
    var responseTemplate = this.getPath('responseTemplate');
    var newArray = [];
    
    if (responseTemplate && !this.get('responseArray')) {
      newArray.length = responseTemplate.get('numberOfResponseFields');
      this.set('responseArray', newArray);
    }
    
    if (this.get('isLastTurn')) {
      Smartgraphs.guidePageSequenceController.set('nextPageIsSelectable', YES);
      // autoadvance if turn says to and we're not currently *re*visiting the turn (i.e., wasVisited = NO)
      if (this.get('shouldAutoAdvance') && !this.get('wasVisited')) {
        Smartgraphs.guidePageSequenceController.invokeLast('selectNextPage');
      }
    }
  },

  // an unknown number of fields will be generated, so instead of creating a dynamically expanding and contracting list
  // of properties which can be bound, we'll accept a simple 'updateResponse' message from the field with index 'index'
  
  updateResponse: function (index, value) {
    var responseArray = this.get('responseArray');
    if (responseArray) {
      responseArray.replace(index, 1, [value]);
    }
  },

  gotoNextTurn: function () {
    if (Smartgraphs.responseVerifierController.get('verificationIsRequired')) {
      Smartgraphs.responseVerifierController.checkResponse();
    }
    else {
      // just go to the next turn
      var nextTurn = this.get('nextTurnForNominalResponse');
      Smartgraphs.guidePageController.set('selectedDialogTurn', nextTurn);      
    }
  },
  
  didReceiveCorrectResponse: function () {
    //SC.Logger.log('didReceiveCorrectResponse');
    var nextTurn = this.get('nextTurnForNominalResponse');
    Smartgraphs.guidePageController.set('selectedDialogTurn', nextTurn);
  },
  
  didReceiveIncorrectResponse: function () {
    //SC.Logger.log('didReceiveIncorrectResponse');
    var nextTurn = this.get('nextTurnForIncorrectResponse');
    Smartgraphs.guidePageController.set('selectedDialogTurn', nextTurn);
  },
  
  didReceiveIncompleteResponse: function () {
    //SC.Logger.log('didReceiveIncompleteResponse');
  },
  
  didReceiveMalformedResponse: function () {
    //SC.Logger.log('didReceiveMalformedResponse');
  },
  
  // TODO: let content dictate what buttons are available (including 'ok', 'show me again', 'i dont know'...)
  

  // return a default value for the nextTurnButtonTitle unless it's explictly specified in the model
  defaultNextTurnButtonTitle: "Check My Answer",
  
  rawNextTurnButtonTitleBinding: SC.Binding.oneWay('*content.nextTurnButtonTitle'),
  nextTurnButtonTitle: function () {
    var rawTitle = this.get('rawNextTurnButtonTitle');
    return rawTitle ? rawTitle : this.get('defaultNextTurnButtonTitle');
  }.property('rawNextTurnButtonTitle').cacheable(),


  // NOTE this pattern!
  // first define the property 'nextTurnButtonShouldBeVisible' on the controller, so it doesn't pass through to the proxied content
  // then define a binding that will update the property on the controller.
  // (without it, you'll have two model objects attempting to share the same SC.Binding object)
    
  nextTurnButtonShouldBeVisible: null,
  nextTurnButtonShouldBeVisibleBinding: SC.Binding.not('.isLastTurn').oneWay(),
  
  verificationIsNotRequired: null,
  verificationIsNotRequiredBinding: SC.Binding.not('Smartgraphs.responseVerifierController.verificationIsRequired').oneWay(),
  
  // Weird binding issue: can't use relative path syntax ('.verificationIsNotRequired') in the or transform below.

  nextTurnButtonShouldBeEnabled: null,
  nextTurnButtonShouldBeEnabledBinding: SC.Binding.or(
    'Smartgraphs.dialogTurnController.verificationIsNotRequired', 
    'Smartgraphs.responseVerifierController.responseIsReady'),
  
  
  // just pass this through from the GuidePage model for now.
  sensorAppletShouldBeEnabled: null,
  sensorAppletShouldBeEnabledBinding: SC.Binding.oneWay('Smartgraphs.guidePageController.sensorAppletShouldBeEnabled')
}) ;
