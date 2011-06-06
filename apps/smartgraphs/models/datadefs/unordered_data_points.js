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
  
  /**
    @property {Array[]}
    
    Array of datapoints that make up this dataset. Each item in the array should be an array of length 2 corresponding
    in the obvious way to the (x, y) values of a single datapoint. 
    
    The order of the points in the 'points' array is not significant.
  */
  points: SC.Record.attr(Array),
  
  /**
    Returns a DataRepresentation to represent this data. The default behavior is to create a new TrivialSampleset and 
    return a DataRepresentation requested from the TrivialSampleSet by passing the options hash to it.
    
    @param options {Object}
      Hash of options to be respected when returning the DataRepresentations (the options are not yet well defined.)
      
    @returns {Smartgraphs.DataRepresentation}
  */
  getNewRepresentation: function (options) {
    var sampleset = Smartgraphs.TrivialSampleset.create();
    sampleset.set('datadef', this);
    return sampleset.getNewRepresentation(options);
  }
  
});