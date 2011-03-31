// ==========================================================================
// Project:   Smartgraphs.DataRepresentation
// Copyright: ©2011 Concord Consortium
// Author:    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  Base class of DataRepresentation hierarchy.
  
  DataRepresentations manage lists of Mark objects, which are updated from a Sampleset

  @extends SC.Object
  @version 0.1
*/
Smartgraphs.DataRepresentation = SC.Object.extend(
/** @scope Smartgraphs.DataRepresentation.prototype */ {
  
  init: function () {
    var options = this.get('options') || {},
        graphableObjects = [],
        pointset,
        line,
        sampleset;
  
    if (options['point-type'] !== "none") {
      pointset = Smartgraphs.Pointset.create({
        dataRepresentation: this
      });
      this.set('pointset', pointset);
      graphableObjects.push(pointset);
    }
    
    if (options['line-type'] === "connected") {
      line = Smartgraphs.ConnectedLine.create({
        dataRepresentation: this
      });
      this.set('line', line);
      graphableObjects.push(line);
    }

    this.set('graphableObjects', graphableObjects);
    
    this._getSampleset = function () {
      return sampleset;
    };
    this._setSampleset = function (value) {
      if (sampleset !== undefined) throw "Attempt to redefine a DataRepresentations's sampleset";
      sampleset = value;
    };
  },

  pointset: null,
  line: null,
  graphableObjects: null,
  
  xUnits: SC.outlet('sampleset.datadef.xUnits'),
  yUnits: SC.outlet('sampleset.datadef.yUnits'),
  name:   SC.outlet('sampleset.datadef.name'),
  
  // some representative options
  color: '#ffffff',
  pointStyle: null,
  lineStyle: null,
  
  sampleset: function (key, value) {
    if (value !== undefined) {
      this._setSampleset(value);
      if (this.didSetSampleset) this.didSetSampleset();
    }
    return this._getSampleset();
  }.property(),
  
  didSetSampleset: function () {
    var sampleset = this.get('sampleset');
    sampleset.addObserver('points.[]', this, this._pointsDidChange);
    this._pointsDidChange();
  },
  
  _pointsDidChange: function () {
    var samplePoints = this.getPath('sampleset.points') || [],
        pointset     = this.get('pointset'),
        line         = this.get('line');
         
    if (pointset) {
      pointset.set('points', samplePoints.map( function (pair) { 
        return Smartgraphs.Point.create( { x: pair[0], y: pair[1] });
      }));
    }
    
    if (line) {
      line.set('points', samplePoints);
    }
  }
  
});
