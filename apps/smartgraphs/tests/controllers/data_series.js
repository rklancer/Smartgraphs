// ==========================================================================
// Project:   Smartgraphs.dataSeriesController Unit Test
// Copyright: ©2010 Concord Consortium
// ==========================================================================
/*globals Smartgraphs module test ok equals same stop start */

var displayDidChangeWasCalled = false;

module("Smartgraphs.dataSeriesController", {
  setup: function () {
    
    this.mockSeriesView = SC.Object.create({
      // mimic the contentBinding and displayProperty settings on series1View
      contentBinding: 'Smartgraphs.dataSeriesController.arrangedObjects',
      displayDidChange: function () {
        displayDidChangeWasCalled = true;
      }.observes('.content.[]')
    });
    
    var series = Smartgraphs.store.find(Smartgraphs.DataSeries, 'series-sensor');
    Smartgraphs.dataSeriesController.set('series', series);

    // let the contentBinding in mockSeriesView sync up...
    SC.RunLoop.begin();
    SC.RunLoop.end();
  },
  
  teardown: function () {
    this.mockSeriesView.destroy();
  }
});

test("test whether addDataPoint() adds a data point in an observable way", function () {
  displayDidChangeWasCalled = false;
  var oldLength = Smartgraphs.dataSeriesController.get('length');

  SC.RunLoop.begin();
  var newPoint = Smartgraphs.dataSeriesController.addDataPoint(1,1);

  ok(!displayDidChangeWasCalled, 
    'calling addDataPoint should not result in a call to mockSeriesView.displayDidChange until end of runloop');
  displayDidChangeWasCalled = false;

  SC.RunLoop.end();

  ok(displayDidChangeWasCalled, 'calling addDataPoint should result in mockSeriesView.displayDidChange being called at end of runloop.');
  var newLength = Smartgraphs.dataSeriesController.get('length');
  equals(newLength, oldLength+1, 
    'calling addDataPoint should have increased length of series from '+ oldLength + ' to ' + (oldLength+1));
});
