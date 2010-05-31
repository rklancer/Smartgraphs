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
  
  contentBinding: 'Smartgraphs.dialogTurnController.responseVerifier',
  
  contentDidChange: function () {
    var content = this.get('content');
    if (!content) return;         // nothing to do

    var delegatePath = 'Smartgraphs.' + this.get('verifierDelegateName') + 'VerifierDelegate';
    var delegate = SC.objectForPropertyPath(delegatePath);
    delegate.set('configString', this.get('configString'));
    this.set('verifierDelegate', delegate);
  }.observes('content'),

  responseCanBeCheckedBinding: SC.Binding.bool('.verifierDelegate').oneWay(),
  responseIsReadyBinding: SC.Binding.oneWay('*verifierDelegate.responseIsReady'),
  
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
