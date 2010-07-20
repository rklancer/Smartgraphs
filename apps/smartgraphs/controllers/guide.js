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
  
  // automatically open the first page when the content is set to a new Guide
  contentDidChange: function () {
    this.invokeLast(this._gotoFirstPageAfterOpening);     // use invokeLast to let guidePagesController's binding sync.
  }.observes('.content'),
  
  _gotoFirstPageAfterOpening: function () {
    Smartgraphs.sendAction('openFirstGuidePage');
  }
  
}) ;
