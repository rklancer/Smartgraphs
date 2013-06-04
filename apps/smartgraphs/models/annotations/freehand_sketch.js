// ==========================================================================
// Project:   Smartgraphs.FreehandSketch
// Copyright: ©2010 Concord Consortium
// Author:   Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

sc_require('models/annotation');
sc_require('views/freehand_sketch');

/** @class

  A 'freehand sketch' annotation drawn on top of the graph.

  A sketch consists of an *ordered* list of x, y pairs.

  @extends SC.Record
  @version 0.1
*/

Smartgraphs.FreehandSketch = Smartgraphs.Annotation.extend(
/** @scope Smartgraphs.FreehandSketch.prototype */ {

  /**
    Ordered array of [x, y] pairs that make up the sketch.

    @property {Array[]}
  */
  points: SC.Record.attr(Array),

  /**
    Color with which the sketch should be drawn.
  */
  color: SC.Record.attr(String),

  clear: function () {
    this.set('points', []);
  },

  addPoint: function (x, y) {
    this.get('points').pushObject([x, y]);
  },

  updateLatestPoint: function (x, y) {
    var points = this.get('points'),
        lastIndex = points.get('length') - 1;

    if (lastIndex >= 0) {
      points.beginPropertyChanges();
      points.popObject();
      points.pushObject([x, y]);
      points.endPropertyChanges();
    }
  }

});

// let the graph view know how to instantiate a view class to display this item
Smartgraphs.FreehandSketch.viewClass = Smartgraphs.FreehandSketchView;
