// ==========================================================================
// Project:   Smartgraphs.Arrow
// Copyright: ©2010-2011 Concord Consortium
// Author:    Parker Morse <pmorse@cantinaconsulting.com>
// Author:    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

sc_require('models/tag');
sc_require('models/annotation');
sc_require('views/arrow');

/** @class

  An Arrow annotation to be drawn on the graph. In this base class, the arrow's end points are specified by 2 (x,y)
  pairs. Semantically meaningful subclasses may choose to define additional properties (such as DataPoints being
  pointed at, or between which arrows should be drawn) and derive (x1, y1) and (x2, y2) from those properties.

  @extends Smartgraphs.Annotation
  @version 0.1
*/
Smartgraphs.Arrow = Smartgraphs.Annotation.extend(
/** @scope Smartgraphs.Arrow.prototype */ {

  // these are computed properties
  x1: null,
  y1: null,
  x2: null,
  y2: null,

  /**
    x-coordinate of start point

    @property {Number}
  */
  x1Record: SC.Record.attr(Number),

  /**
    y-coordinate of start point

    @property {Number}
  */
  y1Record: SC.Record.attr(Number),

  /**
    x-coordinate of end point

    @property {Number}
  */
  x2Record: SC.Record.attr(Number),

  /**
    y-coordinate of end point

    @property {Number}
  */
  y2Record: SC.Record.attr(Number),

  p1Tag: SC.Record.toOne('Smartgraphs.Tag'),

  p2Tag: SC.Record.toOne('Smartgraphs.Tag'),

  p1x: Smartgraphs.Tag.valueFrom('p1Tag', 'x', 'x1Record'),

  p1y: Smartgraphs.Tag.valueFrom('p1Tag', 'y', 'y1Record'),

  p2x: Smartgraphs.Tag.valueFrom('p2Tag', 'x', 'x2Record'),

  p2y: Smartgraphs.Tag.valueFrom('p2Tag', 'y', 'y2Record'),


  /**
    The optional text label for the arrow.

    @property {String}
  */
  label: SC.Record.attr(String),


  init: function () {
    sc_super();
    this._startAndEndDidChange();
  },

  _startAndEndDidChange: function () {
    var p1x = this.get('p1x'),
        p1y = this.get('p1y'),
        p2x = this.get('p2x'),
        p2y = this.get('p2y'),
        coords;

    if (SC.none(p1x) || SC.none(p1y) || SC.none(p2x) || SC.none(p2y)) return;

    coords = this.calculateCoordinatesFromPoints(p1x, p1y, p2x, p2y);

    this.setIfChanged('x1', coords.x1);
    this.setIfChanged('y1', coords.y1);
    this.setIfChanged('x2', coords.x2);
    this.setIfChanged('y2', coords.y2);
  }.observes('p1x', 'p1y', 'p2x', 'p2y'),

  /**
    Calculate (x1, y1) and (x2, y2) from (p1, p2). The base class implementation sets x1 = p1.x, y1 = p1.y, etc, in
    order to draw an arrow that starts and p1 and ends at p2. Subclasses can override this method to draw an arrow
    with different semantics.
  */
  calculateCoordinatesFromPoints: function (p1x, p1y, p2x, p2y) {
    return {
      x1: p1x,
      y1: p1y,
      x2: p2x,
      y2: p2y
    };
  }

}) ;

// let the graph view know how to instantiate a view class to display this item
Smartgraphs.Arrow.viewClass = Smartgraphs.ArrowView;

Smartgraphs.Arrow.NO_ARROW_HEADS = 0;
Smartgraphs.Arrow.ARROW_HEAD_AT_START = 1;
Smartgraphs.Arrow.ARROW_HEAD_AT_END = 2;
Smartgraphs.Arrow.ARROW_HEAD_AT_START_AND_END = 3;
