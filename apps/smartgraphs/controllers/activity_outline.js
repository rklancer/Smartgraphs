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

  allowsMultipleSelection: NO,
  allowsEmptySelection: YES,
  contentBinding: SC.Binding.oneWay('Smartgraphs.activityPagesController.outline'),

  // default is that selection is not allowed when running an activity; this is overridden to YES in the AUTHOR state
  isSelectable: NO,

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

    var step = Smartgraphs.activityStepController.get('content');
    var stepIndex = pageInOutline.get('steps').indexOf(step);
    if (stepIndex < 0) return;

    this.selectObject(pageInOutline.get('treeItemChildren').objectAt(stepIndex));
  }.observes('currentStep', 'currentPage'),

  selectionDidChange: function () {
    var selectedObject = this.get('selection').firstObject(),
        step = selectedObject && selectedObject.get('step'),
        page = selectedObject && selectedObject.get('page');

    if (page) {
      Smartgraphs.activityPageController.set('content', page);
      Smartgraphs.activityStepController.set('content', null);
      Smartgraphs.statechart.sendAction('outlineControllerDidNavigate');
    }
    else if (step) {
      Smartgraphs.activityPageController.set('content', step.get('activityPage'));
      Smartgraphs.activityStepController.set('content', step);
      Smartgraphs.statechart.sendAction('outlineControllerDidNavigate');
    }
  }.observes('selection')

});
