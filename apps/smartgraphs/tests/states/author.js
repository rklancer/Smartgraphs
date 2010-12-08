// ==========================================================================
// Project:   Smartgraphs.AUTHOR Unit Test
// Copyright: ©2010 Concord Consortium
// @author:   Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs module test ok equals same stop start setup teardown */

var dummyState = SC.Responder.create();

module("Smartgraphs.AUTHOR", {
  setup: function () {
    setup.mock(Smartgraphs, 'READY', dummyState);
    setup.mock(Smartgraphs.AUTHOR, 'nextResponder', Smartgraphs.READY);
    setup.store();
  },
  
  teardown: function () {
    Smartgraphs.makeFirstResponder(Smartgraphs.READY);
    teardown.all();
  }
});

test("AUTHOR should open the author view", function () {
  expect(1);
  Smartgraphs.appWindowController.set('viewToShow', null);
  Smartgraphs.makeFirstResponder(Smartgraphs.AUTHOR);
  equals(Smartgraphs.appWindowController.get('viewToShow'), 'Smartgraphs.authorPage.authorView', "The activity view should be open after transitioning to AUTHOR state");
});


test("entering AUTHOR state should set selectability and navigability", function () {
  expect(2);
  Smartgraphs.activityOutlineController.set('isSelectable', NO);
  Smartgraphs.activityViewController.set('enableBackAndForward', NO);
  
  Smartgraphs.makeFirstResponder(Smartgraphs.AUTHOR);
  
  equals( Smartgraphs.activityOutlineController.get('isSelectable'), YES, "Transitioning to AUTHOR state should set 'isSelectable' on outline controller to YES");
  equals( Smartgraphs.activityViewController.get('enableBackAndForward'), YES, "Transitioning to AUTHOR state should set 'enableBackAndForward' on activity view controller to YES");  
});


test("exiting AUTHOR state should unset selectability and navigability", function () {
  expect(2);
  Smartgraphs.makeFirstResponder(Smartgraphs.AUTHOR);
  // if they aren't already...
  Smartgraphs.activityOutlineController.set('isSelectable', YES);
  Smartgraphs.activityViewController.set('enableBackAndForward', YES);
  
  Smartgraphs.makeFirstResponder(Smartgraphs.READY);
  
  equals( Smartgraphs.activityOutlineController.get('isSelectable'), NO, "Transitioning away from AUTHOR state should set 'isSelectable' on outline controller to NO");
  equals( Smartgraphs.activityViewController.get('enableBackAndForward'), NO, "Transitioning away from AUTHOR state should set 'enableBackAndForward' on activity view controller to NO");  
});


test("'runActivity' action in AUTHOR state should go to LOADING_ACTIVITY and set openAuthorViewAfterLoading to NO", function () {
  expect(2);
  setup.mock(Smartgraphs.LOADING_ACTIVITY, 'nextResponder', Smartgraphs.READY);
  setup.mock(Smartgraphs.LOADING_ACTIVITY, 'didBecomeFirstResponder', function () {});
  setup.mock(Smartgraphs.LOADING_ACTIVITY, 'willLoseFirstResponder', function () {});
  Smartgraphs.LOADING_ACTIVITY.set('openAuthorViewAfterLoading', YES);

  Smartgraphs.makeFirstResponder(Smartgraphs.AUTHOR);
  Smartgraphs.sendAction('runActivity');
  
  equals(Smartgraphs.get('firstResponder'), Smartgraphs.LOADING_ACTIVITY, "after 'runActivity' action, Smartgraphs should be in the LOADING_ACTIVITY state");
  equals(Smartgraphs.LOADING_ACTIVITY.get('openAuthorViewAfterLoading'), NO, "after 'runActivity' action in AUTHOR state, LOADING_ACTIVITY.openAuthorViewAfterLoading should be NO");
});
