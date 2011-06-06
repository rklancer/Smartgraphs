// ==========================================================================
// Project:   Smartgraphs.TableView Unit Test
// Copyright: ©2010 Concord Consortium
// Author:    Richard Klancer
// ==========================================================================
/*globals Smartgraphs module test ok equals same stop start setup teardown beginSession endSession setupUserAndSessionFixtures restoreUserAndSessionFixtures addPoint disconnectBindings */

var dataset;
var pane;
var view, tableColumnView, scrollView, innerView;
var rowHeight;

module('Table view', {
  setup: function () {
    setupUserAndSessionFixtures();
    setup.fixtures(Smartgraphs.Dataset, [{url: 'dataset-1'}]);
    setup.fixtures(Smartgraphs.DataPoint, [{url: 'datapoint-1'}]);
    setup.store();
    Smartgraphs.store.find(Smartgraphs.Unit);
    beginSession();
        
    setup.mock(Smartgraphs.firstTableController, 'showTable', YES);
    dataset = Smartgraphs.activityObjectsController.createDataset('test-dataset');
    
    SC.RunLoop.begin();
    Smartgraphs.firstTableController.openDataset('test-dataset');
    SC.RunLoop.end();
    
    SC.RunLoop.begin();
    pane = SC.MainPane.create({
      childViews: 'tableView'.w(),
      tableView: Smartgraphs.TableView.design({
        tableController:  Smartgraphs.firstTableController
      })
    });
    pane.append();
    SC.RunLoop.end();
    
    view = pane.get('tableView');
    tableColumnView = view.get('tableColumnView');
    scrollView = tableColumnView.get('scrollView');
    innerView = scrollView.get('contentView');
    rowHeight = innerView.get('rowHeight');
  },
  
  teardown: function () {
    Smartgraphs.firstTableController.clear();
    Smartgraphs.secondTableController.clear();
    endSession();
    disconnectBindings(view);
    pane.remove();
    rowHeight = innerView = scrollView = tableColumnView = view = pane = null;

    restoreUserAndSessionFixtures();
    teardown.all();
  }
});


test("table labels reflect units set on dataset", function () {
  expect(4);
  
  SC.RunLoop.begin();
  dataset.set('xUnits', null);
  dataset.set('xShortLabel', 'x');
  dataset.set('yUnits', null);
  dataset.set('yShortLabel', 'y');  
  SC.RunLoop.end();
  
  equals(view.get('xLabel'), 'x', "without units, x-column heading should be just 'x'");
  equals(view.get('yLabel'), 'y', "without units, y-column heading should be just 'y'");
  
  var meters = Smartgraphs.store.find(Smartgraphs.Unit, '/builtins/units/meters');
  var seconds = Smartgraphs.store.find(Smartgraphs.Unit, '/builtins/units/seconds');

  SC.RunLoop.begin();
  dataset.set('xUnits', seconds);
  dataset.set('yUnits', meters);  
  SC.RunLoop.end();
  
  equals(view.get('xLabel'), 'x (s)', "with units, x-column heading should be x (s)");
  equals(view.get('yLabel'), 'y (m)', "with units, y-column heading should be y (m)");
});


test("inner view's height adjusts as points are added and removed", function () {
  var p1, p2;
    
  equals(innerView.get('frame').height, 0, "table's height should be 0 before any datapoints are displayed");

  p1 = addPoint(dataset, 1, 2);

  equals(innerView.get('contentLength'), 1, "table's content length should be 1 after one datapoint is added.");
  equals(innerView.get('frame').height, rowHeight+15, "table's height should adjust to `rowHeight * 1 + 15` after one datapoint is added");
  p2 = addPoint(dataset, 3, 4);
    
  equals(innerView.get('frame').height, 2*rowHeight+15, "table's height should adjust to `rowHeight * 2 + 15` after a second datapoint is added");

  SC.RunLoop.begin();
  p1.set('dataset', null);
  p1.destroy();
  SC.RunLoop.end();
  
  equals(innerView.get('frame').height, rowHeight+15, "table's height should adjust to `rowHeight * 1 + 15` after second datapoint is removed");
});


test("numeric view is shown, and table view is hidden, when tableController says not to", function () {
  var numericView = view.get('numericView');
  
  equals(numericView.get('isVisible'), NO, "numeric view's isVisible property should be NO when tableController.showTable is YES");
  equals(tableColumnView.get('isVisible'), YES, "table view's isVisible property should be YES when tableController.showTable is YES");
  
  SC.RunLoop.begin();
  Smartgraphs.firstTableController.set('showTable', NO);
  SC.RunLoop.end();
    
  equals(numericView.get('isVisible'), YES, "numeric view's isVisible property should be YES when tableConroller.showTable is NO");
  equals(tableColumnView.get('isVisible'), NO, "table view's isVisible property should be NO when tableConroller.showTable is NO");
  
  SC.RunLoop.begin();
  Smartgraphs.firstTableController.set('showTable', YES);
  SC.RunLoop.end();
    
  equals(numericView.get('isVisible'), NO, "numeric view's isVisible property should be NO when tableController.showTable is YES");
  equals(tableColumnView.get('isVisible'), YES, "table view's isVisible property should be YES when tableController.showTable is YES");
});


test("table does not update for new data when showTable is false", function () {
  var p1, p2;
    
  equals(innerView.get('frame').height, 0, "table's height should be 0 before any datapoints are displayed");

  p1 = addPoint(dataset, 1, 2);

  equals(innerView.get('contentLength'), 1, "table's content length should be 1 after one datapoint is added.");
  equals(innerView.get('frame').height, rowHeight + 15, "table's height should adjust to `rowHeight * 1 + 15` after one datapoint is added");
  
  // now, turn off 'showTable'
  SC.RunLoop.begin();
  Smartgraphs.firstTableController.set('showTable', NO);
  SC.RunLoop.end();

  // ...and check that adding a datapoint after showTable is set to NO doesn't cause table view to update anything
  p2 = addPoint(dataset, 3, 4);
  
  equals(innerView.get('contentLength'), 1, "table's content length should still be 1 after a second datapoint is added with showTable = NO");
  equals(innerView.get('frame').height, rowHeight + 15, "table's height should still be `rowHeight * 1 + 15` after a second datapoint is added with showTable = NO");

  // now, turn 'showTable' back on
  SC.RunLoop.begin();
  Smartgraphs.firstTableController.set('showTable', YES);
  SC.RunLoop.end();
  
  // ..and confirm that the table length & frame is now updated for the new point that was ignored when showTable = NO
  equals(innerView.get('contentLength'), 2, "table's content length should be 2 after showTable is set to YES");
  equals(innerView.get('frame').height, 2 * rowHeight + 15, "table's height should be `rowHeight * 2 + 15` after showTable is set to YES");
});

