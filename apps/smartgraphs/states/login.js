// ==========================================================================
// Project:   Smartgraphs.LOGIN
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  The login state. 
  
  (The page displayed during this state should implement an "I'm new here" type button to switch to signup mode.)

  @extends SC.Responder
  @version 0.1
*/
Smartgraphs.LOGIN = SC.Responder.create(
/** @scope Smartgraphs.LOGIN.prototype */ {

  nextResponder: null,
  
  didBecomeFirstResponder: function() {
    // for now we use just a default user and assume the user record loads in synchronously from fixtures
    Smartgraphs.userController.set('content', Smartgraphs.store.find(Smartgraphs.User, 'default'));
    Smartgraphs.makeFirstResponder(Smartgraphs.READY);
  },
  
  willLoseFirstResponder: function() {
  }
  
  // ..........................................................
  // ACTIONS
  //
  
}) ;
