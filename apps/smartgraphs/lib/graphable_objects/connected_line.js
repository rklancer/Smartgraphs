// ==========================================================================
// Project:   Smartgraphs.ConnectedLine
// Copyright: ©2011 Concord Consortium
// Author:    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

sc_require('lib/graphable_object');

/** @class

  @extends SC.Object
  @version 0.1
*/
Smartgraphs.ConnectedLine = Smartgraphs.GraphableObject.extend(
/** @scope Smartgraphs.ConnectedLine.prototype */ {

  // an array of [x,y] pairs
  points: null,

  viewClass: function () {
    return Smartgraphs.ConnectedLineView;
  }.property().cacheable()

});
