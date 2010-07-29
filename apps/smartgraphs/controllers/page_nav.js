// ==========================================================================
// Project:   Smartgraphs.pageNavController
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
Smartgraphs.pageNavController = SC.ArrayController.create(
/** @scope Smartgraphs.pageNavController.prototype */ {
  
  // calculate these properties...
  nextShouldBeEnabled: NO,
  backShouldBeEnabled: NO,
  currentIndex: null,
  visitableIndices: null,
  
  // for now...
  nextShouldBeEnabledBinding: 'Smartgraphs.guideController.canOpenNextPage'
  
}) ;
