// ==========================================================================
// Project:   Smartgraphs.activityPagesController Unit Test
// Copyright: ©2010 Concord Consortium
// Author:   Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs module test ok equals same stop start */

var oldStore;
var p1, p2, p1s1, p1s2, p2s1;

module("Smartgraphs.activityPagesController", {
  setup: function () {
    oldStore = Smartgraphs.store;
    Smartgraphs.store = SC.Store.create().from(SC.FixturesDataSource.create());
    
    p1s1 = Smartgraphs.store.createRecord(Smartgraphs.ActivityStep, {
      url: 'p1s1'
    });
    p1s2 = Smartgraphs.store.createRecord(Smartgraphs.ActivityStep, {
      url: 'p1s2'
    });
    p2s1 = Smartgraphs.store.createRecord(Smartgraphs.ActivityStep, {
      url: 'p2s1'
    });

    p1 = Smartgraphs.store.createRecord(Smartgraphs.ActivityPage, {
      url: 'p1',
      name: ''
    });
    p2 = Smartgraphs.store.createRecord(Smartgraphs.ActivityPage, {
      url: 'p2',
      name: 'Second Page'
    });

    [p1s1, p1s2].setEach('activityPage', p1);
    p2s1.set('activityPage', p2);
  },
  
  teardown: function () {
    Smartgraphs.store = oldStore;
  }
});


test("activityPagesController's 'outline' property should be in a format consumable by a TreeController", function () {
  expect(8);
  Smartgraphs.activityPagesController.set('content', Smartgraphs.store.find(Smartgraphs.ActivityPage));

  var outline = Smartgraphs.activityPagesController.get('outline');
  var tic = outline.get('treeItemChildren');
  equals(tic.get('length'), 2, "outline's treeItemChildren should contain two items");

  var child = tic.objectAt(0);
  equals(child.get('title'), "Page 1", "Title of first child (first page) should be the default 'Page 1'");
  
  var childTic = child.get('treeItemChildren');
  equals(childTic.get('length'), 2, "First child should have two children (= 2 steps)");
  equals(childTic.objectAt(0).get('title'), 'Step 1', "first child of first child should have title 'Step 1'");
  equals(childTic.objectAt(1).get('title'), 'Step 2', "second child of first child should have title 'Step 2'");
  
  child = tic.objectAt(1);
  equals(child.get('title'), "Second Page", "Title of second child (second page) should be the explicit name, 'Second Page'");
  
  childTic = child.get('treeItemChildren');
  equals(childTic.get('length'), 1, "Second child should have 1 child (= 1 step)");
  equals(childTic.objectAt(0).get('title'), 'Step 1', "first child of second child should have title 'Step 1'");
});


test("activityOutlineController sets its selection correctly when the current step changes", function () {
  expect(6);
  
  Smartgraphs.activityPagesController.set('content', Smartgraphs.store.find(Smartgraphs.ActivityPage));
  
  var sel;
  
  [p1s1, p1s2, p2s1].forEach( function (step) {
    SC.RunLoop.begin();
    Smartgraphs.activityStepController.set('content', step);
    Smartgraphs.activityPageController.set('content', step.get('activityPage'));
    SC.RunLoop.end();  
 
    sel = Smartgraphs.activityOutlineController.get('selection');

    equals(sel.get('length'), 1, "A single item should be selected in the activityOutlineController");
    equals(sel.firstObject().getPath('step.url'), step.get('url'), "activityOutlineController's selection should reflect the activityStepController's content (" + step.get('url') + ")");
  });
});


test("activityPagesController should update its 'selection' property immediately when activityPageController content changes", function () {
  expect(4);
  
  Smartgraphs.activityPagesController.set('content', [p1, p2]);
  Smartgraphs.activityPageController.set('content', p1);
  
  var selection = Smartgraphs.activityPagesController.get('selection');
  equals( selection.get('length'), 1, "activityPagesController's selection should have 1 page after activityPageController content is set to p1");
  equals( selection.firstObject(), p1, "activityPagesController's selection should be p1 after activityPageController's content is set to p1");
  
  Smartgraphs.activityPageController.set('content', p2);
  selection = Smartgraphs.activityPagesController.get('selection');
  equals( selection.get('length'), 1, "activityPagesController's selection should have 1 page after activityPageController content is set to p2");
  equals( selection.firstObject(), p2, "activityPagesController's selection should be p2 after activityPageController's content is set to p2");
});


test("activityPagesController shouldn't complain if activityPageController's content is not a page in activityPagesController", function () {  
  expect(3);
  
  Smartgraphs.activityPagesController.set('content', [p1]);
  Smartgraphs.activityPageController.set('content', p1);
  equals( Smartgraphs.activityPagesController.getPath('selection.length'), 1, "activityPagesController's selection should have 1 page after activityPageController content is set to p1");
  
  Smartgraphs.activityPagesController.set('selection', SC.SelectionSet.create());
  Smartgraphs.activityPageController.set('content', p2);
  equals( Smartgraphs.activityPagesController.getPath('selection.length'), 0, "activityPagesController's selection should have no pages after activityPageController content is set to p2");
  
  Smartgraphs.activityPageController.set('content', p1);
  Smartgraphs.activityPagesController.set('selection', SC.SelectionSet.create());  
  Smartgraphs.activityPageController.set('content', null);
  equals( Smartgraphs.activityPagesController.getPath('selection.length'), 0, "activityPagesController's selection should have no pages after activityPageController content is set to null");
});
