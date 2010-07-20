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
    if (this.get('wasVisited') === NO) {
      this.invokeOnce(this._openFirstStepIfUnvisited);
      this.set('wasVisited', YES);
    }    
  }.observes('.content'),
  
  _openFirstStepIfUnvisited: function () {
    Smartgraphs.sendAction('openFirstGuideStep', this);
  }

}) ;
