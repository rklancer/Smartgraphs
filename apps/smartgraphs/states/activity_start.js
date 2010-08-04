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

    var pages = Smartgraphs.activityController.get('pages');
    console.log('pages.length: ', pages.get('length'));
    console.log('activityPagesController.length: ', Smartgraphs.activityPagesController.get('length'));
    
    Smartgraphs.activityPagesController.set('content', pages);
    console.log('activityPagesController.length (after): ', Smartgraphs.activityPagesController.get('length'));

    if (pages.get('length') > 0) {
      Smartgraphs.activityPagesController.selectFirstPage();
    }
    
    Smartgraphs.makeFirstResponder(Smartgraphs.ACTIVITY_LOADING_PAGE);
  }
  
  // ..........................................................
  // ACTIONS
  //
  
}) ;
