// ==========================================================================
// Project:   Smartgraphs.HighlightedPoint
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

sc_require('models/annotation');
sc_require('views/highlighted_point');

/** @class

  An annotation that highlights or 'calls out' a particular point on a graph. This model will eventually encompass 
  several visual styles for the highlight. Currently it displays a circle around the point.
  
  It is conceptually distinct from the highlight applied by default to the 'selected' point of a DatasetView.

  @extends Smartgraphs.Annotation
  @version 0.1
*/

Smartgraphs.HighlightedPoint = Smartgraphs.Annotation.extend(
/** @scope Smartgraphs.HighlightedPoint.prototype */
{
  
  /**
    The point being highlighted.
    
    @property {Smartgraphs.DataPoint}
  */
  point: SC.Record.toOne('Smartgraphs.DataPoint'),
  
  viewClass: function () {
    return this.get('displayStyle') === Smartgraphs.HighlightedPoint.HIGHLIGHT_POINT_AND_DIM_BACKGROUND_STYLE ? null : Smartgraphs.HighlightedPointView;
  }.property(),
  
  // TODO: make "targetObject: 'point.dataset'" work 
  // we may dim the dataset the point is part of
  // Avoid using a binding which could result in a 'dataset' value out of sync with the latest 'point' value
  dataset: function () {
    return this.getPath('point.dataset');
  }.property('point').cacheable(),
  
  propertyOverrides: function () {
    if (this.get('displayStyle') === Smartgraphs.HighlightedPoint.HIGHLIGHT_POINT_AND_DIM_BACKGROUND_STYLE) {
      return [
        { targetObject: 'dataset',        // (1) find the view corresponding to this.dataset on graph or table which contains this annotation
          targetProperty: 'color',        // and (2) bind the 'color' property of that view
          sourceProperty: 'datasetColor'  // (3) to the 'pointColor' property of this annotation
        },
        { targetObject: 'point',          // (4) find the view corresponding to this.point on the graph or table which contains this annotation
          targetProperty: 'color',        // and (5) bind the 'color' property of that view
          sourceProperty: 'pointColor'    // (6) to the 'pointColor' property of this annotation
        }
      ];
    }
  }.property('displayStyle').cacheable()

});

Smartgraphs.HighlightedPoint.CIRCLE_STYLE = 'circle-point';
Smartgraphs.HighlightedPoint.HIGHLIGHT_POINT_AND_DIM_BACKGROUND_STYLE = 'highlight-point-and-dim-background';

// let the graph view know how to instantiate a view class to display this item
Smartgraphs.HighlightedPoint.viewClass = Smartgraphs.HighlightedPointView;
