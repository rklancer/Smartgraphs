// ==========================================================================
// Project:   Smartgraphs.guideController
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Smartgraphs */

/** @class

  The Guide controller represents the currently open Guide.

  @extends SC.Object
*/

Smartgraphs.guideController = SC.ObjectController.create(
/** @scope Smartgraphs.guideController.prototype */ {
  
  contentDidChange: function () {
    // automatically open the first page when the content is set to a new Guide
    this.invokeLast(this._gotoFirstPageAfterOpening);
  }.observes('.content'),
  
  _gotoFirstPageAfterOpening: function () {
    var firstPage = Smartgraphs.guidePagesController.objectAt(0);
    if (firstPage) {
      firstPage.set('isSelectable', YES);
      Smartgraphs.guidePagesController.selectPageAtIndex(0);
    }
  }
  
}) ;
