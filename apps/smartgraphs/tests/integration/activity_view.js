// ==========================================================================
// Project:   Smartgraphs - integration test of activityViewController <--> activityView interaction
// Copyright: ©2010 Concord Consortium
// @author:   Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs RaphaelViews module test ok equals same stop start afterPropertyChange */

var pane;
var dupActivityView;

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
    
    // activityPageDef is actually a class; all views within are design()ed; so so the activityView and all its
    // child views should come into life with a completely new set of bindings *not* shared with oldActivityPage
    Smartgraphs.activityPage = Smartgraphs.activityPageDef.design();
    
    Smartgraphs.activityPageController = SC.Object.create({
      introText: "Page Introductory Text"      
    });
    
    Smartgraphs.activityStepController = SC.Object.create({
      beforeText: "Step Before-Text",
      responseTemplate: null,
      afterText: "Step After-Text",
      submitButtonTitle: "sub"
    });
    
    SC.RunLoop.begin();
    pane = SC.MainPane.create({
      childViews: [Smartgraphs.activityPage.activityView]
    });
    pane.append();
    SC.RunLoop.end();
    
    dupActivityView = pane.get('childViews').objectAt(0);    
  },
  
  teardown: function () {
    pane.remove();
  
    Smartgraphs.activityPageController = oldActivityPageController;
    Smartgraphs.activityStepController = oldActivityStepController;
    Smartgraphs.responseTemplateController = oldResponseTemplateController;
    Smartgraphs.activityPage = oldActivityPage;
  }
  
});

test('show the view', function () {
  SC.RunLoop.begin();
  Smartgraphs.activityViewController.showSinglePane();
  SC.RunLoop.end();
  debugger;
});
