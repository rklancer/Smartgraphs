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
  
  @extends Smartgraphs.Datadef
  @version 0.1
*/
Smartgraphs.FirstOrderDifference = Smartgraphs.UnorderedDataPoints.extend(
/** @scope Smartgraphs.UnorderedDataPoints.prototype */ {
  
  init: function () {
    this._sourcePointsDidChange();
  },
  
  source: SC.Record.toOne('Smartgraphs.UnorderedDataPoints'),

  // override the SC.Record.attr
  points: null,
  
  sourcePointsBinding: '*source.points',
  sourcePointsBindingDefault: SC.Binding.oneWay(),
  
  _sourcePointsDidChange: function () {
    var sourcePoints = (this.get('sourcePoints') || []).copy(),
        points = [];

    // something to catch in a test: we shouldn't accidentally copy the sourcePoints of the UnorderedDataPoints
    sourcePoints.sort( function (pair1, pair2) { return pair1[0] - pair2[0]; } );
    points = sourcePoints.map( function (pair, index, points) {
      return index > 0 ? [pair[0], (pair[1] - points[index-1][1]) / (pair[0] - points[index-1][0])] : null; 
    });
    points.shift();
    this.set('points', points);
  }.observes('*sourcePoints.[]')
  
});