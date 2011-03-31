// ==========================================================================
// Project:   Smartgraphs.UnorderedDataPoints
// Copyright: ©2011 Concord Consortium
// Author:    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

sc_require('models/datadef');

/** @class

  The UnorderedDataPoints data definition class defines a dataset that is described by an unordered set of (x,y)
  pairs.
  
  @extends Smartgraphs.Datadef
  @version 0.1
*/
Smartgraphs.UnorderedDataPoints = Smartgraphs.Datadef.extend(
/** @scope Smartgraphs.UnorderedDataPoints.prototype */ {
  
  points: SC.Record.attr(Array),
  
  getNewRepresentation: function (options) {
    var sampleset = Smartgraphs.TrivialSampleset.create();
    sampleset.set('datadef', this);
    return sampleset.getNewRepresentation(options);
  }
  
});