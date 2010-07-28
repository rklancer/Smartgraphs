// ==========================================================================
// Project:   Smartgraphs.responseBecameInvalid
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Smartgraphs */

sc_require('triggers/trigger_observer');

Smartgraphs.triggers.responseBecameInvalid = Smartgraphs.TriggerObserver.create({

  // responseBecameValid registers observers for us... should it be renamed?
  eventWasObserved: function () {
    Smartgraphs.sendAction('disableSubmission');
    sc_super(); 
  }
  
});