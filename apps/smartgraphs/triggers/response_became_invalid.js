// ==========================================================================
// Project:   Smartgraphs.responseBecameInvalid
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

sc_require('triggers/trigger_observer');

Smartgraphs.triggers.responseBecameInvalid = Smartgraphs.TriggerObserver.create({

  // responseBecameValid registers observers for us... should it be renamed?
  fire: function () {
    Smartgraphs.sendAction('disableSubmission');
    sc_super(); 
  }
  
});