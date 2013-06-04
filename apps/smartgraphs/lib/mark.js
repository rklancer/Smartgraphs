// ==========================================================================
// Project:   Smartgraphs.Mark
// Copyright: ©2011 Concord Consortium
// Author:    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  Base class of Mark hierarchy.

  Marks are the model items behind data-representing graphical items to be displayed on the screen: points, lines, etc.

  Marks are managed by DataRepresentation objects and each Mark can be represented by a corresponding view on the graph.

  @extends SC.Object
  @version 0.1
*/
Smartgraphs.Mark = SC.Object.extend(
/** @scope Smartgraphs.Mark.prototype */ {

  dataRepresentation: null

});
