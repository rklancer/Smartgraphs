// ==========================================================================
// Project:   Smartgraphs.GraphView Unit Test
// Copyright: ©2010 Concord Consortium
// Author:   Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs RaphaelViews module test ok equals same stop start afterPropertyChange rnd addPoint setupDatapointFixtures restoreDatapointFixtures */

var pane;
var view;
var canvasView;
var annotationsHolder;
var dataHolder;
var oldStore;
var origHeight;


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
    { url: 'test-graph',
      name: 'test-graph',
      xAxis: 'x-axis',
      yAxis: 'y-axis',
      title: 'Test Graph',
      initialDatasets: []    
    }
  ];
  
  Smartgraphs.Axis.oldFixtures = Smartgraphs.Axis.FIXTURES;
  Smartgraphs.Axis.FIXTURES = [
    { url: 'x-axis',
      min: -5,
      max: 10,
      nSteps: 5,
      label: 'x axis',
      units: '/builtins/units/seconds'
    },
    
    { url: 'y-axis',
      min: 2,
      max: 8,
      nSteps: 6,
      label: 'y axis',
      units: '/builtins/units/meters'
    }
  ];
  
  setupDatapointFixtures();
  
  oldStore = Smartgraphs.store;
  
  // REMINDER: 'SC.Record.fixtures' is a singleton object; using it below would result in pollution of the data store
  // with data from prior tests.
  Smartgraphs.set('store', SC.Store.create().from(SC.FixturesDataSource.create()));
}

function restoreFixtures() {
  Smartgraphs.Graph.FIXTURES = Smartgraphs.Graph.oldFixtures;
  Smartgraphs.Axis.FIXTURES = Smartgraphs.Axis.oldFixtures;
  restoreDatapointFixtures();
  
  Smartgraphs.set('store', oldStore);
}


function runTests() {
  
  test('show the view', function () {
    setTimeout(function () {
      view.set('readyToTest', YES);
    }, 1000);
    
    afterPropertyChange(view, 'readyToTest', YES, function () {
    });
  });


  test("GraphView should contain a child view that is RaphaelCanvasView", function () {
    ok(SC.kindOf(canvasView, RaphaelViews.RaphaelCanvasView), 'GraphView.graphCanvasView is a RaphaelCanvasView');
  });


  test("the annotations view holder and dataset view holder should be children of the canvasView", function () {
    var ahLayer = annotationsHolder.get('layer');
    var dLayer = dataHolder.get('layer');
    
    // check that ahLayer and dLayer are children of the canvas view
    
    ok($.contains(canvasView.get('layer'), ahLayer), "The annotations view holder should be a child of the graph canvas view");
    ok($.contains(canvasView.get('layer'), dLayer), "The dataset view holder should be a child of the graph canvas view");  
  });
  

  test("the annotations holder view should appear in the DOM before the dataset holder", function () {
    var ahLayer = annotationsHolder.get('layer');
    var dLayer = dataHolder.get('layer');
    
    // Use the jquery 'next siblings' selector "~" to select the dLayer if and only if it is a sibling of the ahLayer and appears after the ahLayer
    ok( $('#' + ahLayer.id + ' ~ #' + dLayer.id)[0] === dLayer, "The data view holder's layer should be a later sibling of the annotation view holder's layer");
  });
  
  
  test('adding and removing Dataset from the graph controller should result in calls to appendChild and removeChild', function () {
    var datasetList = Smartgraphs.firstGraphController.get('datasetList');
    var dataset1 = Smartgraphs.store.createRecord(Smartgraphs.Dataset, { url: 'dataset1' });
    var dataset1View = null;
    var dataset2 = Smartgraphs.store.createRecord(Smartgraphs.Dataset, { url: 'dataset2' });
    var dataset2View = null;
    var viewAppended = null;
    var viewRemoved = null;
    var appendCallCount = 0;
    var removeCallCount = 0;

    dataHolder.oldAppendChild = dataHolder.appendChild;
    dataHolder.appendChild = function (v) {
      viewAppended = v;
      appendCallCount++;
      this.oldAppendChild(v);
    };

    dataHolder.oldRemoveChild = dataHolder.removeChild;
    dataHolder.removeChild = function (v) {
      viewRemoved = v;
      removeCallCount++;
      this.oldRemoveChild(v);
    };

    var childViews = dataHolder.get('childViews');
    var startLength = childViews.get('length');

    datasetList.pushObject(dataset1);
    ok(SC.kindOf(viewAppended, RaphaelViews.RaphaelCollectionView), 'a RaphaelCollectionView was appended after dataset1 was pushed onto datasetList');
    equals(childViews.get('length'), startLength+1, 'dataHolder has one more childView than it did before dataset1 was pushed onto datasetList');

    dataset1View = viewAppended;

    datasetList.pushObject(dataset2);
    ok(SC.kindOf(viewAppended, RaphaelViews.RaphaelCollectionView), 'a RaphaelCollectionView was appended after dataset2 was pushed onto datasetList');
    equals(childViews.get('length'), startLength+2, 'dataHolder has two more childViews than it did before dataset1 and dataset2 were pushed onto datasetList');

    dataset2View = viewAppended;

    equals(appendCallCount, 2, 'there were two calls to appendChild() for two push()es to datasetList');
    equals(removeCallCount, 0, 'no views were removed when datasets were added');
    
    datasetList.removeObject(dataset1);
    equals(viewRemoved, dataset1View, 'The view for dataset1 was removed when dataset1 was removed from the datasetList');
    equals(childViews.get('length'), startLength+1, 'dataHolder has one fewer childView than it did before dataset1 was removed from the datasetList');

    datasetList.removeObject(dataset2);
    equals(viewRemoved, dataset2View, 'The view for dataset2 was removed when dataset2 was removed from the datasetList');
    equals(childViews.get('length'), startLength, 'dataHolder has the same number of childViews that it did before dataset1 and dataset2 were added and then removed from datasetList');
    
    equals(appendCallCount, 2, 'no views were added when datasets were removed');
    equals(removeCallCount, 2, 'there were two calls to removeChild() for two removeObject()s from datasetList');

    dataHolder.appendChild = dataHolder.oldAppendChild;
    delete dataHolder.oldAppendChild;
    dataHolder.removeChild = dataHolder.oldRemoveChild;
    delete dataHolder.oldRemoveChild;
  });


  test("adding or removing DataPoints to/from a Dataset should add or remove elements to/from the Dataset' layer", function () {
    var datasetList = Smartgraphs.firstGraphController.get('datasetList');
    var dataset = Smartgraphs.store.createRecord(Smartgraphs.Dataset, { url: 'dataset1' });

    equals(dataHolder.getPath('childViews.length'), 0, 'dataHolder has no child views before dataset is pushed to datasetList');

    datasetList.pushObject(dataset);
    var datasetView = dataHolder.get('childViews').objectAt(0);

    ok(SC.kindOf(datasetView, RaphaelViews.RaphaelCollectionView), 'after pushing the dataset to datasetList, datasetView exists and is a RaphaelCollectionView');

    var point1 = addPoint(dataset, 0, 0);

    var layerId = datasetView.get('layerId');
    var $datasetLayer = $('#'+layerId);
    var datasetLayer = $datasetLayer[0];

    ok(!SC.none(datasetLayer), "after adding a data point, datasetView's layer exists and is findable in the document body");
    equals(numVisibleChildren($datasetLayer), 1, "after adding one data point, datasetView's layer contains one visible child");

    var point2 = addPoint(dataset, 5, 5);
    equals(numVisibleChildren($datasetLayer), 2, "after adding a second data point, datasetView's layer contains two visible children");

    SC.RunLoop.begin();
    point1.destroy();
    SC.RunLoop.end();

    equals(numVisibleChildren($datasetLayer), 1, "after removing first point, datasetView's layer contains one visible child");

    SC.RunLoop.begin();
    point2.destroy();
    SC.RunLoop.end();

    equals(numVisibleChildren($datasetLayer), 0, "after removing second point, datasetView's layer contains no visible children");
  });


  test("adding DataPoints to a Dataset and then adding the Dataset to the graph should add 1 element per DataPoint to the Dataset' layer", function () {
    var datasetList = Smartgraphs.firstGraphController.get('datasetList');
    var dataset = Smartgraphs.store.createRecord(Smartgraphs.Dataset, { url: 'dataset1' });

    var point1 = addPoint(dataset, 1, 6);
    var point2 = addPoint(dataset, 6, 1);

    equals(dataHolder.getPath('childViews.length'), 0, 'dataHolder has no child views before the dataset is pushed to datasetList');

    SC.RunLoop.begin();
    datasetList.pushObject(dataset);
    SC.RunLoop.end();

    var datasetView = dataHolder.get('childViews').objectAt(0);
    ok(SC.kindOf(datasetView, RaphaelViews.RaphaelCollectionView), 'after pushing the dataset to datasetList, datasetView exists and is a RaphaelCollectionView');

    var layerId = datasetView.get('layerId');
    var $datasetLayer = $('#'+layerId);
    var datasetLayer = $datasetLayer[0];

    ok(!SC.none(datasetLayer), "after pushing the pre-populated dataset to the datasetList, datasetView's layer exists and is findable in the document body");
    equals(datasetView.getPath('content.length'), 2, 'The datasetView contains 2 DataPoints');
    equals(numVisibleChildren($datasetLayer), 2, "The datasetView's layer contains two visible child (one per data point)");
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

  test('updating the coordinates of a DataPoint should result in a call to render() with the correct color and coordinates', function () {  
    var datasetList = Smartgraphs.firstGraphController.get('datasetList');
    var dataset = Smartgraphs.store.createRecord(Smartgraphs.Dataset, { url: 'dataset1' });
    dataset.set('color', '#badcaf');
    
    datasetList.pushObject(dataset);

    var datasetView = dataHolder.get('childViews').objectAt(0);
    ok(SC.kindOf(datasetView, RaphaelViews.RaphaelCollectionView), 'after pushing the dataset to datasetList, datasetView exists and is a RaphaelCollectionView');

    var point = addPoint(dataset, 1, 1);  
    var childViews = datasetView.get('childViews');

    equals(childViews.get('length'),  1, 'after adding a single point, the datasetView has one child view');
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

    // check colors
    equals(oldAttrs.fill, '#badcaf', 'raphaelCircle should reflect color of underlying dataset');
    equals(oldAttrs.stroke, '#badcaf', 'raphaelCircle should reflect color of underlying dataset');
    
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


  test('the x and y label text should be visible in the dom and should update when the label is updated', function () {

    var xAxisView = canvasView.getPath('axesView.xAxisView');
    var yAxisView = canvasView.getPath('axesView.yAxisView');
    var xLabel = xAxisView._label;    // alternatively to checking the private property '_label' we could spy on Raphael somehow...
    var yLabel = yAxisView._label;
    var xNode = xLabel.node;
    var yNode = yLabel.node;

    // xLabel's .node property is the DOM node corresponding to the label
    ok($.contains(document.body, xNode), "the x label's node should be contained within document.body (not offscreen)");
    equals(xLabel.attr('text'), 'x axis (seconds)', "the x label's text attr should be 'x axis (seconds)'");

    ok($.contains(document.body, yNode), "the y label's node should be contained within document.body (not offscreen)");
    equals(yLabel.attr('text'), 'y axis (meters)', "the y label's text attr should be 'y axis (meters)'");

    // test that axis labels correctly update when label properties are changed
    var xAxis = Smartgraphs.firstGraphController.get('xAxis');

    // x label...
    SC.RunLoop.begin();
    xAxis.set('label', 'updated x axis label');
    SC.RunLoop.end();

    var newXNode = xAxisView._label.node;
    equals(newXNode, xNode, "changing the axis label should not have changed the x label's DOM node");
    ok($.contains(document.body, newXNode), "the x label's node should still be contained within document.body (not offscreen)");
    equals(xLabel.attr('text'), 'updated x axis label (seconds)', "after updating the x label's text, the x label's text attr should be 'updated x axis label (seconds)'");

    // y label...
    var yAxis = Smartgraphs.firstGraphController.get('yAxis');    
    SC.RunLoop.begin();
    yAxis.set('label', 'updated y axis label');
    SC.RunLoop.end();

    var newYNode = yAxisView._label.node;
    equals(newYNode, yNode, 'changing the axis label should not have changed the y label node');
    ok($.contains(document.body, newYNode), "the y label's node should still be contained within document.body (not offscreen)");  
    equals(yLabel.attr('text'), 'updated y axis label (meters)', "after updating the y label's text, the y label's text attr should be 'updated y axis label (meters)'");
  });


  test('the y label should be rotated correctly and the x axis label should not be rotated', function () {
    var xAxisView = canvasView.getPath('axesView.xAxisView');
    var yAxisView = canvasView.getPath('axesView.yAxisView');
    var xLabel = xAxisView._label;
    var yLabel = yAxisView._label;

    equals(xLabel.attr('rotation'), 0, "the x label's node should not be rotated (rotation of 0 degrees)");
    equals(yLabel.attr('rotation'), 270, "the y label's node should be rotated at 270 degrees");

    // guard against re-rotating the axis labels every time they are updated...
    var xAxis = Smartgraphs.firstGraphController.get('xAxis');  
    var yAxis = Smartgraphs.firstGraphController.get('yAxis');  
    SC.RunLoop.begin();
    xAxis.set('xLabel', 'updated xLabel');
    yAxis.set('yLabel', 'updated yLabel');
    SC.RunLoop.end();

    equals(xLabel.attr('rotation'), 0, "after updating the x label's text, the x label should still not be rotated (rotation of 0 degrees)");
    equals(yLabel.attr('rotation'), 270, "the updating the y label's text, the y label should still be rotated at 270 degrees");
  });


  test('the x and y labels should be in approximately the right position', function () {
    var padding = view.get('padding');
    var frame = view.get('frame');

    var top = frame.y,
        bottom = frame.y + frame.height,
        left = frame.x,
        right = frame.x + frame.width,
        width = right - left,
        height = bottom - top;

    var xAxisView = canvasView.getPath('axesView.xAxisView');
    var yAxisView = canvasView.getPath('axesView.yAxisView');
    var xLabel = xAxisView._label;
    var yLabel = yAxisView._label;

    // test x label position...

    var x = xLabel.attr('x');
    var y = xLabel.attr('y');

    // x position should be in the middle third
    var lbound = left + width / 3;
    var rbound = right - width / 3;
    ok(lbound < x && x < rbound, 'x position of x label should be in middle third (between ' + lbound + ' and ' + rbound + ')');

    // y position should be in the top third
    var hibound = bottom;
    var lobound = bottom - height / 3;
    ok (lobound < y && y < hibound, 'y position of x label should be in bottom third (between ' + lobound + ' and ' + hibound + ')');


    // test y label position...

    x = yLabel.attr('x');
    y = yLabel.attr('y');

    // x position should be in left third
    lbound = left;
    rbound = left + width / 3;
    ok(lbound < x && x < rbound, 'x position of y label should be in left third (between ' + lbound + ' and ' + rbound + ')');

    // y position should be in middle third
    hibound = bottom - height / 3;
    lobound = top + height / 3;
    ok (lobound < y && y < hibound, 'y position of y label should be in middle third (between ' + lobound + ' and ' + hibound + ')');
  });
  
}



module("Smartgraphs.GraphView -- initial instantiation of graph", {
  setup: function() {
    setupFixtures();
    
    Smartgraphs.firstGraphController.openGraph('test-graph');
    
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
    annotationsHolder = canvasView.get('annotationsHolder');
    dataHolder = canvasView.get('dataHolder');   
    origHeight = view.get('frame').height;
  }, 
  
  teardown: function () {
    Smartgraphs.firstGraphController.clear();
    view.bindings.forEach( function (b) { b.disconnect(); } );
    pane.remove();
    pane = view = null;
    restoreFixtures();
  }
});


runTests();


module("Smartgraphs.GraphView -- resized graph", {
  setup: function() {
    setupFixtures();
    
    Smartgraphs.firstGraphController.openGraph('test-graph');
    
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
    
    SC.RunLoop.begin();
    pane.set('layout', { height: 0.5, width: 0.5});
    SC.RunLoop.end();
    
    // allow one more runloop for Raphael views that wait for the layer to be appended
    SC.RunLoop.begin();
    SC.RunLoop.end();
    
    canvasView = view.get('graphCanvasView');
    annotationsHolder = canvasView.get('annotationsHolder');
    dataHolder = canvasView.get('dataHolder');
  }, 
  
  teardown: function () {
    Smartgraphs.firstGraphController.clear();
    view.bindings.forEach( function (b) { b.disconnect(); } );
    pane.remove();
    pane = view = null;
    restoreFixtures();
  }
});


test('height of graph after graph resize should be 1/2 of height during previous tests', function () {
  var frame = view.get('frame');
  ok( Math.abs(origHeight / 2 - frame.height) < 1, 'height of graph after frame is set to height: 50% should be 1/2 of previous value (' + origHeight + ')');
});

runTests();
