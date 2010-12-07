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
  
  treeItemIsGrouped: function () {
    return !this.get('shouldSelectPageInOutline');
  }.property('shouldSelectPageInOutline').cacheable(),
  
  allowsMultipleSelection: NO,
  allowsEmptySelection: NO,
  contentBinding: SC.Binding.oneWay('Smartgraphs.activityPagesController.outline'),
  
  isSelectable: NO,

  // (temporary) whether to highlight the current step or the current page
  shouldSelectPageInOutline: NO,

  /**
    When the activity step changes in the live activity, find the corresponding item in the 'outline' data
    structure, and set our selection to it.
  */
  currentStepBinding: SC.Binding.oneWay('Smartgraphs.activityStepController.content'),
  currentPageBinding: SC.Binding.oneWay('Smartgraphs.activityPageController.content'),  
  updateSelection: function () {
    var outline = this.get('content');
    if (!outline) return;
    
    var pages = outline.get('pages');
    if (!pages) return;
    
    var page = Smartgraphs.activityPageController.get('content');
    var pageIndex = pages.indexOf(page);
    if (pageIndex < 0) return;
    
    var pageInOutline = outline.get('treeItemChildren').objectAt(pageIndex);
    
    if (this.get('shouldSelectPageInOutline')) {
      this.selectObject(pageInOutline);
    }
    else {      
      var step = Smartgraphs.activityStepController.get('content');
      var stepIndex = pageInOutline.get('steps').indexOf(step);
      if (stepIndex < 0) return;
  
      this.selectObject(pageInOutline.get('treeItemChildren').objectAt(stepIndex));
    }
  }.observes('currentStep', 'currentPage'),
  
  selectionDidChange: function () {
    // only allow selection of pages for now.
    var selectedObject = this.get('selection').firstObject();
    var page = selectedObject ? selectedObject.get('page') : null;
    if (page) Smartgraphs.activityPageController.set('content', page);
  }.observes('selection')
  
});
