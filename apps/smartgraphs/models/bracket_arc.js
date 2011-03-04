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
  
  p1: Smartgraphs.Tag.pointFromTag('p1Record', 'p1Tag'),
  
  p2: Smartgraphs.Tag.pointFromTag('p2Record', 'p2Tag'),
  
  /**
    Optionally, item1Index and item2Index can be derived from 2 DataPoints. This is one of those points.
    
    @property {Smartgraphs.DataPoint}
  */
  p1Record: SC.Record.toOne('Smartgraphs.DataPoint'),
  
  /**
    Optionally, item1Index and item2Index can be derived from 2 DataPoints. This is one of those points.
    
    @property {Smartgraphs.DataPoint}
  */
  p2Record: SC.Record.toOne('Smartgraphs.DataPoint'),

  /**
    Optional Tag object which can be used to indirectly specify p1
    (TODO: change this from a HighlightedPoint to a Tag)

    @property {Smartgraphs.Tag}
  */
  p1Tag: SC.Record.toOne('Smartgraphs.Tag'),

  /**
    Optional Tag object which can be used to indirectly specify p2
    (TODO: change this from a HighlightedPoint to a Tag)

    @property {Smartgraphs.Tag}
  */
  p2Tag: SC.Record.toOne('Smartgraphs.Tag'),
  
  _pointIndicesDidChange: function () {
    var p1 = this.get('p1'),
        p2 = this.get('p2'),
        indices;

    if (!p1 || !p2) return;    
    if (SC.none(p1.get('dataset')) || (p1.get('dataset') !== p2.get('dataset'))) return;
    
    indices = this.calculateIndicesFromPoints(p1, p2);
    
    this.setIfChanged('item1Index', indices.item1Index);
    this.setIfChanged('item2Index', indices.item2Index);
  }.observes('*p1.dataset.points.[]', 'p1', 'p2'),  
  
  /**
    Calculate item1Index and item2Index from (p1, p2). The base class implementation sets item1Index to the index of 
    p1 in the 'points' array of the dataset containing p1 and p2; and sets item2Index to the index of p2.
  */
  calculateIndicesFromPoints: function (p1, p2) {
    var points = p1.getPath('dataset.points') || [];
    
    return {
      item1Index: points.indexOf(p1),
      item2Index: points.indexOf(p2)
    };
  }
  
}) ;

// let the graph view know how to instantiate a view class to display this item
Smartgraphs.BracketArc.viewClass = Smartgraphs.BracketArcView;