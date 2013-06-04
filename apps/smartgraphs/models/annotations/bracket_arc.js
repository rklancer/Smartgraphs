// ==========================================================================
// Project:   Smartgraphs.BracketArc
// Copyright: ©2010-2011 Concord Consortium
// Author:    Parker Morse <pmorse@cantinaconsulting.com>
// Author:    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

sc_require('models/tag');
sc_require('models/annotation');
sc_require('views/bracket_arc');

/** @class

  A BracketArc is an annotation which creates an arc, with arrowheads at both ends, between two designated items
  displayed on a table.

  Although the model has "start" and "end" points, the bracket itself is not directional,
  i.e. it has arrowheads at both ends.

  @extends Smartgraphs.Annotation
  @version 0.1
*/
Smartgraphs.BracketArc = Smartgraphs.Annotation.extend(
/** @scope Smartgraphs.BracketArc.prototype */ {

  datadefName: SC.Record.attr(String),

  datadef: function () {
    return Smartgraphs.activityObjectsController.findDatadef(this.get('datadefName'));
  }.property('datadefName').cacheable(),

  /**
    The index in the table of the point the bracket should start at.

    @property {Number}
  */
  item1Index: SC.Record.attr(Number),

  /**
    The index in the table of the point the bracket should end at.

    @property {Number}
  */
  item2Index: SC.Record.attr(Number),

  /**
    Whether the arc is to be displayed to the left or right of the table columns it points to.

    @property {Boolean}
  */
  isLeftOfColumn: SC.Record.attr(Boolean),

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

  init: function () {
    sc_super();
    this._pointIndicesDidChange();
  },
  
  _pointIndicesDidChange: function () {
    var p1x = this.get('p1x'),
        p1y = this.get('p1y'),
        p2x = this.get('p2x'),
        p2y = this.get('p2y'),
        indices;

    if (SC.none(this.get('datadef'))) return;
    if (SC.none(p1x) || SC.none(p1y) || SC.none(p2x) || SC.none(p2y)) return;

    indices = this.calculateIndicesFromPoints(p1x, p1y, p2x, p2y);

    this.setIfChanged('item1Index', indices.item1Index);
    this.setIfChanged('item2Index', indices.item2Index);
  }.observes('*datadef.points.[]', 'p1x', 'p1y', 'p2x', 'p2y'),

  /**
    Calculate item1Index and item2Index from (p1, p2). The base class implementation sets item1Index to the index of
    p1 in the 'points' array of the dataset containing p1 and p2; and sets item2Index to the index of p2.
  */
  calculateIndicesFromPoints: function (p1x, p1y, p2x, p2y) {
    var points = this.getPath('datadef.points') || [],
        i,
        len,
        point,
        item1Index = -1,
        item2Index = -1;

    points = points.map( function (pair) { return pair.copy(); } ).sort( function (pair1, pair2) { return pair1[0] - pair2[0]; } );

    for (i = 0, len = points.get('length'); i < len; i++) {
      point = points.objectAt(i);
      if (point[0] === p1x && point[1] === p1y) item1Index = i;
      if (point[0] === p2x && point[1] === p2y) item2Index = i;
    }

    return {
      item1Index: item1Index,
      item2Index: item2Index
    };
  }

});

// let the graph view know how to instantiate a view class to display this item
Smartgraphs.BracketArc.viewClass = Smartgraphs.BracketArcView;
