// ==========================================================================
// Project:   Smartgraphs.ResponseVerifierTemplateDelegate
// Copyright: ©2010 Concord Consortium
// ==========================================================================
/*globals Smartgraphs */

Smartgraphs.ResponseTemplateVerifierDelegate = Smartgraphs.VerifierDelegate.extend({

  checkResponse: function () {
    var expectedResponse;
    var responseTypeIsNumber = NO;
    var configString = this.get('configString');
    
    if (configString.indexOf('number: ') === 0) {
      responseTypeIsNumber = YES;
      expectedResponse = parseFloat(configString.substring(8));
    }
    else if (configString.indexOf('string: ' === 0)) {
      expectedResponse = configString.substring(8);
    }
    else {
      // FIXME: use SC.Error?
      throw "ResponseTemplateVerifierDelegate received a configString that didn't start with 'number: ' or 'string: '";
    }      

    // Simplified implementation for now; will handle more objects in the responseArray after we implement actual
    // parsing of the templateString in ResponseTemplate
    
    var responseArray = Smartgraphs.responseTemplateController.get('responseArray');
    var response = responseArray ? responseArray.objectAt(0).strip() : null;
    
    this.set('responseIsComplete', !SC.none(response));
    if (SC.none(response)) return;
    
    // eventually we could process responseAsString in a more sophisticated way, perhaps adding units, etc.
    this.set('responseAsString', response);
    
    if (responseTypeIsNumber) {
      response = parseFloat(response);
      if (isNaN(response)) {
        this.set('responseIsMalformed', YES);
        return;
      }
    }

    this.set('responseIsCorrect', response === expectedResponse);
  }
  

});
