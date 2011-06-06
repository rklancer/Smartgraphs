// ==========================================================================
// Project:   Smartgraphs.activityViewController Unit Test
// Copyright: ©2010 Concord Consortium
// Author:   Parker Morse <pmorse@cantinaconsulting.com>
// ==========================================================================
/*globals Smartgraphs module test ok equals same stop start */

// TODO: These tests pass when the module runs in isolation, but fail when part of a complete application run

module("Smartgraphs.activityViewController", {
  setup: function () {
    // Default settings for controller
    Smartgraphs.activityViewController.set('dataViewNowShowing', null);
    Smartgraphs.activityViewController.set('topPaneNowShowing', null);
    Smartgraphs.activityViewController.set('bottomPaneNowShowing', null);
    Smartgraphs.activityViewController.set('singlePaneNowShowing', null);

    Smartgraphs.activityViewController.set('firstImageValue', null);
    Smartgraphs.activityViewController.set('secondImageValue', null);

    Smartgraphs.activityViewController.set('firstGraphPaneControls', null);
    Smartgraphs.activityViewController.set('secondGraphPaneControls', null);

    Smartgraphs.activityViewController.set('startControlIsVisible', NO);
    Smartgraphs.activityViewController.set('startControlIsEnabled', NO);
    Smartgraphs.activityViewController.set('startControlIsDefault', NO);

    Smartgraphs.activityViewController.set('stopControlIsVisible', NO);
    Smartgraphs.activityViewController.set('stopControlIsEnabled', NO);
    Smartgraphs.activityViewController.set('stopControlIsDefault', NO);

    Smartgraphs.activityViewController.set('clearControlIsVisible', NO);
    Smartgraphs.activityViewController.set('clearControlIsEnabled', NO);
    Smartgraphs.activityViewController.set('clearControlIsDefault', NO);

    Smartgraphs.activityViewController.set('paneIsSplit', null);
  },
  
  teardown: function () {
    
  }
});

/* These are pretty low-level. Later tests use more involved methods which build on them which might make these redundant. */

test("firstOrSecondFor returns which pane", function() {
  expect(3);
  // Valid inputs are exercised by graphControllerForPane, so here we just verify that it fails for invalid input
  
  Smartgraphs.activityViewController.set('paneIsSplit', NO);
  ok( !Smartgraphs.activityViewController.firstOrSecondFor('bottom'), "Unsplit pane returns NO to 'bottom'");
  ok( !Smartgraphs.activityViewController.firstOrSecondFor('top'), "Unsplit pane returns NO to 'top'");
  
  Smartgraphs.activityViewController.set('paneIsSplit', YES);
  ok( !Smartgraphs.activityViewController.firstOrSecondFor('single'), "Split pane returns NO to 'single'");
});

test("validPaneFor returns false if pane is invalid", function() {
  expect(3);
  // Valid inputs are exercised by graphControllerForPane, here we verify that it fails for invalid input
  
  Smartgraphs.activityViewController.set('paneIsSplit', NO);
  ok( !Smartgraphs.activityViewController.validPaneFor('top'), "Top panes are not valid if PaneIsSplit is false");
  ok( !Smartgraphs.activityViewController.validPaneFor('bottom'), "Bottom panes are not valid if PaneIsSplit is false");
  
  Smartgraphs.activityViewController.set('paneIsSplit', YES);
  ok( !Smartgraphs.activityViewController.validPaneFor('single'), "Single panes are not valid if PaneIsSplit is true");
});

test("otherPaneFor returns the 'other' pane for a split view", function () {
  expect(3);
  
  Smartgraphs.activityViewController.set('paneIsSplit', NO); // Failure state
  ok( !Smartgraphs.activityViewController.otherPaneFor('top'), "If pane is not split, returns NO");
  
  Smartgraphs.activityViewController.set('paneIsSplit', YES); // Otherwise
  equals( Smartgraphs.activityViewController.otherPaneFor('top'), 'bottom', "Returns 'bottom' when given 'top'");
  equals( Smartgraphs.activityViewController.otherPaneFor('bottom'), 'top', "Returns 'top' when given 'bottom'");
});

test("graphControllerForPane returns the graph controller for a given pane", function() {
  expect(3);
  
  Smartgraphs.activityViewController.set('paneIsSplit', NO);
  
  ok( Smartgraphs.activityViewController.graphControllerForPane('single') === Smartgraphs.firstGraphController, "A single pane uses the firstGraphController");
  
  Smartgraphs.activityViewController.set('paneIsSplit', YES);
  ok( Smartgraphs.activityViewController.graphControllerForPane('top') === Smartgraphs.firstGraphController, "The top pane uses the firstGraphController");
  ok( Smartgraphs.activityViewController.graphControllerForPane('bottom') === Smartgraphs.secondGraphController, "The bottom pane uses the secondGraphController");
});

test("setPaneConfig changes attributes", function() {
  expect(6);
  same( Smartgraphs.activityViewController.get('paneIsSplit'), null, "Initial setting of paneIsSplit should be null");
  same( Smartgraphs.activityViewController.get('dataViewNowShowing'), null, "Initial setting of dataViewNowShowing should be null");
  
  Smartgraphs.activityViewController.setPaneConfig('single');
  equals( Smartgraphs.activityViewController.get('paneIsSplit'), NO, "paneIsSplit should be false");
  equals( Smartgraphs.activityViewController.get('dataViewNowShowing'), "Smartgraphs.activityPage.singlePaneDataView", "dataViewNowShowing should be Smartgraphs.activityPage.singlePaneDataView");
  
  Smartgraphs.activityViewController.setPaneConfig('split');
  equals( Smartgraphs.activityViewController.get('paneIsSplit'), YES, "paneIsSplit should be true");
  equals( Smartgraphs.activityViewController.get('dataViewNowShowing'), "Smartgraphs.activityPage.splitPaneDataView", "dataViewNowShowing should be Smartgraphs.activityPage.splitPaneDataView");
});

test("showImage sets up panes with images", function() {
  expect(11);
  // TODO: Seems like this could be done more elegantly.
  same( Smartgraphs.activityViewController.get('firstImageValue'), null, 'firstImageValue is initially null');
  same( Smartgraphs.activityViewController.get('secondImageValue'), null, 'secondImageValue is initially null');
  same( Smartgraphs.activityViewController.get('topPaneNowShowing'), null, 'topPaneNowShowing is initially null');
  same( Smartgraphs.activityViewController.get('bottomPaneNowShowing'), null, 'bottomPaneNowShowing is initially null');
  same( Smartgraphs.activityViewController.get('singlePaneNowShowing'), null, 'singlePaneNowShowing is initially null');
  
  Smartgraphs.activityViewController.set('paneIsSplit', NO);
  Smartgraphs.activityViewController.showImage('single', sc_static('resources/images/pane_loading.gif'));
  equals( Smartgraphs.activityViewController.get('firstImageValue'), sc_static('resources/images/pane_loading.gif'), 'firstImageValue is set to the image path');
  equals( Smartgraphs.activityViewController.get('singlePaneNowShowing'), 'Smartgraphs.activityPage.firstImageView');

  Smartgraphs.activityViewController.set('paneIsSplit', YES);
  Smartgraphs.activityViewController.showImage('top', sc_static('resources/images/pane_loading.gif'));
  equals( Smartgraphs.activityViewController.get('firstImageValue'), sc_static('resources/images/pane_loading.gif'), 'firstImageValue is set to the image path');
  equals( Smartgraphs.activityViewController.get('topPaneNowShowing'), 'Smartgraphs.activityPage.firstImageView');
  
  Smartgraphs.activityViewController.showImage('bottom', sc_static('resources/images/pane_loading.gif'));
  equals( Smartgraphs.activityViewController.get('secondImageValue'), sc_static('resources/images/pane_loading.gif'), 'secondImageValue is set to the image path');
  equals( Smartgraphs.activityViewController.get('bottomPaneNowShowing'), 'Smartgraphs.activityPage.secondImageView');
});
