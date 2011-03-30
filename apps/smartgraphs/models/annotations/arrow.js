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

  /**
    x-coordinate of start point

    @property {Number}
  */
  x1: SC.Record.attr(Number),

  /**
    y-coordinate of start point
    
    @property {Number}
  */
  y1: SC.Record.attr(Number),
  
  /**
    x-coordinate of end point
    
    @property {Number}
  */
  x2: SC.Record.attr(Number),

  /**
    y-coordinate of end point

    @property {Number}
  */
  y2: SC.Record.attr(Number),
  
  // TODO:
  // /**
  //   This bitfield specifies what arrowheads should be drawn:
  //   
  //     no arrowheads (Smartgraphs.Arrow.NO_ARROW_HEADS),
  //     an arrowhead at the start (Smartgraphs.Arrow.ARROW_HEAD_AT_START),
  //     an arrowhead at the end (Smartgraphs.Arrow.ARROW_HEAD_AT_END),
  //     an arrowhead at both ends (Smartgraphs.Arrow.ARROW_HEAD_AT_START_AND_END)
  //   
  //   @property {Number}
  // */    
  // arrowHeadsToShow: SC.Record.attr(Number, {defaultValue: 2}),    // FIXME: what's a good way to set this to Smartgraphs.Arrow.ARROW_HEAD_AT_END? 

  /**
    The optional text label for the arrow.
    
    @property {String}
  */
  label: SC.Record.attr(String),

  p1: Smartgraphs.Tag.pointFromTag('p1Record', 'p1Tag'),
  
  p2: Smartgraphs.Tag.pointFromTag('p2Record', 'p2Tag'),

  /**
    Optionally, (x1, y1) and (x2, y2) can be derived from 2 DataPoints. This is one of those points. Subclasses can 
    override calculateCoordinatesFromPoints() to compute (x1, y1) and (x2, y2) from (p1, p2).
    
    @property {Smartgraphs.DataPoint}
  */
  p1Record: SC.Record.toOne('Smartgraphs.DataPoint'),
  
  /**
    Optionally, (x1, y1) and (x2, y2) can be derived from 2 DataPoints. This is one of those points. Subclasses can 
    override calculateCoordinatesFromPoints () to compute (x1, y1) and (x2, y2) from (p1, p2).
    
    @property {Smartgraphs.DataPoint}
  */
  p2Record: SC.Record.toOne('Smartgraphs.DataPoint'),

  /**
    Optional Tag object which can be used to indirectly specify p1

    @property {Smartgraphs.Tag}
  */
  p1Tag: SC.Record.toOne('Smartgraphs.Tag'),

  /**
    Optional Tag object which can be used to indirectly specify p2

    @property {Smartgraphs.Tag}
  */
  p2Tag: SC.Record.toOne('Smartgraphs.Tag'),
  
  _startAndEndDidChange: function () {
    var p1 = this.get('p1'),
        p2 = this.get('p2'),
        coords;

    if (!p1 || !p2) return;
    
    coords = this.calculateCoordinatesFromPoints(this.get('p1'), this.get('p2'));
    
    this.setIfChanged('x1', coords.x1);
    this.setIfChanged('y1', coords.y1);
    this.setIfChanged('x2', coords.x2);
    this.setIfChanged('y2', coords.y2);
  }.observes('*p1.x', '*p1.y', '*p2.x', '*p2.y'),
  
  /**
    Calculate (x1, y1) and (x2, y2) from (p1, p2). The base class implementation sets x1 = p1.x, y1 = p1.y, etc, in 
    order to draw an arrow that starts and p1 and ends at p2. Subclasses can override this method to draw an arrow
    with different semantics.
  */  
  calculateCoordinatesFromPoints: function (p1, p2) {
    return {
      x1: p1.get('x'),
      y1: p1.get('y'),
      x2: p2.get('x'),
      y2: p2.get('y')
    };
  }
  
}) ;

// let the graph view know how to instantiate a view class to display this item
Smartgraphs.Arrow.viewClass = Smartgraphs.ArrowView;

Smartgraphs.Arrow.NO_ARROW_HEADS = 0;
Smartgraphs.Arrow.ARROW_HEAD_AT_START = 1;
Smartgraphs.Arrow.ARROW_HEAD_AT_END = 2;
Smartgraphs.Arrow.ARROW_HEAD_AT_START_AND_END = 3;
