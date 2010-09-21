// ==========================================================================
// Project:   Smartgraphs.activityViewController
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
Smartgraphs.activityViewController = SC.ObjectController.create(
/** @scope Smartgraphs.activityViewController.prototype */ {

  dataViewNowShowing: null,
  topPaneNowShowing: null,
  bottomPaneNowShowing: null,
  singlePaneNowShowing: null,

  firstImageValue: null,
  secondImageValue: null,
  
  paneIsSplit: null,
  
  // ..........................................................
  // ACTIVITY VIEW BUTTON STATE
  //
  
  canGotoNextPage: null,
  canGotoNextPageBinding: 'Smartgraphs.activityController.canGotoNextPage',
  canSubmit: null,
  canSubmitBinding: 'Smartgraphs.activityStepController.canSubmit',
  isFinalStep: null,
  isFinalStepBinding: 'Smartgraphs.activityStepController.isFinalStep',
  hideSubmitButton: null,
  hideSubmitButtonBinding: 'Smartgraphs.activityStepController.hideSubmitButton',
  nextButtonShouldSubmit: null,
  nextButtonShouldSubmitBinding: 'Smartgraphs.activityStepController.nextButtonShouldSubmit',
  
  showSubmitButton: function () {
    return !(this.get('hideSubmitButton') || this.get('nextButtonShouldSubmit'));
  }.property('hideSubmitButton', 'nextButtonShouldSubmit').cacheable(),
    
  enableSubmitButton: null,
  enableSubmitButtonBinding: 'Smartgraphs.activityStepController.canSubmit',
    
  showNextPageButton: null,
  showNextPageButtonBinding: SC.Binding.not('Smartgraphs.activityPagesController.isLastPage'),
    
  enableNextPageButton: function () {
    return this.get('canGotoNextPage') || (this.get('isFinalStep') && this.get('nextButtonShouldSubmit') && this.get('canSubmit'));
  }.property('canGotoNextPage', 'isFinalStep', 'nextButtonShouldSubmit', 'canSubmit').cacheable(),
  
  
  // ..........................................................
  // ACTIVITY VIEW COMMANDS
  //
  firstOrSecondFor: function (pane) {
    var split = this.get('paneIsSplit');
    
    if ( (!split && pane === 'single') || (split && pane === 'top') ) {
      return 'first';
    }
    if ( split && pane === 'bottom' ) {
      return 'second';
    }
    return NO;
  },
  
  validPaneFor: function (pane) {
    var split = this.get('paneIsSplit');
    
    if ( (!split && pane === 'single') || (split && (pane === 'top' || pane === 'bottom')) ) {
      return pane;
    }
    else {
      console.error('invalid pane "' + pane + '"');
      return NO;
    }
  },
  
  otherPaneFor: function (pane) {
    pane = this.validPaneFor(pane);
    
    if (pane === 'bottom') return 'top';
    if (pane === 'top') return 'bottom';
    
    return NO;
  },
  
  showSinglePane: function () {
    this.set('paneIsSplit', false);
    this.set('dataViewNowShowing', 'Smartgraphs.activityPage.singlePaneDataView');
  },
  
  showSplitPane: function () {
    this.set('paneIsSplit', true);
    this.set('dataViewNowShowing', 'Smartgraphs.activityPage.splitPaneDataView');    
  },

  showImage: function (pane, path) {
    pane = this.validPaneFor(pane);
    var which = this.firstOrSecondFor(pane);
    
    if ( !which ) return NO;
    
    this.set(which + 'ImageValue', path);
    this.set(pane + 'PaneNowShowing', 'Smartgraphs.activityPage.'+which+'ImageView');
    
    return YES;
  },
  
  showGraph: function (pane, graphId) {
    pane = this.validPaneFor(pane);
    var which = this.firstOrSecondFor(pane);
    
    if ( !which ) return NO;
    
    Smartgraphs.get(which+'GraphController').openGraph(graphId);
    this.set(pane+'PaneNowShowing', 'Smartgraphs.activityPage.'+which+'GraphPane');
  
    return YES;
  },
  
  hidePane: function (pane) {
    pane = this.validPaneFor(pane);
    
    if ( !pane ) return NO;
    
    this.set(pane+'PaneNowShowing', null);
  },
  
  showControls: function (pane) {
    pane = this.validPaneFor(pane);
    var which = this.firstOrSecondFor(pane);
    
    if ( !which ) return NO;
    
    var graphPane = Smartgraphs.activityPage.get(which+'GraphPane');
    
    graphPane.graphView.adjust('bottom', 35);
    graphPane.controlsContainer.adjust('height', 35);
    
    var otherPane = this.otherPaneFor(pane);
    if (otherPane) this.hideControls(otherPane);
    
    graphPane.controlsContainer.set('nowShowing', 'Smartgraphs.activityPage.graphControlsView');

    return YES;
  },
  
  hideControls: function (pane) {
    pane = this.validPaneFor(pane);
    var which = this.firstOrSecondFor(pane);
    
    if ( !which ) return NO;
    
    var graphPane = Smartgraphs.activityPage.get(which+'GraphPane');
    
    graphPane.controlsContainer.set('nowShowing', null);
    graphPane.controlsContainer.adjust('height', 0);
    graphPane.graphView.adjust('bottom', 0);
  },
  
  clear: function () {
    if (this.get('paneIsSplit')) {
      this.hidePane('top');
      this.hidePane('bottom');
    }
    else {
      this.hidePane('single');
    }
  }

}) ;
