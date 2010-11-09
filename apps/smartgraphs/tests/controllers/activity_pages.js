// ==========================================================================
// Project:   Smartgraphs.activityPagesController Unit Test
// Copyright: ©2010 Concord Consortium
// @author:   Richard Klancer <rpk@pobox.com>
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
