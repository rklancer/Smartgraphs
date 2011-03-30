// ==========================================================================
// Project:   Smartgraphs.Point
// Copyright: ©2011 Concord Consortium
// Author:    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

sc_require('lib/mark');

/** @class

  Represents a single datapoint to be shown on the screen.
  
  @extends Smartgraphs.Mark
  @version 0.1
*/
Smartgraphs.Point = Smartgraphs.Mark.extend(
/** @scope Smartgraphs.Point.prototype */ {
  
  x: null,
  xRounded: function () {
    return Math.round(this.get('x') * 100) / 100;
  }.property('x').cacheable(),
  
  y: null,
  yRounded: function () {
    return Math.round(this.get('y') * 100) / 100;
  }.property('y').cacheable()
});
