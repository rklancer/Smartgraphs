// ==========================================================================
// Project:   Smartgraphs.Graph
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Smartgraphs.Graph = Smartgraphs.Annotation.extend(
/** @scope Smartgraphs.Graph.prototype */
{

  url: SC.Record.attr(String),
  primaryKey: 'url',

  /**
    The name the author will use to reference this graph while building the activity.
  */
  name: SC.Record.attr(String),

  /**
    Description of the graph for authors' reference.
  */
  description: SC.Record.attr(String),

  /**
    Title of the graph as seen by learners. Unlike the name (which should be constant, so that authors can
    reference the graph at different locations in the activity) the title can be changed. Authors may even ask users 
    to provide their own title.
  */
  title: SC.Record.attr(String),

  axes: SC.Record.toOne('Smartgraphs.Axes'),
  initialSeries: SC.Record.attr(Array),
  initialAnnotations: SC.Record.attr(Array),
  isPrediction: SC.Record.attr(Boolean, {
    isRequired: NO
  })

});
