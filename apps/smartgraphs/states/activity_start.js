// ==========================================================================
// Project:   Smartgraphs.ACTIVITY_START
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class
  
  @extends SC.Responder
  @version 0.1
*/

sc_require('states/activity');

Smartgraphs.ACTIVITY_START = SC.Responder.create(
/** @scope Smartgraphs.ACTIVITY_START.prototype */ {
  
  nextResponder: Smartgraphs.ACTIVITY,
  
  didBecomeFirstResponder: function() {
    Smartgraphs.sessionController.newSession();
    Smartgraphs.makeFirstResponder(Smartgraphs.ACTIVITY_LOADING_PAGE);
  }
  
  // ..........................................................
  // ACTIONS
  //
  
}) ;
