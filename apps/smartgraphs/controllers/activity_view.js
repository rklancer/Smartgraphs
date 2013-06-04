// ==========================================================================
// Project:   Smartgraphs.activityViewController
// Copyright: ©2010 Concord Consortium
// Author:    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  @extends SC.Object
*/
Smartgraphs.activityViewController = SC.Object.create(
/** @scope Smartgraphs.activityViewController.prototype */ {

  dataViewNowShowing: null,
  topPaneNowShowing: null,
  bottomPaneNowShowing: null,
  singlePaneNowShowing: null,

  firstImageValue: null,
  firstImageCaption: null,
  secondImageValue: null,
  secondImageCaption: null,

  paneIsSplit: null,

  // ..........................................................
  // ACTIVITY VIEW BUTTON STATE
  //

  // "input" properties

  canSubmitBinding:              SC.Binding.oneWay('Smartgraphs.activityStepController.canSubmit'),
  isFinalStepBinding:            SC.Binding.oneWay('Smartgraphs.activityStepController.isFinalStep'),
  hideSubmitButtonBinding:       SC.Binding.oneWay('Smartgraphs.activityStepController.hideSubmitButton'),
  nextButtonShouldSubmitBinding: SC.Binding.oneWay('Smartgraphs.activityStepController.nextButtonShouldSubmit'),
  canGotoNextPageBinding:        SC.Binding.oneWay('Smartgraphs.activityController.canGotoNextPage'),
  isFirstPageBinding:            SC.Binding.oneWay('Smartgraphs.activityPagesController.isFirstPage'),
  isLastPageBinding:             SC.Binding.oneWay('Smartgraphs.activityPagesController.isLastPage'),


  // "output" properties

  enableBackAndForward: NO,

  showSubmitButton: function () {
    return !(this.get('hideSubmitButton') || this.get('nextButtonShouldSubmit'));
  }.property('hideSubmitButton', 'nextButtonShouldSubmit').cacheable(),

  enableSubmitButtonBinding: SC.Binding.oneWay('Smartgraphs.activityStepController.canSubmit'),
  showNextPageButtonBinding: SC.Binding.not('Smartgraphs.activityPagesController.isLastPage'),

  highlightNextPageButton: function () {
    return this.get('canGotoNextPage') ||
           (this.get('isFinalStep') && this.get('nextButtonShouldSubmit') && this.get('canSubmit'));
  }.property('canGotoNextPage', 'isFinalStep', 'nextButtonShouldSubmit', 'canSubmit').cacheable(),

  enableNextPageButton: function () {
    return (this.get('enableBackAndForward') && !this.get('isLastPage')) || this.get('highlightNextPageButton');
  }.property('enableBackAndForward', 'isLastPage', 'highlightNextPageButton').cacheable(),

  enableBackPageButton: function () {
    return (this.get('enableBackAndForward') && !this.get('isFirstPage'));
  }.property('enableBackAndForward', 'isFirstPage'),

  // ..........................................................
  // PANE NAME HANDLING
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

  graphControllerForPane: function (pane) {
    pane = this.validPaneFor(pane);
    var which = this.firstOrSecondFor(pane);

    if (which) {
      return Smartgraphs.get(which + 'GraphController');
    }

    return NO;
  },
  
  tableControllerForPane: function (pane) {
    pane = this.validPaneFor(pane);
    var which = this.firstOrSecondFor(pane);

    if (which) {
      return Smartgraphs.get(which + 'TableController');
    }

    return NO;
  },

  // ..........................................................
  // ACTIVITY VIEW COMMANDS
  //

  setPaneConfig: function (paneConfig) {
    if (paneConfig === 'single') {
      this.set('paneIsSplit', false);
      this.set('dataViewNowShowing', 'Smartgraphs.activityPage.singlePaneDataView');
    }
    else if (paneConfig === 'split') {
      this.set('paneIsSplit', true);
      this.set('dataViewNowShowing', 'Smartgraphs.activityPage.splitPaneDataView');
    }
  },

  showImage: function (pane, path, caption) {
    pane = this.validPaneFor(pane);
    var which = this.firstOrSecondFor(pane);

    if ( !which ) return NO;

    this.set(which + 'ImageValue', path);
    this.set(which + 'ImageCaption', caption || null);
    this.set(pane + 'PaneNowShowing', 'Smartgraphs.activityPage.'+which+'ImageView');

    return YES;
  },

  showGraph: function (pane, graphConfig) {
    pane = this.validPaneFor(pane);
    var which = this.firstOrSecondFor(pane);

    if ( !which ) return NO;

    Smartgraphs.get(which+'GraphController').setupGraph(graphConfig);
    this.set(pane+'PaneNowShowing', 'Smartgraphs.activityPage.'+which+'GraphPane');

    return YES;
  },

  showTable: function (pane, tableConfig) {
    pane = this.validPaneFor(pane);

    var which = this.firstOrSecondFor(pane);

    if ( !which ) return NO;

    Smartgraphs.get(which+'TableController').setupTable(tableConfig);
    this.set(pane+'PaneNowShowing', 'Smartgraphs.activityPage.'+which+'TableView');

    return YES;
  },

  hidePane: function (pane) {
    pane = this.validPaneFor(pane);

    if ( !pane ) return NO;

    this.set(pane+'PaneNowShowing', null);

    return YES;
  },

  paneForController: function (controller) {
    if (this.get('paneIsSplit')) {
      if (controller === Smartgraphs.firstGraphController) {
        return 'top';
      }
      else if (controller === Smartgraphs.secondGraphController) {
        return 'bottom';
      }
    }
    else {
      if (controller === Smartgraphs.firstGraphController) {
        return 'single';
      }
    }
    return NO;
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
