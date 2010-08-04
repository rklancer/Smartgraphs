// ==========================================================================
// Project:   Smartgraphs.ACTIVITY
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  Superstate representing that the application is running a Activity.

  @extends SC.Responder
  @version 0.1
*/

sc_require('states/ready');

Smartgraphs.ACTIVITY = SC.Responder.create(
/** @scope Smartgraphs.ACTIVITY_START.prototype */ {
  
  nextResponder: Smartgraphs.READY,       // the default; if some other app state implements the openActivity action in 
                                          // some way, presumably that state should set itself as our nextResponder
  
  didBecomeFirstResponder: function() {
    Smartgraphs.appWindowController.showActivityView();
  },
  
  // ..........................................................
  // ACTIONS
  //
  
  /**
    Triggers args.eventName, which results in the corresponding triggerResponse's commands being executed by the Activity
  */
  fireActivityEvent: function (context, args) {
    if (args.eventName) {
      var trigger = Smartgraphs.triggers[args.eventName];
      if (trigger) trigger.eventWasObserved();
    }
    return YES;
  }
  
}) ;
