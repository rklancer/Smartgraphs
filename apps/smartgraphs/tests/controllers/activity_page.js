// ==========================================================================
// Project:   Smartgraphs.activityPageController Unit Test
// Copyright: ©2010 Concord Consortium
// Author:   Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs module test ok equals same stop start setup teardown */

var oldStore;
var p1, p2, p1s1, p1s2, p2s1;

module("Smartgraphs.activityPageController", {
  setup: function () {
    setup.store();

    p1 = Smartgraphs.store.createRecord(Smartgraphs.ActivityPage, {
      url: 'p1',
      name: 'First Page'
    });
    p2 = Smartgraphs.store.createRecord(Smartgraphs.ActivityPage, {
      url: 'p2',
      name: 'Second Page'
    });
  },
  
  teardown: function () {
    teardown.all();
  }
});


test("activityPageController should set its content to be the activityPagesController's selection", function () {
  expect(2);
  
  Smartgraphs.activityPageController.set('content', null);
  Smartgraphs.activityPagesController.set('content', [p1, p2]);

  Smartgraphs.activityPagesController.selectObject(p2);
  equals(Smartgraphs.activityPageController.get('content'), p2, "Immediately after activityPagesController selects p2, activityPageController's content should be p2");

  Smartgraphs.activityPagesController.selectObject(null);
  equals(Smartgraphs.activityPageController.get('content'), null, "Immediately after activityPagesController selects 'null', activityPageController's content should be null");
});


test("activityPageController should not set its content if the activityPagesController's selection property isn't different", function () {
  expect(3);
  
  Smartgraphs.activityPageController.set('content', null);

  var contentChanged = NO;
  Smartgraphs.activityPageController.addObserver('content', function () {
    contentChanged = YES;
  });

  Smartgraphs.activityPagesController.set('content', [p1, p2]);
  Smartgraphs.activityPagesController.selectObject(p2);
  ok( contentChanged, "content observer should have fired after p2 was selected the first time");
  
  contentChanged = NO;
  Smartgraphs.activityPagesController.selectObject(p2);
  ok( !contentChanged, "content observer should not have fired after p2 was selected the second time");
  
  contentChanged = NO;
  Smartgraphs.activityPagesController.notifyPropertyChange('selection');
  ok( !contentChanged, "content observer should not have fired after activityPagesController notified the 'selection' property");
});
  
  
  