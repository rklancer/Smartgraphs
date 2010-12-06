// ==========================================================================
// Project:   Smartgraphs.READY
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  Superstate indicating that the Smartgraphs application is loaded and ready for user interaction.
  
  From here, we might:
    * show the list of Activities
    * open a particular Activity based on the route (or based on a directive set by the teacher, if there is one)
    * allow the user to edit an Activity
    * allow the user to update their personal information
    * allow the user to examine their lab book
    * allow the user to see their previous answer sheets
    * allow the user to go into a 'mess around' state where they can plug in sensors and edit graphs
  etc.

  @extends SC.Responder
  @version 0.1
*/
Smartgraphs.READY = SC.Responder.create(
/** @scope Smartgraphs.READY.prototype */ {

  nextResponder: null,
  fencedActivityId: null,
  
  didBecomeFirstResponder: function() {
    // Eventually we can use SC.routes to parse a 'query string' for us, as per:
    // http://smartgraphs.concord.org/app#?mode=edit_activity&activity=/activities/rklancer/my-fancy-activity'
    
    // for now, we just take the URL fragment to be the activityId
    SC.routes.add('*activityId', this, 'route');
  },
  
  willLoseFirstResponder: function() {
  },
  
  // SC.routes callback (not really an action; SC.routes calls this method directly)
  route: function (route) {
    if (route.activityId) Smartgraphs.sendAction('openActivity', this, { id: route.activityId });
  },

  // ..........................................................
  // ACTIONS
  //
  
  openActivity: function (context, args) {
    var activityContent = Smartgraphs.activityController.get('content');
    if (activityContent && activityContent.get('id') === args.id) {
      return YES; // nothing to do!
    }
    
    Smartgraphs.activityController.set('content', Smartgraphs.store.find(Smartgraphs.Activity, args.id));
    Smartgraphs.makeFirstResponder(Smartgraphs.LOADING_ACTIVITY);
    return YES;
  }
  
}) ;
