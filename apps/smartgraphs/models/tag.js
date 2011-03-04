// ==========================================================================
// Project:   Smartgraphs.Tag
// Copyright: ©2011 Concord Consortium
// Author:    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Smartgraphs.Tag = SC.Record.extend(
/** @scope Smartgraphs.Tag.prototype */ {
  
  name: SC.Record.attr(String),
  
  point: SC.Record.attr('Smartgraphs.DataPoint')

});

Smartgraphs.Tag.taggedObject = function (prop, direct, tag) {
  return function () {
    if (arguments.length > 1) this.notifyPropertyChange(prop);
    return this.get(direct) || this.getPath(tag+'.point');
  }.property().cacheable().observes(direct, '*'+tag+'.point');
};