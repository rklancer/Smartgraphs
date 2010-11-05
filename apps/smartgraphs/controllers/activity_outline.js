// ==========================================================================
// Project:   Smartgraphs.activityOutlineController
// Copyright: ©2010 Concord Consortium
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
Smartgraphs.activityOutlineController = SC.TreeController.create(
/** @scope Smartgraphs.activityOutlineController.prototype */ {
  
  treeItemIsGrouped: YES,
  
  allowsMultipleSelection: NO,
  allowsEmptySelection: NO,
  contentBinding: SC.Binding.oneWay('Smartgraphs.activityPagesController.outline'),

  /**
    When the activity step changes in the live activity, find the corresponding item in the 'outline' data
    structure, and set our selection to it.
  */
  currentStepBinding: SC.Binding.oneWay('Smartgraphs.activityStepController.content'),
  currentStepDidChange: function () {
    var outline = this.get('content');
    if (!outline) return;
    
    var pages = outline.get('pages');
    if (!pages) return;
    
    var pageContent = Smartgraphs.activityPageController.get('content');
    var page = pageContent && pageContent.firstObject();
    var pageIndex = pages.indexOf(page);
    if (pageIndex < 0) return;
    
    var pageInOutline = outline.get('treeItemChildren').objectAt(pageIndex);
    var step = Smartgraphs.activityStepController.get('content');
    var stepIndex = pageInOutline.get('steps').indexOf(step);
    if (stepIndex < 0) return;

    this.selectObject(pageInOutline.get('treeItemChildren').objectAt(stepIndex));
  }.observes('currentStep')
  
});
