// ==========================================================================
// Project:   Smartgraphs.selectedPointsController
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/

// TODO!!!! Separate out 'prediction graph' functionality like _cleanupData and other functionality like
// addSensorPoint()

Smartgraphs.selectedPointsController = SC.ArrayController.create(
/** @scope Smartgraphs.selectedPointsController.prototype */ {

  contentBinding: 'Smartgraphs.selectedSeriesController.points',
  xMinBinding: 'Smartgraphs.selectedSeriesController.xMin',
  xMaxBinding: 'Smartgraphs.selectedSeriesController.xMax',
  nBinsBinding: 'Smartgraphs.selectedSeriesController.nBins',
  
  _points: [],
  
  contentDidChange: function () {
    this.invokeOnce(this._cleanupData);
  }.observes('content'),
  
  binWidth: function () {
    return ((this.get('xMax') - this.get('xMin')) / this.get('nBins'));
  }.property('xMin', 'xMax', 'nBins').cacheable(),
  
  _cleanupData: function () {
    this._points = [];
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
          that.addPredictionPoint(x, y, i);
        }
      }
    });
  },
  
  addPredictionPoint: function (x, y, binIdx) {
    var point = Smartgraphs.store.createRecord(Smartgraphs.DataPoint, { x: x, y: y, guid: Smartgraphs.DataPoint.nextGuid++ });
    this.pushObject(point);
    Smartgraphs.store.commitRecords();
    this._points[binIdx] = point;
  },
  
  _inputStarted: NO,
  _lastX: null,
  _lastY: null,
  
  addOrUpdatePredictionPoint: function (x, y) {
    var xMin = this.get('xMin');
    var binWidth = this.get('binWidth');
    var binIdx = Math.floor( (x-xMin) / binWidth );

    var point = this._points[binIdx];
    if (point) Smartgraphs.store.destroyRecord(Smartgraphs.DataPoint, point.get('id'));
    
    x = (binIdx + 0.5)*binWidth;
    this.invokeLast(function () {
      // do this in the next runloop to keep from confusing the collectionview
      this.addPredictionPoint(x, y, binIdx);
    });
  },
  
  startGraphInputAt: function (x, y) {
    var xMin = this.get('xMin'),
        xMax = this.get('xMax');
        
    if (x < xMin || x > xMax) {
      // refuse to add a point outside of xMin..xMax
      return YES;
    }
    
    this._lastX = x;
    this._lastY = y;
    this._inputStarted = YES;
    
    this.addOrUpdatePredictionPoint(x, y);
    return YES;
  },
  
  continueGraphInputAt: function (x, y) {
    if (!this._inputStarted) {
      this.startGraphInputAt(x, y);
      return YES;
    }
    
    // bulk add prediction points between where we were and where we are now.
    
    var xMin = this.get('xMin'),
        xMax = this.get('xMax'),
        binWidth = this.get('binWidth'),
        nBins = this.get('nBins'),
        newIdx = Math.floor( (x-xMin) / binWidth ),
        oldIdx = Math.floor( (this._lastX-xMin) / binWidth );
    
    var yStart, dy;
    var startIdx, endIdx, binIdx;
    var nSteps = Math.abs(oldIdx-newIdx)+1;
    
    var pointsToAdd = [];
    
    if (newIdx < oldIdx) {
      startIdx = newIdx;
      endIdx = oldIdx;
      yStart = y;
      dy = (this._lastY - y) / nSteps;
    }
    else {
      startIdx = oldIdx;
      endIdx = newIdx;
      yStart = this._lastY;
      dy = (y - this._lastY) / nSteps;
    }
    
    for (var i = 0; i < nSteps; i++) {
      binIdx = i+startIdx;
      
      if (binIdx === 0) {
        // beginning wall
        this._lastX = 0.5*binWidth;
        this._lastY = yStart + i*dy;
      }
      if (binIdx === (nBins-1)) {
        // end wall
        this._lastX = (nBins-0.5)*binWidth;
        this._lastY = yStart + i*dy;
      }
      
      if (0 <= binIdx && binIdx < nBins) {
        pointsToAdd.push({x: (binIdx+0.5)*binWidth, y: yStart + i*dy, binIdx: binIdx });
        var point = this._points[binIdx];
        if (point) Smartgraphs.store.destroyRecord(Smartgraphs.DataPoint, point.get('id'));
      } 
    }
    
    // and actually add the points
    this.invokeLast( function () {
      for (var i = 0, ii = pointsToAdd.get('length'); i < ii; i++) {
        var toAdd = pointsToAdd[i];
        this.addPredictionPoint(toAdd.x, toAdd.y, toAdd.binIdx);
      }
    }); 
    
    // and don't forget to remember lastY and lastX
    this._lastX = x;
    this._lastY = y;
  },
  
  endGraphInputAt: function (x, y) {
    this._inputStarted = NO;
    this._lastX = null;
    this._lastY = null;
    
    var xMin = this.get('xMin'),
        xMax = this.get('xMax');
        
    if (x < xMin || x > xMax) {
      // refuse to add a point outside of xMin..xMax
      return YES;
    }
    
    this.addOrUpdatePredictionPoint(x, y);
    return YES;
  },
  
  addSensorPoint: function (x, y) {
    var point = Smartgraphs.store.createRecord(Smartgraphs.DataPoint, { x: x, y: y, guid: Smartgraphs.DataPoint.nextGuid++ });
    this.pushObject(point);
    Smartgraphs.store.commitRecords();
  }
  
}) ;
