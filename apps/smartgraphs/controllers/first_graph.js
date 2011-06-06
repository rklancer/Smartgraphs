// ==========================================================================
// Project:   Smartgraphs.firstGraphController
// Copyright: ©2010 Concord Consortium
// Author:    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

sc_require('controllers/graph');

/** @class

  GraphController for the 'first' graph being displayed. If a split pane is being displayed, and the top pane is
  showing a graph, then this controller represents this graph. (If that pane is not showing a graph, this 
  controller should not have an open graph.) If a single pane is being displayed and is showing a graph, this
  controller represents that graph.

  @extends Smartgraphs.GraphController
*/
Smartgraphs.firstGraphController = Smartgraphs.GraphController.create(
/** @scope Smartgraphs.firstGraphController.prototype */ {
});
