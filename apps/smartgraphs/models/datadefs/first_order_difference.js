// ==========================================================================
// Project:   Smartgraphs.FirstOrderDifference
// Copyright: ©2011 Concord Consortium
// Author:    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

sc_require('models/datadefs/unordered_data_points');

/** @class

  The FirstOrderDifference data definition class defines a dataset that is approximates a derivative by a simple
  first order difference.

  @extends Smartgraphs.UnorderedDataPoints
  @version 0.1
*/
Smartgraphs.FirstOrderDifference = Smartgraphs.UnorderedDataPoints.extend(
/** @scope Smartgraphs.FirstOrderDifference.prototype */ {

  init: function () {
    this._sourcePointsDidChange();
  },

  /**
    @property {Smartgraphs.UnorderedDataPoints}

    The Datadef we are a derivative of.
  */
  source: SC.Record.toOne('Smartgraphs.UnorderedDataPoints'),

  /**
    @property {Number}

    Number of samples in the rectangular window used to smooth the first order difference calculation. Here we assume
    that we don't care to use a fancy window function like a Hamming window.
  */
  windowLength: SC.Record.attr(Number, { defaultValue: 1 }),

  /**
    @property {Array[]}

    Array of datapoints that make up this derived dataset. The length of the 'points' array is 1 less than the length
    of the 'points' array of the 'source' Datadef, and each point is calculated like this:

      points[i][0] = (source.points[i][0] - source.points[i-1][0]) / (source.points[i][1] - source.points[i-1][1])
      points[i][1] = source.points[i][1]

      i.e.,

      x_i = (x_source_i - x_source_i-1) / (y_source_i - y_source_i-1)
      y_i = x_source_i
  */
  points: null,

  // Note this implementation will change as we evolve an efficient update API for communication between
  // Datadefs, Samplesets, and DataRepresentations

  sourcePointsBinding: '*source.points',
  sourcePointsBindingDefault: SC.Binding.oneWay(),

  _sourcePointsDidChange: function () {
    var sourcePoints = (this.get('sourcePoints') || []).copy(),
        windowedPoints,
        points,
        windowLength = this.get('windowLength'),
        slidingWindow = 0;

    // something to catch in a test: we shouldn't accidentally copy the sourcePoints of the UnorderedDataPoints
    sourcePoints.sort( function (pair1, pair2) { return pair1[0] - pair2[0]; } );

    windowedPoints = sourcePoints.map( function (pair, index, points) {
      slidingWindow += pair[1];

      if (0 <= index && index < windowLength) {
        return [pair[0], slidingWindow / (index + 1)];
      }
      else {
        // index >= windowLength
        slidingWindow -= sourcePoints[index-windowLength][1];
        return [pair[0], slidingWindow / windowLength];
      }
    });

    points = windowedPoints.map( function (pair, index, points) {
      return index > 0 ? [pair[0], (pair[1] - points[index-1][1]) / (pair[0] - points[index-1][0])] : null;
    });
    points.shift();
    this.set('points', points);
  }.observes('*sourcePoints.[]')

});
