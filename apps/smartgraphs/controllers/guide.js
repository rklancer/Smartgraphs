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
    this.invokeLast(this._gotoFirstPageAfterOpening);     //invokeLast to let bindings sync.
  }.observes('.content'),
  
  // TODO *could* implement this as an action in GUIDE_START
  _gotoFirstPageAfterOpening: function () {
    Smartgraphs.sendAction('openFirstGuidePage');
  }
  
}) ;
