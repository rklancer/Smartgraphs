// ==========================================================================
// Project:   Smartgraphs.Pointset
// Copyright: ©2011 Concord Consortium
// Author:    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

sc_require('lib/graphable_object');

/** @class

  @extends SC.Object
  @version 0.1
*/
Smartgraphs.Pointset = Smartgraphs.GraphableObject.extend(
/** @scope Smartgraphs.GraphableObject.prototype */ {

  isSelectable: NO,

  // an array of Smartgraphs.Point objects
  points: null,

  // it is a guarantee that this path resolves to a datadef when the pointset is inited
  datadef: SC.outlet('dataRepresentation.sampleset.datadef'),

  selectedXBinding: '.datadef.selectedX',
  selectedYBinding: '.datadef.selectedY',

  // TODO: points could easily be indexed for fast lookup
  selection: function (key, value) {
    var point,
        selectedPoint,
        selectedX,
        selectedY,
        points,
        foundPoint,
        ret;

    if (value !== undefined) {
      point = value.toArray().get('firstObject');
      this.set('selectedX', point ? point.get('x') : null);
      this.set('selectedY', point ? point.get('y') : null);
      this._selection = value;
      return this;
    }
    else {
      selectedX = this.get('selectedX');
      selectedY = this.get('selectedY');

      // no points are selected, and the cached SelectionSet is also empty
      if (selectedX === null && selectedY === null && this._selection && this._selection.get('length') === 0) {
        return this._selection;
      }

      // one (x,y) point is selected, and the cached SelectionSet contains that point
      selectedPoint = this._selection && this._selection.toArray().get('firstObject');
      if (selectedPoint && this._selection.get('length') === 1 && selectedPoint.get('x') === selectedX && selectedPoint.get('y') === selectedY) {
        return this._selection;
      }

      // if all else fails, create a new SelectionSet to represent the updated (x,y) values
      this._selection = SC.SelectionSet.create();
      points = this.get('points') || [];
      foundPoint = points.find(function (point) {
        return point.get('x') === selectedX && point.get('y') === selectedY;
      });
      if (foundPoint) this._selection.addObject(foundPoint);
      return this._selection;
    }
  }.property('selectedX', 'selectedY', 'points'),

  viewClass: function () {
    return Smartgraphs.PointsetView;
  }.property().cacheable()

});
