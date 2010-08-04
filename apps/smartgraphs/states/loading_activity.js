// ==========================================================================
// Project:   Smartgraphs.LOADING_ACTIVITY
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  Loading state for Activity view. (Don't call it ACTIVITY_LOADING because it is not a ACTIVITY substate)

  @extends SC.Responder
  @version 0.1
*/

sc_require('states/ready');

Smartgraphs.LOADING_ACTIVITY = SC.Responder.create(
/** @scope Smartgraphs.LOADING_ACTIVITY.prototype */ {

  nextResponder: Smartgraphs.READY,
  idBeingLoaded: null,
  activityStatusBinding: 'Smartgraphs.activityController*content.status', 

  didBecomeFirstResponder: function() {    
    // let activityController content sync (in case it is ever updated via a binding) and let activityStatusBinding sync
    SC.RunLoop.end();
    SC.RunLoop.begin();
    
    if (this.handlePossibleLoadCompletion() === NO) {
      Smartgraphs.appWindowController.showActivityLoadingView();
      // handlePossibleLoadCompletion will handle starting up the activity after the Activity record's status changes.
    }
  },
  
  willLoseFirstResponder: function() {
  },
  

  // ..........................................................
  // ACTIVITY CONTENT UPDATE
  //

  /**
    TODO:
      * make a query that loads all ActivityPages for this Activity
      * make a query that loads all Commands in the system
      * make a query that loads all Triggers in the system
      * test that the corresponding recordArrays are READY_CLEAN (*recordArray* status is set to READY_CLEAN
        when dataSourceDidFetchQuery completes)
      
     eventually:
      * download and push all this data in one request (plus the activity steps, probably)      
  **/
       
  _activityStatusDidChange: function () {
    this.invokeOnce(this.handlePossibleLoadCompletion);
  }.observes('activityStatus'),
  
  handlePossibleLoadCompletion: function () {
    var activityStatus = this.get('activityStatus');
    
    if (activityStatus === SC.Record.READY_CLEAN) {
      Smartgraphs.sendAction('beginactivity');
      return YES;    // load completed
    }
    else if (activityStatus === SC.Record.ERROR) {
      Smartgraphs.sendAction('handleActivityLoadError');
      return YES;   // load completed
    }
    return NO;      // load has NOT completed yet
  },
  
  // ..........................................................
  // ACTIONS
  //
  
  // Handle 're-entrance' (opening a activity while we're still waiting for another activity to load)
  openActivity: function (context, args){
    if (args.id === this.get('idBeingLoaded')) {
      // do nothing if it's a repeat request to load the same id
      return YES;
    }
    
    // otherwise, let READY handle opening the new activity, but make sure to repeat didBecomeFirstResponder
    Smartgraphs.invokeLater(Smartgraphs.resetFirstResponder);
    return NO;
  },
  
  beginactivity: function () {
    if (Smartgraphs.activityPagesController.get('length') > 0) {
      Smartgraphs.makeFirstResponder(Smartgraphs.ACTIVITY_PAGE_START);
      Smartgraphs.activityPagesController.selectFirstPage();
    }
    // TODO could go into some error state here if needed.
  },
  
  handleActivityLoadError: function () {
    Smartgraphs.makeFirstResponder(Smartgraphs.ERROR_LOADING_ACTIVITY);
  }
  
}) ;
