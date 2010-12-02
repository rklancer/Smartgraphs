// ==========================================================================
// Project:   Smartgraphs.ACTIVITY Unit Test
// Copyright: ©2010 Concord Consortium
// @author:   Parker Morse <pmorse@cantinaconsulting.com>
// ==========================================================================
/*globals Smartgraphs module test ok equals same stop start setup teardown newSession */

var pane, graphView, datasetView;

module("Smartgraphs.ACTIVITY", {
  // Setup/teardown borrowed from Smartgraphs.INTERACTIVE_SELECTION tests
  setup: function () {
    setup.fixtures(Smartgraphs.Graph, Smartgraphs.Graph.TEST_FIXTURES);
    setup.fixtures(Smartgraphs.Axes, Smartgraphs.Axes.TEST_FIXTURES);

    setup.fixtures(Smartgraphs.Dataset, [
      { url: 'test-dataset',
        name: 'test-dataset',
        isExample: YES,
        points: ['p1', 'p2']
      }
    ]);

    setup.fixtures(Smartgraphs.DataPoint, [
      { guid: 'p1', x: 1, y: 3, dataset: 'test-dataset' },
      { guid: 'p2', x: 4, y: 5, dataset: 'test-dataset' }
    ]);

    setup.fixtures(Smartgraphs.Session, Smartgraphs.Session.TEST_FIXTURES);
    setup.fixtures(Smartgraphs.User, Smartgraphs.User.TEST_FIXTURES);
    setup.store();

    Smartgraphs.firstGraphController.openGraph('test-graph');
    Smartgraphs.firstGraphController.addObjectByName(Smartgraphs.Dataset, 'test-dataset');

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

    graphView = pane.get('childViews').objectAt(0);
    datasetView = graphView.getPath('graphCanvasView.dataHolder.childViews').objectAt(0);

    newSession();
    setup.mock(Smartgraphs.ACTIVITY, 'nextResponder', null);
    setup.mock(Smartgraphs.activityStepController, 'begin', function () {});
    setup.mock(Smartgraphs.activityStepController, 'content', Smartgraphs.store.createRecord(Smartgraphs.ActivityStep, {}));
    Smartgraphs.makeFirstResponder(Smartgraphs.ACTIVITY_STEP);
  },

  teardown: function () {
    Smartgraphs.firstGraphController.clear();
    graphView.bindings.forEach( function (b) { b.disconnect(); } );
    pane.remove();
    teardown.all();
  }
});

test("creating a LineThroughPoints", function () {
  expect(3);
  var startLineCount = Smartgraphs.store.find('Smartgraphs.LineThroughPoints').get('length');
  Smartgraphs.firstGraphController.openGraph('test-graph'); // Thought this happened in setup()?
  var hp1 = Smartgraphs.sessionController.createAnnotation(Smartgraphs.HighlightedPoint, 'hp1', {'point': 'p1'});
  var hp2 = Smartgraphs.sessionController.createAnnotation(Smartgraphs.HighlightedPoint, 'hp2', {'point': 'p2'});
  Smartgraphs.firstGraphController.addAnnotation(hp1); // The points need to be in the graph to create the line
  Smartgraphs.firstGraphController.addAnnotation(hp2);
  var startAnnotationsCount = Smartgraphs.firstGraphController.get('annotationList').get('length');
  Smartgraphs.ACTIVITY.createLineThroughPoints(null, {'graphName': 'test-graph', 'firstPoint': 'hp1', 'secondPoint': 'hp2', 'lineName': 'test-line', 'color': '#ff0000'});
  equals(Smartgraphs.store.find('Smartgraphs.LineThroughPoints').get('length'), startLineCount + 1, "There should be one more LineThroughPoints");
  equals(Smartgraphs.firstGraphController.get('annotationList').get('length'), startAnnotationsCount, "The new Annotation should not have been added to the controller");
  Smartgraphs.firstGraphController.addObjectByName(Smartgraphs.LineThroughPoints, 'test-line'); // Grab the annotation to examine it
  var annotation = Smartgraphs.firstGraphController.findAnnotationByName('test-line');
  ok(annotation.kindOf(Smartgraphs.LineThroughPoints), 'The Annotation is a LineThroughPoints');
});

test("creating a rise Arrow", function () {
  expect(5);
  var startLineCount = Smartgraphs.store.find('Smartgraphs.Arrow').get('length');
  Smartgraphs.firstGraphController.openGraph('test-graph'); // Thought this happened in setup()?
  var hp1 = Smartgraphs.sessionController.createAnnotation(Smartgraphs.HighlightedPoint, 'hp1', {'point': 'p1'});
  var hp2 = Smartgraphs.sessionController.createAnnotation(Smartgraphs.HighlightedPoint, 'hp2', {'point': 'p2'});
  Smartgraphs.firstGraphController.addAnnotation(hp1);  // The points need to be in the graph to create the arrow
  Smartgraphs.firstGraphController.addAnnotation(hp2);
  var startAnnotationsCount = Smartgraphs.firstGraphController.get('annotationList').get('length');
  Smartgraphs.ACTIVITY.createRiseArrow(null, {'graphName': 'test-graph', 'firstPoint': 'hp1', 'secondPoint': 'hp2', 'arrowName': 'riseArrow', 'color': '#ff0000'});
  equals(Smartgraphs.store.find('Smartgraphs.Arrow').get('length'), startLineCount + 1, "There should be one more Arrow");
  equals(Smartgraphs.firstGraphController.get('annotationList').get('length'), startAnnotationsCount, "The new Annotation should not have been added to the controller");
  Smartgraphs.firstGraphController.addObjectByName(Smartgraphs.Arrow, 'riseArrow'); // Grab the annotation to examine it
  var annotation = Smartgraphs.firstGraphController.findAnnotationByName('riseArrow');
  ok(annotation.kindOf(Smartgraphs.Arrow), 'The Annotation is an Arrow');
  ok(annotation.get('isVertical'), 'The Annotation is vertical');
  ok(!annotation.get('isHorizontal'), 'The Annotation is not confusingly also horizontal');
});

test("creating a run Arrow", function () {
  expect(4);
  var startLineCount = Smartgraphs.store.find('Smartgraphs.Arrow').get('length');
  Smartgraphs.firstGraphController.openGraph('test-graph'); // Thought this happened in setup()?
  var hp1 = Smartgraphs.sessionController.createAnnotation(Smartgraphs.HighlightedPoint, 'hp1', {'point': 'p1'});
  var hp2 = Smartgraphs.sessionController.createAnnotation(Smartgraphs.HighlightedPoint, 'hp2', {'point': 'p2'});
  Smartgraphs.firstGraphController.addAnnotation(hp1); // The points need to be in the graph to create the arrow
  Smartgraphs.firstGraphController.addAnnotation(hp2);
  var startAnnotationsCount = Smartgraphs.firstGraphController.get('annotationList').get('length');
  Smartgraphs.ACTIVITY.createRunArrow(null, {'graphName': 'test-graph', 'firstPoint': 'hp1', 'secondPoint': 'hp2', 'arrowName': 'runArrow', 'color': '#ff0000'});
  equals(Smartgraphs.store.find('Smartgraphs.Arrow').get('length'), startLineCount + 1, "There should be one more Arrow");
  equals(Smartgraphs.firstGraphController.get('annotationList').get('length'), startAnnotationsCount, "The new Annotation should not have been added to the controller");
  Smartgraphs.firstGraphController.addObjectByName(Smartgraphs.Arrow, 'runArrow');
  var annotation = Smartgraphs.firstGraphController.findAnnotationByName('runArrow'); // Grab the annotation to examine it
  ok(annotation.kindOf(Smartgraphs.Arrow), 'The Annotation is an Arrow');
  ok(annotation.get('isHorizontal'), 'The Annotation is horizontal');
});
