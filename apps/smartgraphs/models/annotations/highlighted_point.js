// ==========================================================================
// Project:   Smartgraphs.HighlightedPoint
// Copyright: ©2011 Concord Consortium
// Author:    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

sc_require('models/annotation');
sc_require('views/circled_point');

/** @class

  A 'modifier' annotation that highlights or 'calls out' a particular point on a graph or table by instructing it to
  draw itself with a different color.

  @extends Smartgraphs.Annotation
  @version 0.1
*/

Smartgraphs.HighlightedPoint = Smartgraphs.Annotation.extend(
/** @scope Smartgraphs.CircledPoint.prototype */ {

  isModifierAnnotation: YES,

  datadefName: SC.Record.attr(String),

  x: Smartgraphs.Tag.valueFrom('tag', 'x', 'xRecord'),

  y: Smartgraphs.Tag.valueFrom('tag', 'y', 'yRecord'),

  tag: SC.Record.toOne('Smartgraphs.Tag'),

  /**
    x-value of the point to highlight, if explicitly specified by author
  */
  xRecord: SC.Record.attr(Number),

  /**
    y-value of the point to highlight, if explicitly specified by author
  */
  yRecord: SC.Record.attr(Number),

  /**
    Color that the point should use to draw itself
  */
  color: SC.Record.attr(String)

});

