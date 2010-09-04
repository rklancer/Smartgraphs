// ==========================================================================
// Project:   Smartgraphs.GraphView Unit Test
// Copyright: ©2010 Concord Consortium
// @author:   Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs RaphaelViews module test ok equals same stop start afterPropertyChange */

var pane;
var view;
var canvasView;
var oldStore;


// round to the nearest 0.001
function rnd(x) {
  return (Math.round(x*1000)/1000);
}


function addPoint(series, x, y) {    
  SC.RunLoop.begin();
  var point = Smartgraphs.store.createRecord(Smartgraphs.DataPoint, { x: x, y: y, guid: Smartgraphs.getNextGuid() });
  point.set('series', series);
  Smartgraphs.store.commitRecords();
  SC.RunLoop.end();
  
  return point;
}


function numVisibleChildren($el) {
  var count = 0;
  var $children = $el.children();

  for (var i = 0, ii = $children.length; i < ii; i++) {
    if ($children[i].style.display !== 'none') {
      count++;
    }
  }
  return count;
}


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

      xMin: -5,
      xMax: 10,
      xSteps: 5,
      xLabel: 'xLabel (long)',
      xLabelAbbreviated: 'xLabel (abbrev)',

      yMin: 2,
      yMax: 8,
      ySteps: 6,
      yLabel: 'yLabel (long)',
      yLabelAbbreviated: 'yLabel (abbrev)'
    }
  ];
  
  // without some data in a RecordType's FIXTURES, the FixturesDataSource won't allow any records to be committed.
  Smartgraphs.DataSeries.FIXTURES = Smartgraphs.DataSeries.oldFixtures;
  Smartgraphs.DataSeries.FIXTURES = [{url: 'dummy'}];
  
  Smartgraphs.DataPoint.oldFixtures = Smartgraphs.DataPoint.FIXTURES;
  Smartgraphs.DataPoint.FIXTURES = [{url: 'dummy'}];
  
  oldStore = Smartgraphs.store;
  
  // REMINDER: 'SC.Record.fixtures' is a singleton object; using it below would result in pollution of the data store
  // with data from prior tests.
  Smartgraphs.set('store', SC.Store.create().from(SC.FixturesDataSource.create()));
}

function restoreFixtures() {
  Smartgraphs.Graph.FIXTURES = Smartgraphs.Graph.oldFixtures;
  Smartgraphs.Axes.FIXTURES = Smartgraphs.Axes.oldFixtures;
  Smartgraphs.DataPoint.oldFixtures = Smartgraphs.DataPoint.FIXTURES;
  Smartgraphs.DataSeries.oldFixtures = Smartgraphs.DataSeries.FIXTURES;
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
          graphControllerBinding: 'Smartgraphs.firstGraphController',
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


test('adding and removing DataSeries from the graph controller should result in calls to appendChild and removeChild', function () {
  var seriesList = Smartgraphs.firstGraphController.get('seriesList');
  var series1 = Smartgraphs.store.createRecord(Smartgraphs.DataSeries, { url: 'series1' });
  var series1View = null;
  var series2 = Smartgraphs.store.createRecord(Smartgraphs.DataSeries, { url: 'series2' });
  var series2View = null;
  var viewAppended = null;
  var viewRemoved = null;
  var appendCallCount = 0;
  var removeCallCount = 0;
  
  canvasView.oldAppendChild = canvasView.appendChild;
  canvasView.appendChild = function (v) {
    viewAppended = v;
    appendCallCount++;
    this.oldAppendChild(v);
  };

  canvasView.oldRemoveChild = canvasView.removeChild;
  canvasView.removeChild = function (v) {
    viewRemoved = v;
    removeCallCount++;
    this.oldRemoveChild(v);
  };
  
  var childViews = canvasView.get('childViews');
  var startLength = childViews.get('length');
  
  seriesList.pushObject(series1);
  ok(SC.kindOf(viewAppended, RaphaelViews.RaphaelCollectionView), 'a RaphaelCollectionView was appended after series1 was pushed onto seriesList');
  equals(childViews.get('length'), startLength+1, 'canvasView has one more childView than it did before series1 was pushed onto seriesList');
  
  series1View = viewAppended;

  seriesList.pushObject(series2);
  ok(SC.kindOf(viewAppended, RaphaelViews.RaphaelCollectionView), 'a RaphaelCollectionView was appended after series2 was pushed onto seriesList');
  equals(childViews.get('length'), startLength+2, 'canvasView has two more childViews than it did before series1 and series2 were pushed onto seriesList');
  
  series2View = viewAppended;
  
  equals(appendCallCount, 2, 'there were two calls to appendChild() for two push()es to seriesList');
  equals(removeCallCount, 0, 'no views were removed when series were added');
  
  seriesList.removeObject(series1);
  equals(viewRemoved, series1View, 'The view for series1 was removed when series1 was removed from the seriesList');
  equals(childViews.get('length'), startLength+1, 'canvasView has one fewer childView than it did before series1 was removed from the seriesList');
  
  seriesList.removeObject(series2);
  equals(viewRemoved, series2View, 'The view for series2 was removed when series2 was removed from the seriesList');
  equals(childViews.get('length'), startLength, 'canvasView has the same number of childViews that it did before series1 and series2 were added and then removed from seriesList');
  
  equals(appendCallCount, 2, 'no views were added when series were removed');
  equals(removeCallCount, 2, 'there were two calls to removeChild() for two removeObject()s from seriesList');
  
  canvasView.appendChild = canvasView.oldAppendChild;
  delete canvasView.oldAppendChild;
  canvasView.removeChild = canvasView.oldRemoveChild;
  delete canvasView.oldRemoveChild;
});


test("adding or removing DataPoints to/from a DataSeries should add or remove elements to/from the DataSeries' layer", function () {
  var seriesList = Smartgraphs.firstGraphController.get('seriesList');
  var series = Smartgraphs.store.createRecord(Smartgraphs.DataSeries, { url: 'series1' });

  equals(canvasView.getPath('childViews.length'), 1, 'canvasView has only one child view (the axes view) before series is pushed to seriesList');
  
  seriesList.pushObject(series);
  var seriesView = canvasView.get('childViews').objectAt(1);
  
  ok(SC.kindOf(seriesView, RaphaelViews.RaphaelCollectionView), 'after pushing the series to seriesList, seriesView exists and is a RaphaelCollectionView');
    
  var point1 = addPoint(series, 0, 0);
  
  var layerId = seriesView.get('layerId');
  var $seriesLayer = $('#'+layerId);
  var seriesLayer = $seriesLayer[0];

  ok(!SC.none(seriesLayer), "after adding a data point, seriesView's layer exists and is findable in the document body");
  equals(numVisibleChildren($seriesLayer), 1, "after adding one data point, seriesView's layer contains one visible child");
  
  var point2 = addPoint(series, 5, 5);
  equals(numVisibleChildren($seriesLayer), 2, "after adding a second data point, seriesView's layer contains two visible children");

  SC.RunLoop.begin();
  point1.destroy();
  SC.RunLoop.end();
  
  equals(numVisibleChildren($seriesLayer), 1, "after removing first point, seriesView's layer contains one visible child");
  
  SC.RunLoop.begin();
  point2.destroy();
  SC.RunLoop.end();
  
  equals(numVisibleChildren($seriesLayer), 0, "after removing second point, seriesView's layer contains no visible children");
});


test("adding DataPoints to a DataSeries and then adding the DataSeries to the graph should add 1 element per DataPoint to the DataSeries' layer", function () {
  var seriesList = Smartgraphs.firstGraphController.get('seriesList');
  var series = Smartgraphs.store.createRecord(Smartgraphs.DataSeries, { url: 'series1' });
  
  var point1 = addPoint(series, 1, 6);
  var point2 = addPoint(series, 6, 1);
  
  equals(canvasView.getPath('childViews.length'), 1, 'canvasView has only one child view (the axes view) before series is pushed to seriesList');
  
  SC.RunLoop.begin();
  seriesList.pushObject(series);
  SC.RunLoop.end();
  
  var seriesView = canvasView.get('childViews').objectAt(1);
  ok(SC.kindOf(seriesView, RaphaelViews.RaphaelCollectionView), 'after pushing the series to seriesList, seriesView exists and is a RaphaelCollectionView');
  
  var layerId = seriesView.get('layerId');
  var $seriesLayer = $('#'+layerId);
  var seriesLayer = $seriesLayer[0];

  ok(!SC.none(seriesLayer), "after pushing the pre-populated series to the seriesList, seriesView's layer exists and is findable in the document body");
  equals(seriesView.getPath('content.length'), 2, 'The seriesView contains 2 DataPoints');
  equals(numVisibleChildren($seriesLayer), 2, "The seriesView's layer contains two visible child (one per data point)");
});


test('coordinatesForPoint should return sensible values for points on the graph', function () {
  var padding = view.get('padding');
  var frame = view.get('frame');
      
  var top = frame.y + padding.top,
      bottom = frame.y + frame.height - padding.bottom,
      left = frame.x + padding.left,
      right = frame.x + frame.width - padding.right,
      midY = (top+bottom) / 2,
      midX = (left+right) / 2;
      
  var expectedX = [
    { coord: left,  point: -5,  type: 'leftmost' },
    { coord: midX,  point: 2.5, type: 'middle' },
    { coord: right, point: 10,  type: 'rightmost' }
  ];
  
  var expectedY = [
    { coord: bottom, point: 2, type: 'bottom' },
    { coord: midY,   point: 5, type: 'middle' },
    { coord: top,    point: 8, type: 'top' }
  ];

  var coords, x, y;
  
  for (var i = 0, ii = expectedX.length; i < ii; i++) {
    x = expectedX[i].point;
    for (var j = 0, jj = expectedY.length; j < jj; j++) {       
       y = expectedY[j].point;
       coords = view.coordinatesForPoint(x, y);

       equals(rnd(coords.x), rnd(expectedX[i].coord), 'x coordinate for point (' + x + ', ' + y + ') should be the ' + expectedX[i].type + ' coordinate');
       equals(rnd(coords.y), rnd(expectedY[j].coord), 'y coordinate for point (' + x + ', ' + y + ') should be the ' + expectedY[j].type + ' coordinate');
    }
  }
});


test('pointForCoordinates should be the inverse function of coordinatesForPoint', function () {
  var coords, point;
  
  for (var x = -5; x <= 10; x+=7.5) {
    for (var y = 2; y <= 8; y+=3) {
      coords = view.coordinatesForPoint(x, y);
      point = view.pointForCoordinates(coords.x, coords.y);
  
      equals(rnd(point.x), rnd(x), 'pointForCoordinates of x coordinate derived from point (' + x + ', ' + y + ') should be ' + x);
      equals(rnd(point.y), rnd(y), 'pointForCoordinates of y coordinate derived from point (' + x + ', ' + y + ') should be ' + y);
    }
  }
});


// TODO move to unit test for DataPointView?

test('updating the coordinates of a DataPoint should result in a call to render() with the new coordinates', function () {  
  var seriesList = Smartgraphs.firstGraphController.get('seriesList');
  var series = Smartgraphs.store.createRecord(Smartgraphs.DataSeries, { url: 'series1' });
  seriesList.pushObject(series);
  
  var seriesView = canvasView.get('childViews').objectAt(1);
  ok(SC.kindOf(seriesView, RaphaelViews.RaphaelCollectionView), 'after pushing the series to seriesList, seriesView exists and is a RaphaelCollectionView');
    
  var point = addPoint(series, 1, 1);  
  var childViews = seriesView.get('childViews');

  equals(childViews.get('length'),  1, 'after adding a single point, the seriesView has one child view');
  var pointView = childViews.objectAt(0);
  
  var renderCount = 0;
  var valueOfFirstTime;
  var renderedX, renderedY;
  var raphaelCircle;
  var attrArguments;
  var oldAttrs;
  
  pointView.oldRender = pointView.render;
  pointView.render = function (context, firstTime) {
    renderCount++;
    renderedX = this.getPath('content.x');
    renderedY = this.getPath('content.y');
    
    valueOfFirstTime = firstTime;
    
    if (!firstTime) {
      raphaelCircle = context.raphael();
      oldAttrs = raphaelCircle.attr();      // get the circle attrs before the new ones are set.
      
      if (!raphaelCircle.oldAttr) {
        // spy on the raphael circle object too.
        raphaelCircle.oldAttr = raphaelCircle.attr;
        raphaelCircle.attr = function () {
          attrArguments = Array.prototype.slice.call(arguments);
          raphaelCircle.oldAttr(arguments);
        };
      }
    }
    this.oldRender(context, firstTime);
  };

  SC.RunLoop.begin();
  point.set('x', 4);
  SC.RunLoop.end();
  
  equals(renderCount, 1, 'render() should have been called once after setting x to 4');
  ok(valueOfFirstTime === NO, 'render() was passed firstTime = NO when x was set to 4');
  
  // check originally-rendered centerx and centery of circle
  equals(oldAttrs.cx, view.coordinatesForPoint(1,1).x, 'cx value of raphaelCircle before update to (4,1) was correct x-coordinate for (1,1)');
  equals(oldAttrs.cy, view.coordinatesForPoint(1,1).y, 'cy value of raphaelCircle before update to (4,1) was correct y-coordinate for (1,1)');  

  // check newly-rendered centerx and centery of circle after update of point.x
  equals(renderedX, 4, 'x value during render was 4');
  equals(renderedY, 1, 'y value during render was 1');
  equals(attrArguments[0].cx, view.coordinatesForPoint(4,1).x, 'cx value of raphaelCircle was correct x-coordinate for (4,1)');
  equals(attrArguments[0].cy, view.coordinatesForPoint(4,1).y, 'cy value of raphaelCircle was correct y-coordinate for (4,1)');
  
  SC.RunLoop.begin();
  point.set('y', 6);
  SC.RunLoop.end();
  
  // check newly-rendered centerx and centery of circle after update of point.y
  equals(renderCount, 2, 'render() should have been called a second time after setting y to 6');
  ok(valueOfFirstTime === NO, 'render() was passed firstTime = NO when y was set to 6');
  
  equals(renderedX, 4, 'x value during render was 4');
  equals(renderedY, 6, 'y value during render was 6');
  equals(attrArguments[0].cx, view.coordinatesForPoint(4,6).x, 'cx value of raphaelCircle was correct x-coordinate for (4,6)');
  equals(attrArguments[0].cy, view.coordinatesForPoint(4,6).y, 'cy value of raphaelCircle was correct y-coordinate for (4,6)');
});

