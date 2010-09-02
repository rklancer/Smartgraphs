// ==========================================================================
// Project:   Smartgraphs.START
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  The transient start state of the Smartgraphs application.

  @extends SC.Responder
  @version 0.1
*/
Smartgraphs.START = SC.Responder.create(
/** @scope Smartgraphs.START.prototype */ {

  nextResponder: null,
  
  didBecomeFirstResponder: function () {
    Smartgraphs.makeFirstResponder(Smartgraphs.LOGIN);
  }
  
  // ..........................................................
  // ACTIONS
  //

}) ;
