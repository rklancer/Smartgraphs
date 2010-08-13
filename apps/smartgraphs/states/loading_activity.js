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
    this._watchedRecords = [];
    this.clearSubordinateResources();
        
    this._activity = Smartgraphs.activityController.get('content');
    this.watch(this._activity);

    if (this.checkActivityStatus()) {
      // if everything is loaded (or there's an error loading the activity), nothing to do
      return;
    }

    Smartgraphs.appWindowController.showActivityLoadingView();
  },
  
  willLoseFirstResponder: function () {
    this._watchedRecords.forEach( function (recordOrRecordArray) {
      recordOrRecordArray.removeObserver('status', this, this.checkActivityStatus);
    }, this);
  },
  
  // ..........................................................
  // ACTIVITY CONTENT UPDATE
  //

  clearSubordinateResources: function () {
    this._pages = null;
    this._triggers = null;
    this._commands = null;
  },
  
  checkActivityStatus: function () {
    if (this._activity.get('status') & SC.Record.READY) {
      return this.checkSubordinateResources();
    }
    else {
      if (this._activity.get('status') & SC.Record.ERROR) {
        Smartgraphs.makeFirstResponder(Smartgraphs.ERROR_LOADING_ACTIVITY);
        return YES;
      }
    }
    return NO;  // not ready and not in error -> need to keep checking
  },
  
  checkSubordinateResources: function () {
    if (!this._pages) {     // s/b cleared every time
      this._pages = Smartgraphs.store.find(this._activity.get('pagesQuery'));
      this.watch(this._pages);
    }
    
    if (!this._triggers) {
      this._triggers = Smartgraphs.store.find(Smartgraphs.ALL_TRIGGERS_QUERY);
      this.watch(this._triggers);
    }
    
    if (!this._commands) {
      this._commands = Smartgraphs.store.find(Smartgraphs.ALL_COMMANDS_QUERY);
      this.watch(this._commands);
    }
    
    if (this.allAreReady(this._pages, this._triggers, this._commands)) {
      Smartgraphs.makeFirstResponder(Smartgraphs.ACTIVITY_START);
      return YES;
    }
    
    if (this.someHaveErrors(this._pages, this._triggers, this._commands)) {
      Smartgraphs.makeFirstResponder(Smartgraphs.ERROR_LOADING_ACTIVITY);
      return YES;
    }
    return NO;
  },
  
  watch: function (recordOrRecordArray) {
    this._watchedRecords.push(recordOrRecordArray);
    recordOrRecordArray.addObserver('status', this, this.checkActivityStatus);
  },
  
  
  allAreReady: function () {
    for (var i = 0, ii = arguments.length; i < ii; i++) {
      if (!(arguments[i].get('status') & SC.Record.READY)) {
        return NO;
      }
    }
    return YES;
  }, 
  
  someHaveErrors: function () {
    for (var i = 0, ii = arguments.length; i < ii; i++) {
      if ((arguments[i].get('status') & SC.Record.ERROR)) {
        return YES;
      }
    }
    return NO;
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
