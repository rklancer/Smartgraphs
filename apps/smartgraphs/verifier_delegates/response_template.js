// ==========================================================================
// Project:   Smartgraphs.ResponseTemplateVerifierDelegate
// Copyright: ©2010 Concord Consortium
// ==========================================================================
/*globals Smartgraphs */

sc_require('verifier_delegates/verifier_delegate');

Smartgraphs.ResponseTemplateVerifierDelegate = Smartgraphs.VerifierDelegate.create({
  
  // init: function () {
  //   sc_super();
  //   this.responseArrayDidChange();
  // },

  checkResponse: function () {

    if (this.get('responseIsIncomplete')) {
      return;
    }

    var expectedResponse;
    var responseTypeIsNumeric = NO;
    var configString = this.get('configString');
    
    if (configString.indexOf('number:') === 0) {
      responseTypeIsNumeric = YES;
      expectedResponse = parseFloat(configString.substring(7));
    }
    else if (configString.indexOf('string:' === 0)) {
      expectedResponse = configString.substring(7);
    }
    else {
      // FIXME: use SC.Error?
      throw "ResponseTemplateVerifierDelegate received a configString that didn't start with 'number:' or 'string:'";
    }      

    var response = this.get('response');
    
    // eventually we could process responseAsString in a more sophisticated way, perhaps adding units, etc.
    this.set('responseAsString', response);
    
    this.set('responseIsMalformed', NO);
    if (responseTypeIsNumeric) {
      response = parseFloat(response);
      if (isNaN(response)) {
        this.set('responseIsMalformed', YES);
      }
    }
    if (this.get('responseIsMalformed')) {
      return;
    }

    this.set('responseIsCorrect', response === expectedResponse);
  },
  
  // Simplified implementation for now; will handle more objects in the responseArray after we implement actual
  // parsing of the templateString in ResponseTemplate

  responseArrayBinding: SC.Binding.oneWay('Smartgraphs.dialogTurnController.responseArray'),
  _oldResponseArray: null,
  
  responseArrayDidChange: function () {
    //SC.Logger.log('ResponseTemplateVerifierDelegate observed responseArray');
    var responseArray = this.get('responseArray');
    
    if (this._oldResponseArray) {
      this._oldResponseArray.removeObserver('[]', this, this.rawResponseDidChange);
    }
    if (responseArray) {
      responseArray.addObserver('[]', this, this.rawResponseDidChange);
    }
    this._oldResponseArray = responseArray;

    this.rawResponseDidChange();        // don't forget to calculate the new response value from the responseArray
  }.observes('responseArray'),
  
  rawResponseDidChange: function () {
    //SC.Logger.log('Smartgraphs.ResponseTemplateVerifierDelegate rawResponseDidChange');
    var responseArray = this.get('responseArray');
    var response = (responseArray && responseArray.get(length) > 0) ? responseArray.objectAt(0) : null;
    
    if (typeof response === 'string') {
      response = response.strip();
    }
    this.set('response', response);
  },
  
  responseIsReady: function () {
    var response = this.get('response');
    return (!!response && (response.length > 0));
  }.property('response').cacheable(), 
  
  responseIsIncomplete: function () {
    return !this.get('responseIsReady');
  }.property('responseIsReady').cacheable()
});
