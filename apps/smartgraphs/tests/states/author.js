// ==========================================================================
// Project:   Smartgraphs.AUTHOR Unit Test
// Copyright: ©2010 Concord Consortium
// Author:   Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs module test ok equals same stop start setup teardown */

var dummyState = SC.Responder.create();

module("Smartgraphs.AUTHOR", {
  setup: function () {
    
    setup.mock(Smartgraphs, 'statechart', SC.Statechart.create({
      trace: YES,
      rootState: SC.State.design({
        initialSubstate: 'DUMMY',
        DUMMY: SC.State.design(),
        LOADING_ACTIVITY: SC.State.design(),
        AUTHOR: SC.State.plugin('Smartgraphs.AUTHOR')
      })
    }));
    
    Smartgraphs.statechart.initStatechart();
    setup.store();
  },
  
  teardown: function () {
    teardown.all();
  }
});

test("AUTHOR should open the author view", function () {
  expect(1);
  Smartgraphs.appWindowController.set('viewToShow', null);
  Smartgraphs.statechart.gotoState('AUTHOR');
  equals(Smartgraphs.appWindowController.get('viewToShow'), 'Smartgraphs.authorPage.authorView', "The activity view should be open after transitioning to AUTHOR state");
});


test("entering AUTHOR state should set selectability and navigability", function () {
  expect(2);
  Smartgraphs.activityOutlineController.set('isSelectable', NO);
  Smartgraphs.activityViewController.set('enableBackAndForward', NO);
  
  Smartgraphs.statechart.gotoState('AUTHOR');
  
  equals( Smartgraphs.activityOutlineController.get('isSelectable'), YES, "Transitioning to AUTHOR state should set 'isSelectable' on outline controller to YES");
  equals( Smartgraphs.activityViewController.get('enableBackAndForward'), YES, "Transitioning to AUTHOR state should set 'enableBackAndForward' on activity view controller to YES");  
});


test("exiting AUTHOR state should unset selectability and navigability", function () {
  expect(2);
  Smartgraphs.statechart.gotoState('AUTHOR');
  // if they aren't already...
  Smartgraphs.activityOutlineController.set('isSelectable', YES);
  Smartgraphs.activityViewController.set('enableBackAndForward', YES);
  
  Smartgraphs.statechart.gotoState('DUMMY');
  
  equals( Smartgraphs.activityOutlineController.get('isSelectable'), NO, "Transitioning away from AUTHOR state should set 'isSelectable' on outline controller to NO");
  equals( Smartgraphs.activityViewController.get('enableBackAndForward'), NO, "Transitioning away from AUTHOR state should set 'enableBackAndForward' on activity view controller to NO");  
});


test("'runActivity' action in AUTHOR state should go to LOADING_ACTIVITY and set openAuthorViewAfterLoading to NO", function () {
  expect(2);
  
  setup.mock(Smartgraphs.loadingActivityController, 'openAuthorViewAfterLoading', YES);
  Smartgraphs.statechart.gotoState('AUTHOR');
  Smartgraphs.statechart.sendAction('runActivity');

  same(Smartgraphs.statechart.get('currentStates').getEach('name'), ['LOADING_ACTIVITY'], "after 'runActivity' action, Smartgraphs should be in the LOADING_ACTIVITY state");
  equals(Smartgraphs.loadingActivityController.get('openAuthorViewAfterLoading'), NO, "after 'runActivity' action in AUTHOR state, LOADING_ACTIVITY.openAuthorViewAfterLoading should be NO");
});
