// ==========================================================================
// Project:   Smartgraphs.responseBecameValid
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Smartgraphs */

sc_require('triggers/trigger_observer');

Smartgraphs.triggers.responseBecameValid = Smartgraphs.TriggerObserver.create({
  
  registerObservers: function (args) {
     // TODO process args so we don't just do a single, hardwired type of observation
    console.log('responseBecameValid registering');
    
    Smartgraphs.responseTemplateController.addObserver('values.[]', this, this.valuesObserver);
    this._valueWasValid = NO;
  },
  
  unregisterObservers: function () {
    console.log('responseBecameValid unregistering');
    Smartgraphs.responseTemplateController.removeObserver('values.[]', this, this.valuesObserver);
    this._valueWasValid = NO;
  },
  
  valuesObserver: function () {
    var values = Smartgraphs.responseTemplateController.get('values');
    var value = values.objectAt(0);
    var valueIsValid = !!(value && value.strip().length > 0);
    
    console.group('valuesObserver');
    console.log('*** value: %s, wasValid: %s, isValid: %s', value, this._valueWasValid, valueIsValid);

    if (valueIsValid && !this._valueWasValid) {
      this.eventWasObserved();
    }
    else if (this._valueWasValid && !valueIsValid) {
      Smartgraphs.sendAction('fireGuideEvent', this, { eventName: 'responseBecameInvalid' });
    }

    console.groupEnd();
    this._valueWasValid = valueIsValid;
  },
  
  eventWasObserved: function () {
    Smartgraphs.sendAction('enableSubmission');
    sc_super(); 
  }
  
});