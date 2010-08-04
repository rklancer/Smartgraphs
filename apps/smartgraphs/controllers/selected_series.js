// ==========================================================================
// Project:   Smartgraphs.selectedSeriesController
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
Smartgraphs.selectedSeriesController = SC.ObjectController.create(
/** @scope Smartgraphs.selectedSeriesController.prototype */ {

  // default # bins for prediction graph
  nBins: 50,
  xMin: null,
  xMax: null
}) ;
