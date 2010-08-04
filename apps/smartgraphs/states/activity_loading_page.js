// ==========================================================================
// Project:   Smartgraphs.ACTIVITY_LOADING_PAGE
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  @extends SC.Responder
  @version 0.1
*/

sc_require('states/activity');

Smartgraphs.ACTIVITY_LOADING_PAGE = SC.Responder.create(
/** @scope Smartgraphs.ACTIVITY_LOADING_PAGE.prototype */ {
  
  nextResponder: Smartgraphs.ACTIVITY,
  
  didBecomeFirstResponder: function() {
    // TODO. Make sure all the ActivitySteps associated with the current ActivityPage are loaded.
    Smartgraphs.makeFirstResponder(Smartgraphs.ACTIVITY_PAGE_START);
  }
  
  // ..........................................................
  // ACTIONS
  //
  
}) ;
