// ==========================================================================
// Project:   Smartgraphs.guidePageController
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
Smartgraphs.guidePageController = SC.ObjectController.create(
/** @scope Smartgraphs.guidePageController.prototype */ {

  contentBinding: 'Smartgraphs.guidePagesController.selection',
  
  contentDidChange: function () {
    if (this.get('currentStep') === null) {
      this.invokeOnce(this._openFirstStepIfUnvisited);
    }
  }.observes('.content'),
  
  _openFirstStepIfUnvisited: function () {
    Smartgraphs.sendAction('openFirstGuideStep', this);
  }

}) ;
