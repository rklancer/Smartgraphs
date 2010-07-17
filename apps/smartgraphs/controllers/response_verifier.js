// ==========================================================================
// Project:   Smartgraphs.responseVerifierController
// Copyright: ©2010 Concord Consortium
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
Smartgraphs.responseVerifierController = SC.ObjectController.create( 
/** @scope Smartgraphs.responseVerifierController.prototype */ {

  contentBinding: SC.Binding.oneWay('Smartgraphs.dialogTurnController.responseVerifier'),
  
  verificationIsRequired: null,
  verificationIsRequiredBinding: SC.Binding.bool('.content'),
  
  contentDidChange: function () {
    var content = this.get('content');
    //console.log('Smartgraphs.responseVerifierController observed content');

    if (!content) {
      // nothing to do
      return;
    }
    
    this.invokeOnce(this._setVerifierDelegate);
  }.observes('content'),

  _setVerifierDelegate: function () {
    var delegatePath = 'Smartgraphs.' + this.get('verifierDelegateName') + 'VerifierDelegate';
    var delegate = SC.objectForPropertyPath(delegatePath);
    delegate.set('configString', this.get('configString'));
    this.set('verifierDelegate', delegate);
  },

  responseIsReady: null,
  responseIsReadyBinding: SC.Binding.bool('*verifierDelegate.responseIsReady'),

  checkResponse: function () {
    var delegate = this.get('verifierDelegate');
    delegate.checkResponse();
    
    var isIncomplete = delegate.get('responseIsIncomplete');
    var isMalformed = delegate.get('responseIsMalformed');
    var isCorrect = delegate.get('responseIsCorrect');
    
    if (isIncomplete) {
      Smartgraphs.dialogTurnController.didReceiveIncompleteResponse();
      return;
    }
    
    if (isMalformed) {
      Smartgraphs.dialogTurnController.didReceiveMalformedResponse();
      return;
    }
    
    this.set('responseAsString', delegate.get('responseAsString'));
    
    if (isCorrect) {
      Smartgraphs.dialogTurnController.didReceiveCorrectResponse();        
    }
    else {
      Smartgraphs.dialogTurnController.didReceiveIncorrectResponse();
    }
  }
  
}) ;
