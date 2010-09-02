// ==========================================================================
// Project:   Smartgraphs.ACTIVITY_DONE
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  State representing that the activity activity is finished. User may want to proceed to another activity, or may 
  want to view the lab book/answer sheet/etc they they have created with the help of this Activity.
  
  @extends SC.Responder
  @version 0.1
*/

sc_require('states/activity');

Smartgraphs.ACTIVITY_DONE = SC.Responder.create(
/** @scope Smartgraphs.ACTIVITY_DONE.prototype */ {
  
  nextResponder: Smartgraphs.ACTIVITY
  
  // ..........................................................
  // ACTIONS
  //
  
}) ;
