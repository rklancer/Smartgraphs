// ==========================================================================
// Project:   Smartgraphs.TrivialSampleset
// Copyright: ©2011 Concord Consortium
// Author:    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

sc_require('lib/sampleset');

/** @class

  A TrivialSampleset just mirrors every item in the 'points' array of a UnsortedDataPoints Datadef

  @extends Smartgraphs.Sampleset
  @version 0.1
*/
Smartgraphs.TrivialSampleset = Smartgraphs.Sampleset.extend(
/** @scope Smartgraphs.TrivialSampleset.prototype */ {

  didSetDatadef: function () {
    var datadef = this.get('datadef');
    datadef.addObserver('points.[]', this, this._pointsDidChange);
    this._pointsDidChange();
  },
  
  // TODO: optionally replace this with various callbacks from the Datadef
  _pointsDidChange: function () {
    var sourcePoints = this.getPath('datadef.points') || [];
    this.set('points', sourcePoints.map( function (pair) { return pair.copy(); } ));
  }

});
