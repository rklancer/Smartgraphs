// ==========================================================================
// Project:   Smartgraphs.GraphView Unit Test
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Smartgraphs module test ok equals same stop start afterPropertyChange */

var pane;
var view;
var oldStore;

module("Smartgraphs.GraphView", {
  setup: function() {
    Smartgraphs.Graph.FIXTURES = [
      { url: 
          '/backend/activity/1/graph/1/prediction-away',
        name:
          'Prediction-Away',
        description: 
          'Prediction graph of movement away',
        axes:
          '/backend/axes/1/5m-15s',
        initialSeries: 
          []
      }
    ];
    
    oldStore = Smartgraphs.store;
    Smartgraphs.set('store', SC.Store.create().from(SC.Record.fixtures));
    
    Smartgraphs.firstGraphController.openGraph('/backend/activity/1/graph/1/prediction-away');
    
    SC.RunLoop.begin();
    pane = SC.MainPane.create({
      childViews: [
        Smartgraphs.GraphView.design({
          graphBinding: 'Smartgraphs.firstGraphController',
          viewName: 'testGraphView'
        })]
    });
    pane.append(); // make sure there is a layer...
    SC.RunLoop.end();
    
    view = pane.childViews[0];
  }, 
  
  teardown: function() {
    pane.remove();
    pane = view = null ;
    Smartgraphs.set('store', oldStore);
  }
});

test('show the view', function () {
  
  setTimeout(function () {
    view.set('readyToTest', YES);
  }, 5000);
  
  afterPropertyChange(view, 'readyToTest', YES, function () {
    ok(true, 'you saw the graph, right?');
  });
});
