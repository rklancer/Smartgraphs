// ==========================================================================
// Project:   Smartgraphs.sessionController
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
Smartgraphs.sessionController = SC.ObjectController.create(
/** @scope Smartgraphs.sessionController.prototype */ {

  createSession: function () {
    var session = Smartgraphs.createRecord(Smartgraphs.Session);
    session.set('user', Smartgraphs.userController.get('content'));
    session.set('steps', []);
    this.set('content', session);
  },
  
  createSeries: function (seriesName) {
    var newSeries = Smartgraphs.store.createRecord(Smartgraphs.DataSeries, { 
      isExample: NO,
      name: seriesName,
      session: this.get('content'),
      points: []
    });
    newSeries.set('id', Smartgraphs.DataSeries.nextGuid++);
    Smartgraphs.store.commitRecords();
    
    return newSeries;
  },
  
  copyExampleSeries: function (exampleSeriesName, targetSeriesName) {
    // get the example series
    var query = SC.Query.local(
      Smartgraphs.DataSeries, 
      'isExample=YES AND name={seriesName}', 
      { seriesName: exampleSeriesName }
    );

    var exampleSeriesList = Smartgraphs.store.find(query);
    if (exampleSeriesList.get('length') < 1) return NO;
    
    var exampleSeries = exampleSeriesList.objectAt(0);
    
    // get the series we're copying into
    query = SC.Query.local(
      Smartgraphs.DataSeries,
      'isExample=NO AND session={session} AND name={seriesName}',
      { session: this.get('content'), name: targetSeriesName }
    );
    var targetSeriesList = Smartgraphs.store.find(query);
    
    if (targetSeriesList.get('length') < 1) return NO;
    var targetSeries = targetSeriesList.objectAt(0);
    
    // copy all the data points
    var examplePoints = exampleSeries.get('points');
    var point, newPoint;
    for (var i = 0, ii = examplePoints.get('length'); i < ii; i++) {
      point = examplePoints[i];
      newPoint = Smartgraphs.store.createRecord(Smartgraphs.DataPoint, { x: point.get('x'), y: point.get('y') });
      newPoint.set('id', Smartgraphs.DataPoint.nextGuid++);
      newPoint.set('series', targetSeries);
    }
    Smartgraphs.store.commitRecords();
    
    return YES;
  }
}) ;
