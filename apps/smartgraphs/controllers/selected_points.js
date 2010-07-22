// ==========================================================================
// Project:   Smartgraphs.selectedPointsController
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/

// TODO change the name of this? This is more like 'predictionPointsController'

Smartgraphs.selectedPointsController = SC.ArrayController.create(
/** @scope Smartgraphs.selectedPointsController.prototype */ {

  contentBinding: 'Smartgraphs.selectedSeriesController.points',
  xMinBinding: 'Smartgraphs.selectedSeriesController.xMin',
  xMaxBinding: 'Smartgraphs.selectedSeriesController.xMax',
  nBinsBinding: 'Smartgraphs.selectedSeriesController.nBins',

  _points: {},
  
  contentDidChange: function () {
    if (this.get('length') > 0) {
      this.invokeOnce(this._cleanupData);
    }
  }.observes('content'),
  
  binWidth: function () {
    return ((this.get('xMax') - this.get('xMin')) / this.get('nBins'));
  }.property('xMin', 'xMax', 'nBins').cacheable(),
  
  _cleanupData: function () {
    this.beginPropertyChanges();
    
    var averageY = function (ys) {
      var sum = 0;
      for (var i = 0, ii = ys.get('length'); i < ii; i++) {
        sum = sum + ys[i];
      }
      return (sum / ii);
    };
    
    var xMin = this.get('xMin'),
        xMax = this.get('xMax'),
        nBins = this.get('nBins');
        
    var binWidth = this.get('binWidth');

    // Smooth and canonicalize the data.
    // TODO mangles the existing data for now. Could use nested store and/or a special series view attached to 
    // this controller...

    this._bins = [];
    for (var i = 0; i < nBins; i++) {
      this._bins[i] = [];
    }
    
    var x, y, ii;
    var idsToDestroy = [];
    
    for (i = 0, ii = this.get('length'); i < ii; i++) {
      var point = this.objectAt(i);
      idsToDestroy.push(point.get('id'));

      x = point.get('x');
      y = point.get('y');
      var binIdx = Math.floor( (x-xMin) / binWidth );

      if (0 <= binIdx && binIdx < nBins) {
        this._bins[binIdx].push(y);
      }
    }
    
    Smartgraphs.store.destroyRecords(Smartgraphs.DataPoint, idsToDestroy);
    Smartgraphs.store.commitRecords();

    this.endPropertyChanges();
 
    // replace them with normalized points   
    var that = this;
    this._points = [];
    
    this.invokeLast(function () {
      
      // do this in the next runloop to keep from confusing the collectionview
      for (i = 0; i < nBins; i++) {
        if (that._bins[i].get('length') > 0) {
          x = (i + 0.5) * binWidth;
          y = averageY(that._bins[i]);
          that.addPoint(x, y, i);
        }
      }
    });
  },
  
  addPredictionPointNear: function (x, y) {
    var xMin = this.get('xMin'),
        xMax = this.get('xMax');
        
    if (x < xMin || x > xMax) {
      // refuse to add a point outside of xMin..xMax
      return YES;
    }
    
    var binWidth = this.get('binWidth');
    var binIdx = Math.floor( (x-xMin) / binWidth );

    var point = this._points[binIdx];
    if (point) Smartgraphs.store.destroyRecord(Smartgraphs.DataPoint, point.get('id'));
    
    this.invokeLast(function () {
      // do this in the next runloop to keep from confusing the collectionview
      this.addPoint((binIdx + 0.5) * binWidth, y, binIdx);
    });
  },
  
  addPoint: function (x, y, binIdx) {
    console.log('adding point (%f, %f) in bin %d', x, y, binIdx);
    var point = Smartgraphs.store.createRecord(Smartgraphs.DataPoint, { x: x, y: y, guid: Smartgraphs.DataPoint.nextGuid++ });
    this.pushObject(point);
    Smartgraphs.store.commitRecords();
    this._points[binIdx] = point;
  }
  
}) ;
