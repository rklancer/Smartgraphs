// ==========================================================================
// Project:   Smartgraphs.secondGraphController
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document Your Controller Here)

  @extends SC.ObjectController
*/
sc_require('controllers/graph');

Smartgraphs.secondGraphController = Smartgraphs.GraphController.create(
/** @scope Smartgraphs.secondGraphController.prototype */ {
  
  viewPath: 'activityPage.secondGraphView'
}) ;
