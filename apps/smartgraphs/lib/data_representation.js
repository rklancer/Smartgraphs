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

    this.set('pointStyle', options['point-type']);
    this.set('lineStyle', options['line-type']);

    if (options['line-type'] === "connected") {
      line = Smartgraphs.ConnectedLine.create({
        dataRepresentation: this
      });
      this.set('line', line);
      graphableObjects.push(line);

      pointset = Smartgraphs.Pointset.create({
        dataRepresentation: this
      });
      this.set('pointset', pointset);
      if (options['point-type'] !== "none") {
        graphableObjects.push(pointset);
      }
    }
    else {
      pointset = Smartgraphs.Pointset.create({
        dataRepresentation: this
      });
      this.set('pointset', pointset);
      if (options['point-type'] !== "none") {
        graphableObjects.push(pointset);
      }
    }

    if (options['color']) {
      this.set('color', options['color']);
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

  datadef: SC.outlet('sampleset.datadef'),
  xUnits:  SC.outlet('sampleset.datadef.xUnits'),
  yUnits:  SC.outlet('sampleset.datadef.yUnits'),
  name:    SC.outlet('sampleset.datadef.name'),
  points:  SC.outlet('sampleset.points'),

  // some representative options
  color: null,
  isDimmed: NO,
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
    var samplePoints = this.getPath('sampleset.points') || [],    // FIXME I don't know why this.get('points') doesn't work
        pointset     = this.get('pointset'),
        line         = this.get('line');

    if (pointset) {
      pointset.set('points', samplePoints.map(function (pair) {
        return Smartgraphs.Point.create({ x: pair[0], y: pair[1] });
      }));
    }

    if (line) {
      line.set('points', samplePoints);
    }
  },

  // Display single point irrespective of point present in datadef or not.
  showSinglePoint: function (x, y) {
    if (this.get('graphableObjects')) {
      if (!this.get('graphableObjects').contains(this.get('pointset'))) {
        var temp = [];
        temp.push.apply(temp, this.get('graphableObjects'));
        temp.push(this.get('pointset'));
        this.set('graphableObjects', temp);
      }
    }
    var pointsetPoints = this.getPath('pointset.points');
    var pointsetPoint = Smartgraphs.Point.create({x: x, y: y});
    if (pointsetPoints) {
      pointsetPoints.replace(0, 1, [pointsetPoint]);
    }
    else {
      var pointset = this.get('pointset');
      pointset.set('points', [pointsetPoint]);
    }
  },

  getNearestPoint: function (point) {
    if (this.get('lineStyle') === "connected" && this.get('pointStyle') === "none") {
      var linePoints = this.getPath('line.points');
      if (linePoints) {
        var pointsetPoint = null;
        var lineSnapDistance = this.getPath('datadef.lineSnapDistance');
        var minDistance = lineSnapDistance;
       // Loop to get nearest datadef point from click within lineSnapDistance
        for (var i = linePoints.get('length') - 1; i >= 0; i--) {
          var linePoint = { x: linePoints[i][0], y: linePoints[i][1] };
          var distance = Math.sqrt(Math.pow(linePoint.x - point.x, 2) + Math.pow(linePoint.y - point.y, 2));
          if (distance < lineSnapDistance) {
            if (distance < minDistance) {
              minDistance = distance;
              pointsetPoint = linePoint;
            }
          }
        }
        return pointsetPoint;
      }
    }
    return null;
  }

});
