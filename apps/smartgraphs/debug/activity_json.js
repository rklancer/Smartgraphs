Smartgraphs.hashesForRecordArray = function (recordArray) {
  var keys = recordArray.getEach('storeKey'); 
  var hash, ret = [];
  
  for (var i = 0, ii = keys.get('length'); i < ii; i++) {
    hash = Smartgraphs.store.readDataHash(keys[i]);
    ret.push(hash);
  }
  
  return ret;
};


Smartgraphs.hashForRecord = function (record) {
  return Smartgraphs.store.readDataHash(record.get('storeKey'));
};

// find all records with 'activityId' as the prefix of their url
// and return an array containing the hashes of each such record.

Smartgraphs.hashesForTypeAndActivity = function (recordType, activityId) {
  var ret = [];
  var recs = Smartgraphs.store.find(recordType);
  
  recs.forEach( function (record) {
    if (record.get('url').indexOf(activityId) === 0) {
      console.log('adding record: %s', record.get('url'));      
      ret.push(Smartgraphs.hashForRecord(record));       
    }
  });
  
  return ret;  
};


// generate JSON representation of all data for activity 'activityId'
// suitable for storing in CouchDB and loading in a single request

// Smartgraphs.generateJsonForActivity("/backend/activity/1") ==> (a json string)

Smartgraphs.preloadActivity = function (activityId) {
  var activity = Smartgraphs.store.find(Smartgraphs.Activity, activityId);
  
  setTimeout(function () {
    SC.RunLoop.begin().end();
    
    if ( !(activity.get('status') & SC.Record.READY) ) {
      console.error("oops - activity record not ready");
      return;
    }
    
    var pages = Smartgraphs.store.find(activity.get('pagesQuery'));
    
    setTimeout(function () {
      SC.RunLoop.begin().end();
          
      pages.forEach(function (page) {
        Smartgraphs.store.find(page.get('stepsQuery'));
      });
  
      setTimeout(function () {
        SC.RunLoop.begin().end();
      
        pages.forEach(function (page) {
          var steps = Smartgraphs.store.find(page.get('stepsQuery'));          
          if ( !(steps.get('status') & SC.Record.READY) ) {
            console.error("oops - steps not ready");
            return;
          }
        });
      }, 100);
    }, 100);
  }, 100);
};

  
Smartgraphs.generateJsonForActivity = function (activityId) {
  var ret = {};
  var activity = Smartgraphs.store.find(Smartgraphs.Activity, activityId);
  
  // Add the activity to the return value...
  var hash = Smartgraphs.hashForRecord(activity);
  ret.activity = hash;
  
  // add the pages...
  var pages = activity.get('pages');

  if ( !(activity.get('status') & SC.Record.READY) ) {
    console.error('Activity record not READY! Be sure to run Smartgraphs.preloadActivity(activityId) first, and give it time to finish before running generateJsonForActivity');
    return;
  }
  
  ret.pages = Smartgraphs.hashesForRecordArray(pages);

  // add the steps
  var steps;
  ret.steps = [];
  ret.responseTemplates = [];
  var templateHasBeenSeen = {};
  
  pages.forEach(function (page) {
    if ( !page.get('status') ) {
      console.error('ActivityPage record not READY! Be sure to run Smartgraphs.preloadActivity(activityId) first, and give it time to finish before running generateJsonForActivity');
      return;
    }      
    
    var steps = Smartgraphs.store.find(page.get('stepsQuery'));
    
    if ( !(steps.get('status') & SC.Record.READY) ) {
      console.error('ActivityStep records not READY! Be sure to run Smartgraphs.preloadActivity(activityId) first, and give it time to finish before running generateJsonForActivity');
      return;
    }
    steps = page.get('steps');
    
    ret.steps = ret.steps.concat(Smartgraphs.hashesForRecordArray(steps));

    // add the response templates referenced by this step
    steps.forEach(function (step) {
      var template = step.get('responseTemplate');   
      if (!template || templateHasBeenSeen[ template.get('id') ]) return;

      console.log('adding response template %s', template.get('id'));      
      ret.responseTemplates.push(Smartgraphs.hashForRecord(template));
      templateHasBeenSeen[ template.get('id') ] = YES;
    });
  });


  // get all the DataSeries (soon to be renamed 'DataSet') records associated with this activity
  ret.datasets = [];
  ret.datapoints = [];

  var datasets = Smartgraphs.store.find(Smartgraphs.DataSeries);

  datasets.forEach(function (dataset) {
    if (dataset.get('url').indexOf(activityId) === 0) {
      console.log('adding dataset: %s', dataset.get('url'));
      ret.datasets.push(Smartgraphs.hashForRecord(dataset));

      // get all the dataPoints referenced by this dataset
      dataset.get('points').forEach( function (point) {
         ret.datapoints.push(Smartgraphs.hashForRecord(point));
      });
    }
  });

  // get all graphs associated with the activity -- they should have an 'activity' parameter
  var graphsQuery = SC.Query.create({
    recordType: Smartgraphs.Graph,
    conditions: 'activity = {activity}',
    parameters: { activity: activity }
  });
  var graphs = Smartgraphs.store.find(graphsQuery);

  ret.graphs = [];
  var axesHaveBeenSeen = {};

  ret.axes = [];
  graphs.forEach(function (graph) {
    ret.graphs.push(Smartgraphs.hashForRecord(graph));

    // get the axes object referenced by the graph, too
    var axes = graph.get('axes');
    var axesId = axes.get('id');

    if ( axesHaveBeenSeen[axesId] ) return;

    ret.axes.push(Smartgraphs.hashForRecord(axes));
    console.log('adding axes %s', axesId);
    axesHaveBeenSeen[axesId] = YES;
  });

  // add the annotations ... need to use url prefix to know what activity they're associated with
  ret.freehandSketches = Smartgraphs.hashesForTypeAndActivity(Smartgraphs.FreehandSketch, activityId);
  ret.highlightedPoints = Smartgraphs.hashesForTypeAndActivity(Smartgraphs.HighlightedPoint, activityId);
  ret.highlightedSegments = Smartgraphs.hashesForTypeAndActivity(Smartgraphs.HighlightedSegment, activityId);
  ret.linesToAxis = Smartgraphs.hashesForTypeAndActivity(Smartgraphs.LineToAxis, activityId);

  // the return value is actually a json-encoded version of 'ret'
  console.log(SC.json.encode(ret));
};
