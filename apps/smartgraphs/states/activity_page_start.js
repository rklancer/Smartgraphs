// ==========================================================================
// Project:   Smartgraphs.ACTIVITY_PAGE_START
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  State representing that the activity page is starting.
  
  @extends SC.Responder
  @version 0.1
*/

sc_require('states/activity');

Smartgraphs.ACTIVITY_PAGE_START = SC.Responder.create(
/** @scope Smartgraphs.ACTIVITY_PAGE_START.prototype */ {

  nextResponder: Smartgraphs.ACTIVITY,
  
  didBecomeFirstResponder: function () {
    Smartgraphs.activityPageController.set('content', Smartgraphs.activityPagesController.get('selection'));
    Smartgraphs.activityPageController.set('currentStep', Smartgraphs.activityPageController.get('firstStep'));
    Smartgraphs.makeFirstResponder(Smartgraphs.ACTIVITY_LOADING_STEP);
  }
  
  // ..........................................................
  // ACTIONS
  //

  
}) ;
