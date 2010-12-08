// ==========================================================================
// Project:   Smartgraphs.appWindowController Unit Test
// Copyright: ©2010 Concord Consortium
// @author:   Parker Morse <pmorse@cantinaconsulting.com>
// ==========================================================================
/*globals Smartgraphs module test ok equals same stop start */

module("Smartgraphs.appWindowController", {
  setup: function() {
    Smartgraphs.appWindowController.set('viewToShow', null);
    Smartgraphs.appWindowController.set('loadingMessage', null);
  },
  
  teardown: function() {
    Smartgraphs.appWindowController.set('viewToShow', null);
    Smartgraphs.appWindowController.set('loadingMessage', null);
  }
});

test("showActivityView sets the viewToShow value", function() {
  expect(2);
  equals( Smartgraphs.appWindowController.get('viewToShow'), null, "viewToShow value starts as null");
  Smartgraphs.appWindowController.showActivityView();
  equals( Smartgraphs.appWindowController.get('viewToShow'), 'Smartgraphs.activityPage.activityView', "viewToShow value is for activityPage.activityView");
});

test("showActivityLoadingView sets the values for the loading view", function() {
  expect(4);
  equals( Smartgraphs.appWindowController.get('viewToShow'), null, "viewToShow value starts as null");
  equals( Smartgraphs.appWindowController.get('loadingMessage'), null, "loadingMessage value starts as null");
  Smartgraphs.appWindowController.showActivityLoadingView();
  equals( Smartgraphs.appWindowController.get('viewToShow'), 'Smartgraphs.mainPage.loadingView', "viewToShow value is for mainPage.loadingView");
  equals( Smartgraphs.appWindowController.get('loadingMessage'), Smartgraphs.activityPage.getPath('activityView.loadingMessage'), 'loadingMessage value should match the activityView loadingMessage');
});

test("showErrorLoadingActivityView sets the viewToShow value for errors", function() {
  expect(2);
  equals( Smartgraphs.appWindowController.get('viewToShow'), null, "viewToShow value starts as null");
  Smartgraphs.appWindowController.showErrorLoadingActivityView();
  equals( Smartgraphs.appWindowController.get('viewToShow'), 'Smartgraphs.activityPage.errorLoadingActivityView', "viewToShow value is for activityPage.errorLoadingActivityView");
});

