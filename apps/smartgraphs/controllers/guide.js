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
    var content = this.get('content');
    console.log('new guideController content: ' + (content || 'null'));
  }.observes('.content')
  
}) ;
