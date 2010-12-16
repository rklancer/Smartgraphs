// ==========================================================================
// Project:   Smartgraphs.IndicatingArrow
// Copyright: ©2010 Concord Consortium
// @author    Parker Morse <pmorse@cantinaconsulting.com>
// ==========================================================================
/*globals Smartgraphs */

sc_require('models/annotation');
sc_require('views/indicating_arrow');

/** @class

  Similar to Smartgraphs.HighlightedPoint, this is an Annotation which indicates a particular point
  in a graph or table. Unlike HighlightedPoint, this Annotation does not require a point, but coordinates
  on the graph; in other words, it indicates (points at) anything at a particular point on the graph.

  @extends Smartgraphs.Annotation
  @version 0.1
*/
Smartgraphs.IndicatingArrow = Smartgraphs.Annotation.extend(
/** @scope Smartgraphs.IndicatingArrow.prototype */ {

  /**
    The x-coordinate of the spot the indicating arrow points at.
    
    @property {Number}
  */
  specificX: SC.Record.attr(Number),
  
  /**
    The y-coordinate of the spot the indicating arrow points at.
    
    @property {Number}
  */
  specificY: SC.Record.attr(Number),
  
  /**
    If the arrow indicates not an arbitrary x, y but a specific Smartgraphs.Annotation (e.g. a HighlightedPoint), it will
    adjust its location appropriately with that Annotation's point.
    
    @property {Smartgraphs.Annotation}
  */
  annotation: SC.Record.toOne("Smartgraphs.Annotation"),
  
  /**
    The arrow can also indicate a Smartgraphs.DataPoint which is not associated with a HighlightedPoint annotation.
    
    @property {Smartgraphs.DataPoint}
  */
  dataPoint: SC.Record.toOne("Smartgraphs.DataPoint"),
  
  /**
    The angle from which the indicating arrow points. This is in degrees, with 0 meaning the arrow points
    vertically down, 180 vertically up; 90 should bring the arrow in horizontally from the right and 270
    should bring it in horizontally from the left. The default value of 335 should come in from the upper left (north-west).
    
    @property {Number}
  */
  point_angle: SC.Record.attr(Number, { default_value: 335 }),
  
  /**
    The length of the arrow, from tail to tip, in pixels. Default value is 25.
    
    @property {Number}
  */
  length: SC.Record.attr(Number, { default_value: 25 }),
  
  // The "x" coordinate, depending on what the arrow is given to point at.
  // Returns null if there's not enough information to work from.
  x: function () {
    if (this.specificX) {
      return this.specificX;
    }
    else if (this.dataPoint) {
      return this.dataPoint.get('x');
    }
    else if (this.annotation) {
      if (this.annotation.get('point')) {
        return this.annotation.get('point').get('x');
      }
      else if (this.annotation.get('point1')) {
        return this.annotation.get('point1').get('x');
      }
      else {
        return null;
      }
    }
    else {
      return null;
    }
  },

  // The "y" coordinate, depending on what the arrow is given to point at.
  // Returns null if there's not enough information to work from.
  y: function () {
    if (this.specificY) {
      return this.specificY;
    }
    else if (this.dataPoint) {
      return this.dataPoint.get('y');
    }
    else if (this.annotation) {
      if (this.annotation.get('point')) {
        return this.annotation.get('point').get('y');
      }
      else if (this.annotation.get('point1')) {
        return this.annotation.get('point1').get('y');
      }
      else {
        return null;
      }
    }
    else {
      return null;
    }
  }

}) ;

// let the graph view know how to instantiate a view class to display this item
Smartgraphs.IndicatingArrow.viewClass = Smartgraphs.IndicatingArrowView;
