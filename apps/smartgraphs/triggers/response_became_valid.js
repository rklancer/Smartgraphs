// ==========================================================================
// Project:   Smartgraphs.responseBecameValid
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

sc_require('triggers/trigger_observer');

Smartgraphs.triggers.responseBecameValid = Smartgraphs.TriggerObserver.create({
  
  registerObservers: function (args) {
     // TODO process args so we don't just do a single, hardwired type of observation    
    Smartgraphs.responseTemplateController.addObserver('values.[]', this, this.valuesObserver);
    this._valueWasValid = NO;
  },
  
  unregisterObservers: function () {
    Smartgraphs.responseTemplateController.removeObserver('values.[]', this, this.valuesObserver);
    this._valueWasValid = NO;
  },
  
  valuesObserver: function () {
    var values = Smartgraphs.responseTemplateController.get('values');
    if (!values) return;

    var value = values.objectAt(0);
    var valueIsValid = !!(value && value.strip().length > 0);

    if (valueIsValid && !this._valueWasValid) {
      Smartgraphs.sendAction('fireActivityEvent', this, { eventName: 'responseBecameValid' });
    }
    else if (this._valueWasValid && !valueIsValid) {
      Smartgraphs.sendAction('fireActivityEvent', this, { eventName: 'responseBecameInvalid' });
    }
    
    this._valueWasValid = valueIsValid;
  },
  
  eventWasObserved: function () {
    Smartgraphs.sendAction('enableSubmission');
    sc_super(); 
  }
  
});