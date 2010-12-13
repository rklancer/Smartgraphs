// ==========================================================================
// Project:   Smartgraphs.ACTIVITY_STEP Unit Test
// Copyright: ©2010 Concord Consortium
// @author:   Parker Morse <pmorse@cantinaconsulting.com>
// ==========================================================================
/*globals Smartgraphs module test ok equals same stop start setup teardown newSession */

var pane, graphView, datasetView;

module("Smartgraphs.ACTIVITY_STEP", {
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
    setup.mock(Smartgraphs.activityStepController, 'begin', function () {});
    setup.mock(Smartgraphs.activityStepController, 'content', Smartgraphs.store.createRecord(Smartgraphs.ActivityStep, {}));
    setup.mock(Smartgraphs, 'statechart', SC.Statechart.create({
      trace: YES,
      rootState: SC.State.design({
        initialSubstate: 'ACTIVITY',
        ACTIVITY: SC.State.plugin('Smartgraphs.ACTIVITY')
      })
    }));

    SC.RunLoop.begin();
    Smartgraphs.statechart.initStatechart();
    Smartgraphs.statechart.gotoState('ACTIVITY_STEP');
    SC.RunLoop.end();
  },

  teardown: function () {
    Smartgraphs.firstGraphController.clear();
    graphView.bindings.forEach( function (b) { b.disconnect(); } );
    pane.remove();
    teardown.all();
  }
});

test("creating a HighlightedPoint record with color param", function () {
  expect(4);
  var startingAnnotationCount = Smartgraphs.store.find('Smartgraphs.HighlightedPoint').get('length');
  var controllerAnnotationCount = Smartgraphs.firstGraphController.get('annotationList').get('length');
  // create the annotation
  var handlingState = Smartgraphs.statechart.sendAction('createAnnotation', null, {'type': Smartgraphs.HighlightedPoint, 'name': "TestHighlighted", 'graphName': 'test-graph'});
  equals( handlingState.get('name'), 'ACTIVITY_STEP', "ACTIVITY_STEP should have handled the createAnnotation action");
  equals( Smartgraphs.store.find('Smartgraphs.HighlightedPoint').get('length'), startingAnnotationCount + 1, "There should be one more HighlightedPoint annotation in the store");
  equals( Smartgraphs.firstGraphController.get('annotationList').get('length'), controllerAnnotationCount + 1, "There should be one more annotation associated with the controller");
  ok( Smartgraphs.firstGraphController.findAnnotationByName('TestHighlighted').kindOf(Smartgraphs.HighlightedPoint), "The controller can find the annotation, which is the appropriate type");
});