// ==========================================================================
// Project:   Smartgraphs.ACTIVITY_LOADING_STEP
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class
  
  @extends SC.Responder
  @version 0.1
*/

sc_require('states/activity');

Smartgraphs.ACTIVITY_LOADING_STEP = SC.Responder.create(
/** @scope Smartgraphs.ACTIVITY_LOADING_STEP.prototype */ {
  
  nextResponder: Smartgraphs.ACTIVITY,
  
  didBecomeFirstResponder: function() {
    // TODO. Make sure the all TriggerResponses and ResponseTemplates associated with the current ActivityStep
    // are loaded. Also make sure all the CommandInvocations associated with the TriggerResponses for this step
    // are loaded.
    Smartgraphs.makeFirstResponder(Smartgraphs.ACTIVITY_STEP_START);
  }
  
  // ..........................................................
  // ACTIONS
  //
  
}) ;
