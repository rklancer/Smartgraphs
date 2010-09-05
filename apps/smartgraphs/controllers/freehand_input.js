// ==========================================================================
// Project:   Smartgraphs.freehandInputController
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
Smartgraphs.freehandInputController = SC.ObjectController.create(
/** @scope Smartgraphs.freehandInputController.prototype */ {
  
  _inputStarted: NO,

  register: function (controller) {
    // guard against accidentally swapping the input controller during freehand input. Guarantee that a controller
    // will always receive endFreehandInput after receiving startFreehandInput
  
    if (this._inputStarted) return NO;
    
    if (controller && controller.get('selectedSeries')) {      
      this._graphController = controller;
      return YES;
    }
    return NO;
  },
  
  startInput: function () {
    var series = this._graphController ? this._graphController.get('selectedSeries') : NO;
    if (!series) return NO;

    this._inputStarted = YES;
    this._series = series;
    this._graphController.startFreehandInput();

    // setup controller the 'old' way
    this.set('xMin', this._graphController.getPath('axes.xMin'));
    this.set('xMax', this._graphController.getPath('axes.xMax'));      
    this._cleanupData();

    this._graphController.get('inputQueue').addObserver('[]', this, this.inputObserver);
    return YES;
  },
  
  endInput: function () {
    this.inputObserver();
    this._graphController.get('inputQueue').removeObserver('[]', this, this.inputObserver);
    this._graphController.endFreehandInput();
    this._graphController = null;
    this._series = null;
    this._inputStarted = NO;
  },
  
  inputObserver: function () {
    var input, 
        queue = this._graphController.get('inputQueue');

    while ((input = queue.shiftObject())) {
      if (input.type === this.START) this.startAt(input.x, input.y);
      else if (input.type === this.CONTINUE) this.continueAt(input.x, input.y);
      else if (input.type === this.END) this.endAt(input.x, input.y);
    }
  },
  
  /********************************************************************
  
    Copied from old selectedSeriesController, selectedPointsController. 
    
    Refactor!

  *********************************************************************/
  
  nBins: 50,
  xMin: null,
  xMax: null,
  
  _points: [],
  
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
      var point = this._series.get('points').objectAt(i);
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
    var point = Smartgraphs.store.createRecord(Smartgraphs.DataPoint, { x: x, y: y, guid: Smartgraphs.getNextGuid() });
    this._series.get('points').pushObject(point);
    Smartgraphs.store.commitRecords();
    this._points[binIdx] = point;
  },
  
  _strokeStarted: NO,
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
  
  startAt: function (x, y) {
    var xMin = this.get('xMin'),
        xMax = this.get('xMax');
        
    if (x < xMin || x > xMax) {
      // refuse to add a point outside of xMin..xMax
      return YES;
    }
    
    this._lastX = x;
    this._lastY = y;
    this._strokeStarted = YES;
    
    this.addOrUpdatePredictionPoint(x, y);
    return YES;
  },
  
  continueAt: function (x, y) {
    if (!this._strokeStarted) {
      this.startAt(x, y);
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
  
  endAt: function (x, y) {
    this._strokeStarted = NO;
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
  } 

}) ;

Smartgraphs.freehandInputController.START = 1;
Smartgraphs.freehandInputController.CONTINUE = 2;
Smartgraphs.freehandInputController.END = 3;
