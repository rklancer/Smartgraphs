// ==========================================================================
// Project:   Smartgraphs.ACTIVITY_LOADING_STEP
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class
  
  @extends SC.Responder
  @version 0.1
*/

sc_require('states/activity');

Smartgraphs.ACTIVITY_LOADING_STEP = SC.Responder.create(
/** @scope Smartgraphs.ACTIVITY_LOADING_STEP.prototype */ {
  
  nextResponder: Smartgraphs.ACTIVITY,
  
  didBecomeFirstResponder: function() {
    Smartgraphs.activityStepController.set('content', Smartgraphs.activityPageController.get('currentStep'));
    
    // TODO!!! DRY up the commonality between this and LOADING_ACTIVITY in particular (potentially also 
    // with ACTIVITY_LOADING_PAGE, except that the latter doesn't need to load subordinate resources yet)
    
    this._watchedRecords = [];
    this.clearSubordinateResources();

    this._step = Smartgraphs.activityStepController.get('content');
    this.watch(this._step);

    if (this.checkStepStatus()) {
      // if everything is loaded (or there's an error loading the activity), nothing to do
      return;
    }
  },
  
  willLoseFirstResponder: function () {
    this._watchedRecords.forEach( function (recordOrRecordArray) {
      recordOrRecordArray.removeObserver('status', this, this.checkStepStatus);
    }, this);
  },
  
  // ..........................................................
  // STEP CONTENT UPDATE
  //
  
  checkStepStatus: function () {
    if (this._step.get('status') & SC.Record.READY) {
      return this.checkSubordinateResources();
    }
    else {
      if (this._step.get('status') & SC.Record.ERROR) {
        console.error('Error loading step %s', this._step.get('id'));
        // TODO go into some kind of error state
        return YES;
      }
    }
    return NO;  // not ready and not in error -> need to keep checking
  },
  
  clearSubordinateResources: function () {
    this._triggers = null;
    this._commands = null;
  },
  
  checkSubordinateResources: function () {  
    if (!this._triggers) {
      this._triggers = Smartgraphs.store.find(this._step.get('triggerResponsesQuery'));
      this.watch(this._triggers);
    }
    
    if (!this._commands) {
      this._commands = Smartgraphs.store.find(this._step.get('commandsQuery'));
      this.watch(this._commands);
    }
    
    if (this.allAreReady(this._triggers, this._commands)) {
      Smartgraphs.makeFirstResponder(Smartgraphs.ACTIVITY_STEP_START);
      return YES;
    }
    
    if (this.someHaveErrors(this._triggers, this._commands)) {
      // TODO go into some kind of error state
      return YES;
    }
    return NO;
  },
  
  watch: function (recordOrRecordArray) {
    this._watchedRecords.push(recordOrRecordArray);
    recordOrRecordArray.addObserver('status', this, this.checkStepStatus);
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
        console.error('Error status loading subordinate resource for %s', this._step.get('id'));
        return YES;
      }
    }
    return NO;
  }
  
  
  // ..........................................................
  // ACTIONS
  //
  
}) ;
