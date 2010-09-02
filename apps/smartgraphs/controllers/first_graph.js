// ==========================================================================
// Project:   Smartgraphs.firstGraphController
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document Your Controller Here)

  @extends SC.ObjectController
*/
sc_require('controllers/graph');

Smartgraphs.firstGraphController = Smartgraphs.GraphController.create(
/** @scope Smartgraphs.firstGraphController.prototype */ {
  
  viewPath: 'activityPage.firstGraphView'

}) ;
