// ==========================================================================
// Project:   Smartgraphs - integration test of activityViewController <--> activityView interaction
// Copyright: ©2010 Concord Consortium
// Author:   Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs RaphaelViews module test ok equals same stop start afterPropertyChange disconnectBindings */

var scpane;
var activityView;
var firstGraphPaneView;

// TODO need a better mocking pattern/helper
var oldActivityPage;
var oldActivityPageController;
var oldActivityStepController;
var oldResponseTemplateController;

module('activityViewController <--> activityView interaction', {
  
  setup: function () {
    oldActivityPage = Smartgraphs.activityPage;
    oldActivityPageController = Smartgraphs.activityPageController;
    oldActivityStepController = Smartgraphs.activityStepController;
    oldResponseTemplateController = Smartgraphs.responseTemplateController;
    
    Smartgraphs.activityPageController = SC.Object.create({
      introText: "Page Introductory Text"      
    });
    
    Smartgraphs.activityStepController = SC.Object.create({
      beforeText: "Step Before-Text",
      responseTemplate: null,
      afterText: "Step After-Text",
      submitButtonTitle: "sub"
    });
    
    // activityPageDef is actually a class; all views within are design()ed; so so the activityView and all its
    // child views should come into life with a completely new set of bindings *not* shared with oldActivityPage
    Smartgraphs.activityPage = Smartgraphs.activityPageDef.design();
    
    SC.RunLoop.begin();
    scpane = SC.MainPane.create({
      childViews: [Smartgraphs.activityPage.activityView]
    });
    scpane.append();
    SC.RunLoop.end();
    
    activityView = scpane.get('childViews').objectAt(0);  
  },
  
  teardown: function () {
    SC.RunLoop.begin();
    Smartgraphs.activityViewController.clear();
    SC.RunLoop.end();
    
    // All views initialized by an activityPage become properties of the page object itself. Disconnect their bindings.
    // (views defined in the pag that remain un-initialized after the test remain properties of the activityPageDef 
    // *prototype* only)
    for (var key in Smartgraphs.activityPage) {
      if ( !Smartgraphs.activityPage.hasOwnProperty(key) ) continue;
      var view = Smartgraphs.activityPage.get(key);
      if ( !SC.kindOf(view, SC.View) ) continue;

      disconnectBindings(view);
    }

    // The activityView is instantiated by scpane; the initialized view object does NOT get added to activityPage.
    // Disconnect its bindings.
    disconnectBindings(activityView);
    
    scpane.remove();
    
    // unmock
    Smartgraphs.activityPageController = oldActivityPageController;
    Smartgraphs.activityStepController = oldActivityStepController;
    Smartgraphs.responseTemplateController = oldResponseTemplateController;
    Smartgraphs.activityPage = oldActivityPage;
  }
  
});

function graphPanePath(pane) {
  var which = (pane == 'single' || pane == 'top') ? 'first' : 'second';
  return 'Smartgraphs.activityPage.' + which + 'GraphPane';
}

function showEmptyGraphInPane(pane) {
  SC.RunLoop.begin();
  Smartgraphs.firstGraphController.clear();
  Smartgraphs.secondGraphController.clear();
  
  Smartgraphs.activityViewController.setPaneConfig(pane === 'single' ? 'single' : 'split');
  
  Smartgraphs.activityViewController.set(pane+'PaneNowShowing', graphPanePath(pane));
  SC.RunLoop.end();
}


//
// ..........................................................
// ACTUAL TESTS...
//


function testShowControls(pane) {
  test('showControls(' + pane + ') should cause the graph controls to be shown in the ' + pane + ' pane', function () {
    showEmptyGraphInPane(pane);
  
    var graphPane = SC.objectForPropertyPath(graphPanePath(pane));
    var graphView = graphPane.get('graphView');
    var controlsContainer = graphPane.get('controlsContainer');
    
    // preconditions for test validity
    ok( !!$('#'+graphPane.get('layerId'))[0], 'graphPane layer should be present in the DOM');    
    equals(controlsContainer.$().height(), 0, "controls container should have a height of 0 before showControls is called.");
    equals(graphView.$().height(), graphPane.$().height(), "graph view should fill the graph pane before showControls is called.");

    // show the controls
    SC.RunLoop.begin();
    Smartgraphs.activityViewController.showControls(pane);
    Smartgraphs.activityViewController.revealAllControls();
    SC.RunLoop.end();
    
    ok(controlsContainer.$().height() > 0, "controls container height should have increased after showControls is called");
        
    // find the button tops relative to the document
    var $buttons = controlsContainer.$('.sc-button-view');
    
    ok($buttons.length > 0, "buttons should be found within controls container");
    
    var offsetTops = $buttons.map( function (idx, el) { return $(el).offset().top; } );
    var heights    = $buttons.map( function (idx, el) { return $(el).height(); } );
  
    var containerTop = controlsContainer.$().offset().top;
    var containerHeight = controlsContainer.$().height();
  
    for (var i = 0; i < $buttons.length; i++) {
      ok(offsetTops[i] > containerTop, "offset top of button " + (i+1) + " should be below offset top of button container");
      ok(offsetTops[i] + heights[i] < containerTop + containerHeight, "bottom of button " + (i+1) + " should be above bottom of button container");
    }

    // also make sure the buttons aren't overlapped by the graph view
    ok(containerTop >= graphView.$().offset().top + graphView.$().height(), "graphView should not overlap button container");
  });
}


function testHideControls(pane) {
  test('hideControls('+pane+') should cause the graph controls to be hidden', function () {
    showEmptyGraphInPane(pane);
    
    var graphPane = SC.objectForPropertyPath(graphPanePath(pane));
    var graphView = graphPane.get('graphView');
    var controlsContainer = graphPane.get('controlsContainer');
    
    // show the controls
    SC.RunLoop.begin();
    Smartgraphs.activityViewController.showControls(pane);
    Smartgraphs.activityViewController.revealAllControls();
    SC.RunLoop.end();

    // preconditions
    var $container = $('#'+controlsContainer.get('layerId'));
    ok( !!$container[0], 'controlsContainer layer should be present in the DOM');
    ok( $container.height() > 0, "controls container height should be > 0 after controls were shown");
    
    // hide the controls...
    SC.RunLoop.begin();
    Smartgraphs.activityViewController.hideControls();
    SC.RunLoop.end();

    // and test
    $container = $('#'+controlsContainer.get('layerId'));
    ok( !!$container[0], 'controlsContainer layer should still be present in the DOM');
    ok( $container.height() === 0, "controls container height should be 0 after controls are hidden");
  });
}


// Tests. As long as we're at it, make sure every combination of pane config A followed by pane config B is tested

testShowControls('single');
testShowControls('single');
testShowControls('top');
testShowControls('top');
testShowControls('bottom');
testShowControls('bottom');
testShowControls('single');
testShowControls('bottom');
testShowControls('top');
testShowControls('single');

testHideControls('single');
testHideControls('top');
testHideControls('bottom');
