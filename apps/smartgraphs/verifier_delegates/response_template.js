// ==========================================================================
// Project:   Smartgraphs.ResponseVerifierTemplateDelegate
// Copyright: ©2010 Concord Consortium
// ==========================================================================
/*globals Smartgraphs */

sc_require('verifier_delegates/verifier_delegate');

Smartgraphs.ResponseTemplateVerifierDelegate = Smartgraphs.VerifierDelegate.extend({
  
  checkResponse: function () {

    if (this.get('responseIsIncomplete')) return;

    var expectedResponse;
    var responseTypeIsNumeric = NO;
    var configString = this.get('configString');
    
    if (configString.indexOf('number: ') === 0) {
      responseTypeIsNumeric = YES;
      expectedResponse = parseFloat(configString.substring(8));
    }
    else if (configString.indexOf('string: ' === 0)) {
      expectedResponse = configString.substring(8);
    }
    else {
      // FIXME: use SC.Error?
      throw "ResponseTemplateVerifierDelegate received a configString that didn't start with 'number: ' or 'string: '";
    }      

    var response = this.get('response');
    
    // eventually we could process responseAsString in a more sophisticated way, perhaps adding units, etc.
    this.set('responseAsString', response);
    
    this.set('responseIsMalformed', NO);
    if (responseTypeIsNumeric) {
      response = parseFloat(response);
      if (isNaN(response)) this.set('responseIsMalformed', YES);
    }
    if (this.get('responseIsMalformed')) return;

    this.set('responseIsCorrect', response === expectedResponse);
  },
  
  // Simplified implementation for now; will handle more objects in the responseArray after we implement actual
  // parsing of the templateString in ResponseTemplate

  responseDidChange: function () {
    var responseArray = Smartgraphs.responseTemplateController.get('responseArray');
    var response = (responseArray && responseArray.get('length') > 0) ? responseArray.objectAt(0) : null;

    if (typeof response === 'string') {
      response = response.strip();
    }
    
    this.set('response', response);
  }.observes('Smartgraphs.responseTemplateController.responseArray'),
  
  responseIsReady: function () {
    var response = this.get('response');
    var ret = (!!response && (response.length > 0));
    return ret;
  }.property('response').cacheable(), 
  
  responseIsIncomplete: function () {
    return !this.get('responseIsReady');
  }.property('responseIsReady').cacheable()
});
