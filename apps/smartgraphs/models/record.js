// ==========================================================================
// Project:   Smartgraphs
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================

/** @scope SC.Record.prototype */

/**
  Serialized form of the record suitable for conversion to JSON
  
  @property {Object}
*/
SC.Record.prototype.serialize = function () {
  return this.get('store').readDataHash( this.get('storeKey') );
};