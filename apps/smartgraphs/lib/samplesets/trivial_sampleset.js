// ==========================================================================
// Project:   Smartgraphs.TrivialSampleset
// Copyright: ©2011 Concord Consortium
// Author:    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

sc_require('lib/sampleset');

/** @class

  A TrivialSampleset contains all points from the datadef whose x-value lies between xMin and xMax

  Note that it copies (and sorts) the points from the datadef on every change to the points array, so it is not
  suitable for use with streaming data from a sensor.

  @extends Smartgraphs.Sampleset
  @version 0.1
*/
Smartgraphs.TrivialSampleset = Smartgraphs.Sampleset.extend(
/** @scope Smartgraphs.TrivialSampleset.prototype */ {

  xMin: -Infinity,
  xMax: Infinity,

  didSetDatadef: function () {
    var datadef = this.get('datadef');
    datadef.addObserver('points.[]', this, this._pointsDidChange);
    this._pointsDidChange();
  },

  // TODO: optionally replace this with various callbacks from the Datadef
  _pointsDidChange: function () {
    var sourcePoints = this.getPath('datadef.points') || [],

        points = sourcePoints.filter( function (pair) {
          return this.get('xMin') <= pair[0] && pair[0] <= this.get('xMax');
        }, this).map( function (pair) {
          return pair.copy();
        });

    // sort the points by increasing x-value
    points.sort( function (pair1, pair2) { return pair1[0] - pair2[0]; } );

    this.set('points', points);
  }

});
