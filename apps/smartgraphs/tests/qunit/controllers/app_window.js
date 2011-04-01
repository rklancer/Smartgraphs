// ==========================================================================
// Project:   Smartgraphs.appWindowController Unit Test
// Copyright: ©2010 Concord Consortium
// Author:   Parker Morse <pmorse@cantinaconsulting.com>
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

function pathIsAView(path) {
  return SC.kindOf(SC.objectForPropertyPath(path), SC.View);
}

test("showActivityView sets the viewToShow value", function() {
  expect(3);
  equals( Smartgraphs.appWindowController.get('viewToShow'), null, "viewToShow value starts as null");
  Smartgraphs.appWindowController.showActivityView();
  var viewToShow = Smartgraphs.appWindowController.get('viewToShow');
  equals( viewToShow, 'Smartgraphs.activityPage.activityView', "viewToShow value should be the activity view");
  ok( pathIsAView(viewToShow), "viewToShow value should represent a real SC.View");
  
});


test("showActivityLoadingView sets the values for the loading view", function() {
  expect(5);
  equals( Smartgraphs.appWindowController.get('viewToShow'), null, "viewToShow value starts as null");
  equals( Smartgraphs.appWindowController.get('loadingMessage'), null, "loadingMessage value starts as null");
  Smartgraphs.appWindowController.showActivityLoadingView();
  var viewToShow = Smartgraphs.appWindowController.get('viewToShow');
  equals(viewToShow, 'Smartgraphs.mainPage.loadingView', "viewToShow value is for mainPage.loadingView");
  ok( pathIsAView(viewToShow), "viewToShow value should represent a real SC.View");
  equals( Smartgraphs.appWindowController.get('loadingMessage'), Smartgraphs.activityPage.getPath('activityView.loadingMessage'), 'loadingMessage value should match the activityView loadingMessage');
});


test("showErrorLoadingActivityView sets the viewToShow value for errors", function() {
  expect(3);
  equals( Smartgraphs.appWindowController.get('viewToShow'), null, "viewToShow value starts as null");
  Smartgraphs.appWindowController.showErrorLoadingActivityView();
  var viewToShow = Smartgraphs.appWindowController.get('viewToShow');
  equals(viewToShow, 'Smartgraphs.activityPage.errorLoadingActivityView', "viewToShow value is for activityPage.errorLoadingActivityView");
  ok( pathIsAView(viewToShow), "viewToShow value should represent a real SC.View");
});


test("showAuthorView sets the viewToShow value for the author view", function () {
  expect(3);
  equals( Smartgraphs.appWindowController.get('viewToShow'), null, "viewToShow value starts as null");
  Smartgraphs.appWindowController.showAuthorView();
  var viewToShow = Smartgraphs.appWindowController.get('viewToShow');
  equals(viewToShow, 'Smartgraphs.authorPage.authorView', "viewToShow value is for the authorView");
  ok( pathIsAView(viewToShow), "viewToShow value should represent a real SC.View");
});

