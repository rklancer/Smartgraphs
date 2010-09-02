// ==========================================================================
// Project:   Smartgraphs.GraphView Unit Test
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Smartgraphs RaphaelViews module test ok equals same stop start afterPropertyChange */

var pane;
var view;
var canvasView;
var oldStore;

function setupFixtures() {
  Smartgraphs.Graph.oldFixtures = Smartgraphs.Graph.FIXTURES;
  
  Smartgraphs.Graph.FIXTURES = [
    { url: 'test',
      axes: 'test-axes',
      initialSeries: []
    }
  ];
  
  Smartgraphs.Axes.oldFixtures = Smartgraphs.Axes.FIXTURES;
  Smartgraphs.Axes.FIXTURES = [
    { url: 'test-axes',

      xMin: 0,
      xMax: 10,
      xSteps: 15,
      xLabel: 'xLabel (long)',
      xLabelAbbreviated: 'xLabel (abbrev)',

      yMin: 0,
      yMax: 10,
      ySteps: 25,
      yLabel: 'yLabel (long)',
      yLabelAbbreviated: 'yLabel (abbrev)'
    }
  ];
  
  oldStore = Smartgraphs.store;
  Smartgraphs.set('store', SC.Store.create().from(SC.Record.fixtures));
}

function restoreFixtures() {
  Smartgraphs.Graph.FIXTURES = Smartgraphs.Graph.oldFixtures;
  Smartgraphs.Axes.FIXTURES = Smartgraphs.Axes.oldFixtures;
  Smartgraphs.set('store', oldStore);
}

 
module("Smartgraphs.GraphView", {
  setup: function() {
    setupFixtures();
    
    Smartgraphs.firstGraphController.openGraph('test');
    
    SC.RunLoop.begin();
    pane = SC.MainPane.create({
      childViews: [
        Smartgraphs.GraphView.design({
          graphBinding: 'Smartgraphs.firstGraphController',
          viewName: 'testGraphView'
        })]
    });
    pane.append();
    SC.RunLoop.end();
    
    view = pane.get('childViews').objectAt(0);
    canvasView = view.get('graphCanvasView');
  }, 
  
  teardown: function () {
    pane.remove();
    pane = view = null;
    restoreFixtures();
  }
});


// test('show the view', function () {
//   setTimeout(function () {
//     view.set('readyToTest', YES);
//   }, 5000);
//   
//   afterPropertyChange(view, 'readyToTest', YES, function () {
//     ok(true, 'you saw the graph, right?');
//   });
// });


test('GraphView should contain a child view that is RaphaelCanvasView', function () {
  ok(SC.kindOf(canvasView, RaphaelViews.RaphaelCanvasView), 'GraphView.graphCanvasView is a RaphaelCanvasView');
});


test('adding and removing DataSeries from the graph controller should result in a calls to appendChild and removeChild', function () {
  var seriesList = Smartgraphs.firstGraphController.get('seriesList');
  var series1 = Smartgraphs.store.createRecord(Smartgraphs.DataSeries, { url: 'series1' });
  var series1View = null;
  var series2 = Smartgraphs.store.createRecord(Smartgraphs.DataSeries, { url: 'series2' });
  var series2View = null;
  var viewAppended = null;
  var viewRemoved = null;
  
  canvasView.oldAppendChild = canvasView.appendChild;
  canvasView.appendChild = function (v) {
    viewAppended = v;
    this.oldAppendChild(v);
  };

  canvasView.oldRemoveChild = canvasView.removeChild;
  canvasView.removeChild = function (v) {
    viewRemoved = v;
    this.oldRemoveChild(v);
  };
  
  seriesList.pushObject(series1);
  ok(SC.kindOf(viewAppended, RaphaelViews.RaphaelCollectionView), 'a RaphaelCollectionView was appended after series1 was pushed onto seriesList');

  series1View = viewAppended;

  seriesList.pushObject(series2);
  ok(SC.kindOf(viewAppended, RaphaelViews.RaphaelCollectionView), 'a RaphaelCollectionView was appended after series2 was pushed onto seriesList');
  
  series2View = viewAppended;

  ok(viewRemoved === null, 'No views were removed when series were added');
  
  seriesList.removeObject(series1);
  ok(viewRemoved === series1View, 'The view for series1 was removed when series1 was removed from the seriesList');
  
  seriesList.removeObject(series2);
  ok(viewRemoved === series2View, 'The view for series2 was removed when series2 was removed from the seriesList');  
});


// test that coordinatesForPoint and pointForCoordinates are inverse
// test that above 2 are linear, check that they return sane values for extreme end of ranges

// what about changing axes?

// test that axes get rendered
// add a point to a series and test it gets rendered (various permutations here)
// test that labels get rendered only when visible

// test that adding a series that already has data renders it correctly.





