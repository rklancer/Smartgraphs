// ==========================================================================
// Project:   Smartgraphs.DataPoint
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Smartgraphs.DataPoint = SC.Record.extend(
/** @scope Smartgraphs.DataPoint.prototype */ {

  x: SC.Record.attr(Number),
  y: SC.Record.attr(Number),
  series: SC.Record.toOne('Smartgraphs.Dataset', { inverse: 'points' } ),
  
  xRounded: function () {
    return Math.round(this.get('x') * 100) / 100;
  }.property('x').cacheable(),
  
  yRounded: function () {
    return Math.round(this.get('y') * 100) / 100;
  }.property('y').cacheable()

}) ;
