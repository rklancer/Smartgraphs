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
  
  firstGraphPaneControls: null,
  secondGraphPaneControls: null,
  
  startControlIsVisible: NO,
  startControlIsEnabled: NO,
  startControlIsDefault: NO,
  
  stopControlIsVisible: NO,
  stopControlIsEnabled: NO,
  stopControlIsDefault: NO,

  clearControlIsVisible: NO,
  clearControlIsEnabled: NO,
  clearControlIsDefault: NO,
  
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
  
  showSensorLoadingView: function (pane) {
    pane = this.validPaneFor(pane);
    var which = this.firstOrSecondFor(pane);
    
    if ( !which ) return NO;
    
    this.hideControls();
    
    this.set(which+'GraphPaneControls', 'Smartgraphs.activityPage.sensorLoadingView');
  },
  
  showControls: function (pane) {
    pane = this.validPaneFor(pane);
    var which = this.firstOrSecondFor(pane);
    
    if ( !which ) return NO;
    
    this.hideControls();
    this.set(which+'GraphPaneControls', 'Smartgraphs.activityPage.graphControlsView');

    return YES;
  },
  
  hideControls: function () {
    this.set('firstGraphPaneControls', null);
    this.set('secondGraphPaneControls', null);
  },
  
  highlightControlsForReadyState: function () {
    this.set('startControlIsVisible',  YES);
    this.set('startControlIsEnabled',  YES);
    this.set('startControlIsDefault',  YES);

    this.set('stopControlIsVisible',  YES);
    this.set('stopControlIsEnabled',  NO);
    this.set('stopControlIsDefault',  NO);

    this.set('clearControlIsVisible',  YES);
    this.set('clearControlIsEnabled',  NO);
    this.set('clearControlIsDefault',  NO);
  },
  
  highlightControlsForRecordingState: function () {
    this.set('startControlIsVisible',  YES);
    this.set('startControlIsEnabled',  NO);
    this.set('startControlIsDefault',  NO);

    this.set('stopControlIsVisible',  YES);
    this.set('stopControlIsEnabled',  YES);
    this.set('stopControlIsDefault',  YES);

    this.set('clearControlIsVisible',  YES);
    this.set('clearControlIsEnabled',  YES);
    this.set('clearControlIsDefault',  NO);
  },
  
  clear: function () {
    this.hideControls();
    
    if (this.get('paneIsSplit')) {
      this.hidePane('top');
      this.hidePane('bottom');
    }
    else {
      this.hidePane('single');
    }
  }

}) ;
