// ==========================================================================
// Project:   Smartgraphs.sessionController
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs property */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
Smartgraphs.sessionController = SC.ObjectController.create(
/** @scope Smartgraphs.sessionController.prototype */ {

  newSession: function () {
    var session = Smartgraphs.store.createRecord(Smartgraphs.Session, {
      steps: [],
      user: Smartgraphs.userController.getPath('content.id')
    });
    session.set('id', Smartgraphs.getNextGuid());
    this.set('content', session);
  },
  
  createDataset: function (name) {
    var newDataset = Smartgraphs.store.createRecord(Smartgraphs.Dataset, { 
      isExample: NO,
      name: name,
      points: []
    });
    newDataset.set('session', this.get('content'));
    newDataset.set('id', Smartgraphs.getNextGuid());
    
    return newDataset;
  },
  
  createAnnotation: function (type, name, attributes) {
    var newAnnotation = Smartgraphs.store.createRecord(type, SC.mixin({
      isExample: NO,
      session: this.getPath('content.id'),
      name: name
    }, attributes));
    
    newAnnotation.set('id', Smartgraphs.getNextGuid());
    return newAnnotation;
  }
  
  // NOT CURRENTLY USED:
  // TODO: change to 'copy example object to session' or the like. (but only if we really need that functionality)
  
  // copyExampleDataset: function (exampleDatasetName, targetDatasetName) {
  //   // get the example dataset
  //   var query = SC.Query.local(
  //     Smartgraphs.Dataset, 
  //     'isExample=YES AND name={datasetName}', 
  //     { datasetName: exampleDatasetName }
  //   );
  // 
  //   var exampleDatasetList = Smartgraphs.store.find(query);
  //   if (exampleDatasetList.get('length') < 1) return NO;
  //   
  //   var exampleDataset = exampleDatasetList.objectAt(0);
  //   
  //   // get the dataset we're copying into
  //   query = SC.Query.local(
  //     Smartgraphs.Dataset,
  //     'isExample=NO AND session={session} AND name={datasetName}',
  //     { session: this.get('content'), name: targetDatasetName }
  //   );
  //   var targetDatasetList = Smartgraphs.store.find(query);
  //   
  //   if (targetDatasetList.get('length') < 1) return NO;
  //   var targetDataset = targetDatasetList.objectAt(0);
  //   
  //   // copy all the data points
  //   var examplePoints = exampleDataset.get('points');
  //   var point, newPoint;
  //   for (var i = 0, ii = examplePoints.get('length'); i < ii; i++) {
  //     point = examplePoints[i];
  //     newPoint = Smartgraphs.store.createRecord(Smartgraphs.DataPoint, { x: point.get('x'), y: point.get('y') });
  //     newPoint.set('id', Smartgraphs.getNextGuid());
  //     newPoint.set('dataset', targetDataset);
  //   }
  //   
  //   return YES;
  // }
  
}) ;
