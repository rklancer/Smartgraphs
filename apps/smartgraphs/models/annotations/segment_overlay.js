// ==========================================================================
// Project:   Smartgraphs.SegmentOverlay
// Copyright: ©2011 Concord Consortium
// Author:    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

sc_require('models/annotation');
sc_require('models/tag');
sc_require('views/segment_overlay');

/** @class

  Draw a highlighting "overlay" over a contiguous segment, defined by the region [x1, x2], of a particular dataset

  @extends Smartgraphs.Annotation
  @version 0.1
*/

Smartgraphs.SegmentOverlay = Smartgraphs.Annotation.extend(
/** @scope Smartgraphs.SegmentOverlay.prototype */ {

  /**
    We are an 'overlay annotation' (put in front of data views, but transparent to mouse events)
  */
  isOverlayAnnotation: true,

  /**
    Name of the datadef to overlay
  */
  datadefName: SC.Record.attr(String),

  /**
    One of the two x-values that define the region to highlight
  */
  x1: Smartgraphs.Tag.valueFrom('tag1', 'x', 'x1Record'),

  /**
    One of the two x-values that define the region to highlight
  */
  x2: Smartgraphs.Tag.valueFrom('tag2', 'x', 'x2Record'),

  /**
    Optional tagged point that defines the region to highlight
  */
  tag1: SC.Record.toOne('Smartgraphs.Tag'),

  /**
    Optional tagged point that defines the region to highlight
  */
  tag2: SC.Record.toOne('Smartgraphs.Tag'),

  /**
    Optional explicit value for x1
  */
  x1Record: SC.Record.attr(Number),

  /**
    Optional explicit value for x2
  */
  x2Record: SC.Record.attr(Number),

  /**
    If true, the segment is considered to be [-Infinity, x1] (note -Infinity can't be serialized directly)
  */
  isUnboundedLeft: SC.Record.attr(Boolean, { defaultValue: false }),

  /**
    If true, the segment is considered to be [x1, Infinity] (note Infinity can't be serialized directly)
  */
  isUnboundedRight: SC.Record.attr(Boolean, { defaultValue: false }),

  /**
    Color of the segment overlay
  */
  color: SC.Record.attr(String),

  /**
    Computed property that represents the leftmost x-value of the segment (possibly -Infinity)
  */
  xMin: function () {
    var x1 = this.get('x1'),
        x2 = this.get('x2');

    if (this.get('isUnboundedLeft'))  return -Infinity;
    if (this.get('isUnboundedRight')) return x1;

    // if either x1 or x2 is null/undefined, exclude every point from the range
    if (SC.none(x1) || SC.none(x2)) return Infinity;

    return Math.min(x1, x2);
  }.property('x1', 'x2', 'isUnboundedLeft', 'isUnboundedRight'),

  /**
    Computed property that represents the rightmost x-value of the segment (possibly Infinity)
  */
  xMax: function () {
    var x1 = this.get('x1'),
        x2 = this.get('x2');

    if (this.get('isUnboundedLeft'))  return x1;
    if (this.get('isUnboundedRight')) return Infinity;

    // if either x1 or x2 is null/undefined, exclude every point from range
    if (SC.none(x1) || SC.none(x2)) return Infinity;

    return Math.max(x1, x2);      // undefined behavior if either of these two is undefined
  }.property('x1', 'x2', 'isUnboundedLeft', 'isUnboundedRight')

});

// let the graph view know how to instantiate a view class to display this item
Smartgraphs.SegmentOverlay.viewClass = Smartgraphs.SegmentOverlayView;
