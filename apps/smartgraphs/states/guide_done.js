// ==========================================================================
// Project:   Smartgraphs.GUIDE_DONE
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  State representing that the activity guide is finished. User may want to proceed to another activity, or may want to
  view the lab book/answer sheet/student activity they they have created with the help of this Guide.
  
  @extends SC.Responder
  @version 0.1
*/
Smartgraphs.GUIDE_DONE = SC.Responder.create(
/** @scope Smartgraphs.GUIDE_DONE.prototype */ {
  
  nextResponder: Smartgraphs.GUIDE,
  
  didBecomeFirstResponder: function() {
  },
  
  willLoseFirstResponder: function() {
  },
  
  // ..........................................................
  // ACTIONS
  //
  
}) ;
