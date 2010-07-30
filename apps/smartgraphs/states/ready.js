// ==========================================================================
// Project:   Smartgraphs.READY
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  Superstate indicating that the Smartgraphs application is loaded and ready for user interaction.
  
  From here, we might:
    * show the list of Guides/activities
    * open a particular Guide based on the route (or based on a directive set by the teacher, if there is one)
    * allow the user to edit a Guide
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
  
  didBecomeFirstResponder: function() {
    // Eventually we can use SC.routes to parse a 'query string' for us, as per:
    // http://smartgraphs.concord.org/app#?mode=edit_guide&guide=/guides/rklancer/my-fancy-guide'
    
    // for now, we just take the URL fragment to be the guideId
    SC.routes.add('*guideId', this, 'route');
  },
  
  willLoseFirstResponder: function() {
  },
  
  // SC.routes callback (not really an action; SC.routes calls this method directly)
  route: function (route) {
    var guideId = route.guideId;
    Smartgraphs.sendAction('openGuide', this, { id: guideId });
  },

  // ..........................................................
  // ACTIONS
  //
  
  openGuide: function (context, args) {
    // the default action, unless overridden in some later state, is just to set the current guide in the guide
    // controller and go into the GUIDE state

    var guideContent = Smartgraphs.guideController.get('content');
    if (guideContent && guideContent.get('id') === args.id) {
      return YES; // nothing to do!
    }
    
    Smartgraphs.guideController.set('content', Smartgraphs.store.find(Smartgraphs.Guide, args.id));
    Smartgraphs.makeFirstResponder(Smartgraphs.LOADING_GUIDE);
    return YES;
  }
  
}) ;
