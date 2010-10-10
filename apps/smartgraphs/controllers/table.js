// ==========================================================================
// Project:   Smartgraphs.tableController
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
Smartgraphs.TableController = SC.ObjectController.extend(
/** @scope Smartgraphs.tableController.prototype */ {

  setLinkedSeries: function (graphName, seriesName) {
    console.log('linking table view to graph %@ and series %@'.fmt(graphName, seriesName));
  }
  
}) ;
