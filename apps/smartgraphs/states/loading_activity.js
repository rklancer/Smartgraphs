// ==========================================================================
// Project:   Smartgraphs.LOADING_ACTIVITY
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  Loading state for Activity view. (Not called ACTIVITY_LOADING because it is not an ACTIVITY substate)

  @extends SC.Responder
  @version 0.1
*/

sc_require('states/ready');

Smartgraphs.LOADING_ACTIVITY = SC.Responder.create(
/** @scope Smartgraphs.LOADING_ACTIVITY.prototype */ {

  nextResponder: Smartgraphs.READY,

  didBecomeFirstResponder: function() {
    
    this._recordList = [];
    this._pages = null;
    
    // these are cached
    if (!this._triggers) {
      this._triggers = Smartgraphs.store.find(Smartgraphs.ALL_TRIGGERS_QUERY);
      this._recordList.push(this._triggers);
    }
    
    if (!this._commands) {
      this._commands = Smartgraphs.store.find(Smartgraphs.ALL_COMMANDS_QUERY);
      this._recordList.push(this._commands);
    }
    
    this._activity = Smartgraphs.activityController.get('content');
    this._recordList.push(this._activity);
    
    if (this.checkStatuses()) {
      return;
    }

    Smartgraphs.appWindowController.showActivityLoadingView();

    this._recordList.forEach( function (recordOrRecordArray) {
      recordOrRecordArray.addObserver('status', this, this.checkStatuses);
    }, this);
  },
  
  willLoseFirstResponder: function () {
    this._recordList.forEach( function (recordOrRecordArray) {
      recordOrRecordArray.removeObserver('status', this, this.checkStatuses);
    }, this);
  },
  
  // ..........................................................
  // ACTIVITY CONTENT UPDATE
  //

  /** Dispatches to appropriate state if statuses of records are recordArrays we are waiting on are all READY
      Adds pagesQuery's recordArray to the list of recordArrays we are waiting on if Activity has loaded */
      
  checkStatuses: function () {
    
    // If Activity has loaded and pagesQuery has not been requested, add pagesQuery to the list of things we're 
    // waiting on

    if ((this._activity.get('status') & SC.Record.READY) && (this._pages === null)) {
      this._pages = Smartgraphs.store.find(this._activity.get('pagesQuery'));   
      if (!(this._pages.get('status') & SC.Record.READY)) {
        // pagesQuery are not ready; need to wait for them.
        this._recordList.push(this._pages);
        this._pages.addObserver('status', this, this.checkStatus);
        return NO;
      }
      // post-condition: (activity is READY && pages have been requested && pages are not READY)
    }
    
    // post-condition:
    // (activity is not READY || pages have been requested with status unknown) 
    // || 
    // (activity is READY && pages have been requested && pages are not READY)
    
    if (this.statusesAreReady()) {
      Smartgraphs.makeFirstResponder(Smartgraphs.ACTIVITY_START);
      return YES;
    }
    
    if (this.statusesHaveErrors()) {
      Smartgraphs.makeFirstResponder(Smartgraphs.ERROR_LOADING_ACTIVITY);
      return YES;       // handled...
    }
    
    return NO;          // need to keep waiting
  },
  
  /** Returns YES if all of the records and recordArrays we are waiting on have READY status.
     Note that *recordArrays* (not just the individual records) from a query are marked as having status 
     READY_CLEAN when the data source calls back to the store via dataSourceDidFetchQuery */

  statusesAreReady: function () {
    var recordOrRecordArray;
    var ret = YES;
    
    for (var i = 0, ii = this._recordList.get('length'); i < ii; i++) {
      recordOrRecordArray = this._recordList.objectAt(i);
      ret = ret && !!(recordOrRecordArray.get('status') & SC.Record.READY);
    }
    return ret;
  },
  
  /** Returns YES if any of the records and recordArrays we are waiting on have ERROR status. */ 
  statusesHaveErrors: function () {
    var recordOrRecordArray;
    var ret = NO;
    
    for (var i = 0, ii = this._recordList.get('length'); i < ii; i++) {
      recordOrRecordArray = this._recordList.objectAt(i);
      ret = ret || !!(recordOrRecordArray.get('status') & SC.Record.ERROR);
    }
    return ret;
  },
  
  // ..........................................................
  // ACTIONS
  //
  
  // Handle 're-entrance' (opening a activity while we're still waiting for another activity to load)
  openActivity: function (context, args){
    if (args.id === Smartgraphs.activityController.getPath('content.id')) {
      // do nothing if it's a repeat request to load the same id
      return YES;
    }
    
    //  let READY handle opening the new activity, but we need to resetFirstResponder because the
    // 'makeFirstResponder' call in READY won't cause our didBecomeFirstResponder method to be called again
    Smartgraphs.invokeLater(Smartgraphs.resetFirstResponder);
    return NO;
  }
  
}) ;
