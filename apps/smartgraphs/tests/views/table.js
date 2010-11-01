// ==========================================================================
// Project:   Smartgraphs.TableView Unit Test
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer
// ==========================================================================
/*globals Smartgraphs module test ok equals same stop start newSession setupUserAndSessionFixtures restoreUserAndSessionFixtures addPoint disconnectBindings setupDatapointFixtures restoreDatapointFixtures */

var oldStore;
var session;
var dataset;
var oldShowTable;
var pane;
var view;
var tableColumnView;


function setupFixtures() {
  setupUserAndSessionFixtures();
  setupDatapointFixtures();
  
  Smartgraphs.Axes.oldFixtures = Smartgraphs.Axes.FIXTURES;
  Smartgraphs.Axes.FIXTURES = [
    { url: 'test-axes',

      xMin: -5,
      xMax: 10,
      xSteps: 5,
      xLabel: 'xLabel (long)',
      xLabelAbbreviated: 'xLabel',

      yMin: 2,
      yMax: 8,
      ySteps: 6,
      yLabel: 'yLabel (long)',
      yLabelAbbreviated: 'yLabel'
    }
  ];
  
  Smartgraphs.Graph.oldFixtures = Smartgraphs.Graph.FIXTURES;  
  Smartgraphs.Graph.FIXTURES = [
    { url: 'test-graph',
      name: 'test-graph',
      axes: 'test-axes',
      title: 'Test Graph',
      initialDatasets: []
    }
  ];
  
  oldStore = Smartgraphs.store;
  Smartgraphs.set('store', SC.Store.create().from(SC.FixturesDataSource.create()));
}

function restoreFixtures() {
  restoreUserAndSessionFixtures();
  restoreDatapointFixtures();
  
  Smartgraphs.Graph.FIXTURES = Smartgraphs.Graph.oldFixtures;
  Smartgraphs.Axes.FIXTURES = Smartgraphs.Axes.oldFixtures;
  Smartgraphs.set('store', oldStore);
}

module('Table view', {
  setup: function () {
    // mock showTable
    oldShowTable = Smartgraphs.firstTableController.showTable;
    Smartgraphs.firstTableController.showTable = YES;
    
    setupFixtures();
    newSession();
    
    dataset = Smartgraphs.sessionController.createDataset('test-dataset');
    
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
    
    Smartgraphs.firstGraphController.openGraph('test-graph');
    Smartgraphs.firstGraphController.addDataset(dataset); 
    Smartgraphs.firstTableController.openDataset('test-graph', 'test-dataset');
  },
  
  teardown: function () {
    pane.remove();
    disconnectBindings(view);
    view = pane = null;
    
    Smartgraphs.firstTableController.showTable = oldShowTable;
    
    Smartgraphs.firstGraphController.clear();
    Smartgraphs.secondGraphController.clear();
    Smartgraphs.firstTableController.clear();
    Smartgraphs.secondTableController.clear();
    restoreFixtures();
  }
});


test("inner view's height adjusts as points are added and removed", function () {
  var tableColumnView = view.get('tableColumnView');
  var scrollView = tableColumnView.get('scrollView');
  var innerView = scrollView.get('contentView');
  var rowHeight = innerView.get('rowHeight');
  var p1, p2;
    
  equals(innerView.get('frame').height, 0, "table's height should be 0 before any datapoints are displayed");

  p1 = addPoint(dataset, 1, 2);

  equals(innerView.get('contentLength'), 1, "table's content length should be 1 after one datapoint is added.");
  equals(innerView.get('frame').height, rowHeight, "table's height should adjust to `rowHeight * 1` after one datapoint is added");
  p2 = addPoint(dataset, 3, 4);
    
  equals(innerView.get('frame').height, 2*rowHeight, "table's height should adjust to `rowHeight * 2` after a second datapoint is added");

  SC.RunLoop.begin();
  p1.set('dataset', null);
  p1.destroy();
  SC.RunLoop.end();
  
  equals(innerView.get('frame').height, rowHeight, "table's height should adjust to `rowHeight * 1` after second datapoint is removed");
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
  var scrollView = tableColumnView.get('scrollView');
  var innerView = scrollView.get('contentView');
  var rowHeight = innerView.get('rowHeight');
  var p1, p2;
    
  equals(innerView.get('frame').height, 0, "table's height should be 0 before any datapoints are displayed");

  p1 = addPoint(dataset, 1, 2);

  equals(innerView.get('contentLength'), 1, "table's content length should be 1 after one datapoint is added.");
  equals(innerView.get('frame').height, rowHeight, "table's height should adjust to `rowHeight * 1` after one datapoint is added");
  
  // now, turn off 'showTable'
  SC.RunLoop.begin();
  Smartgraphs.firstTableController.set('showTable', NO);
  SC.RunLoop.end();
  
  // check that adding a datapoint after showTable is set to YES doesn't cause table view to update anything
  p2 = addPoint(dataset, 3, 4);

  equals(innerView.get('contentLength'), 1, "table's content length should still be 1 after a second datapoint is added with showTable = NO");
  equals(innerView.get('frame').height, rowHeight, "table's height should still be `rowHeight * 1` after a second datapoint is added with showTable = NO");
  
  // now, turn off 'showTable'
  SC.RunLoop.begin();
  Smartgraphs.firstTableController.set('showTable', YES);
  SC.RunLoop.end();
  
  equals(innerView.get('contentLength'), 2, "table's content length should be 2 after showTable is set to YES");
  equals(innerView.get('frame').height, 2 * rowHeight, "table's height should be `rowHeight * 2` after showTable is set to YES");
});

