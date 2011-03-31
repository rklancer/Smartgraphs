// ==========================================================================
// Project:   Smartgraphs.Sampleset
// Copyright: ©2011 Concord Consortium
// Author:    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  Base class of Sampleset hierarchy.
  
  Samplesets maintain an updated discretization/sampling of the data in a DataDefinition.
  
  Individual DataRepresentation objects can observe the Sampleset to get a list of Marks to display on the screen.

  @extends SC.Object
  @version 0.1
*/
Smartgraphs.Sampleset = SC.Object.extend(
/** @scope Smartgraphs.Sampleset.prototype */ {
  
  init: function () {
    var datadef;
    
    this._getDatadef = function () {
      return datadef;
    };
    this._setDatadef = function (value) {
      if (datadef !== undefined) throw "Attempt to redefine a Sampleset's datadef";
      datadef = value;
    };
  },
  
  datadef: function (key, value) {
    if (value !== undefined) {
      this._setDatadef(value);
      if (this.didSetDatadef) this.didSetDatadef();
    }
    return this._getDatadef();
  }.property(),
  
  getNewRepresentation: function () {
    var rep = Smartgraphs.DataRepresentation.create();
    rep.set('sampleset', this);
    return rep;
  }

});
