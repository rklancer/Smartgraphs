// ==========================================================================
// Project:   Smartgraphs.appWindowController Unit Test
// Copyright: ©2010 Concord Consortium
// @author:   Parker Morse <pmorse@cantinaconsulting.com>
// ==========================================================================
/*globals Smartgraphs module test ok equals same stop start */

module("Smartgraphs.appWindowController", {
  setup: function() {
    
  },
  
  teardown: function() {
    Smartgraphs.appWindowController.set('nowShowing', null);
    Smartgraphs.appWindowController.set('loadingMessage', null);
  }
});

test("showActivityView sets the nowShowing value", function() {
  expect(2);
  equals( Smartgraphs.appWindowController.get('nowShowing'), null, "nowShowing value starts as null");
  Smartgraphs.appWindowController.showActivityView();
  equals( Smartgraphs.appWindowController.get('nowShowing'), 'Smartgraphs.activityPage.activityView', "nowShowing value is for activityPage.activityView");
});

test("showActivityLoadingView sets the values for the loading view", function() {
  expect(4);
  equals( Smartgraphs.appWindowController.get('nowShowing'), null, "nowShowing value starts as null");
  equals( Smartgraphs.appWindowController.get('loadingMessage'), null, "loadingMessage value starts as null");
  Smartgraphs.appWindowController.showActivityLoadingView();
  equals( Smartgraphs.appWindowController.get('nowShowing'), 'Smartgraphs.mainPage.loadingView', "nowShowing value is for mainPage.loadingView");
  equals( Smartgraphs.appWindowController.get('loadingMessage'), Smartgraphs.activityPage.getPath('activityView.loadingMessage'), 'loadingMessage value should match the activityView loadingMessage');
});

test("showErrorLoadingActivityView sets the nowShowing value for errors", function() {
  expect(2);
  equals( Smartgraphs.appWindowController.get('nowShowing'), null, "nowShowing value starts as null");
  Smartgraphs.appWindowController.showErrorLoadingActivityView();
  equals( Smartgraphs.appWindowController.get('nowShowing'), 'Smartgraphs.activityPage.errorLoadingActivityView', "nowShowing value is for activityPage.errorLoadingActivityView");
});

