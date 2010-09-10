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
  
  showSinglePane: function () {
    this.set('paneIsSplit', false);
    this.set('dataViewNowShowing', 'Smartgraphs.activityPage.singlePaneDataView');
  },
  
  showSplitPane: function () {
    this.set('paneIsSplit', true);
    this.set('dataViewNowShowing', 'Smartgraphs.activityPage.splitPaneDataView');    
  },

  showImage: function (pane, path) {
    // tolerate a bit of redundancy to make clear what we're doing here
    if (this.get('paneIsSplit')) {
      if (pane === 'top') {
        this.set('firstImageValue', path);
        this.set('topPaneNowShowing', 'Smartgraphs.activityPage.firstImageView');
        return YES;
      }
    
      if (pane === 'bottom') {
        this.set('secondImageValue', path);
        this.set('bottomPaneNowShowing', 'Smartgraphs.activityPage.secondImageView');
        return YES;
      }
    }
    else {
      this.set('firstImageValue', path);
      this.set('singlePaneNowShowing', 'Smartgraphs.activityPage.firstImageView');
      return YES;
    }
    
    return NO;
  },
  
  showGraph: function (pane, graphId) {
    if (this.get('paneIsSplit')) { 
      if (pane === 'top') {
        Smartgraphs.firstGraphController.openGraph(graphId);
        this.set('topPaneNowShowing', 'Smartgraphs.activityPage.firstGraphView');
        return YES;
      }
    
      if (pane === 'bottom') {
        Smartgraphs.secondGraphController.openGraph(graphId);      
        this.set('bottomPaneNowShowing', 'Smartgraphs.activityPage.secondGraphView');
        return YES;
      }
    }
    else {
      Smartgraphs.firstGraphController.openGraph(graphId);
      this.set('singlePaneNowShowing', 'Smartgraphs.activityPage.firstGraphView');
      return YES;
    }
    
    return NO;
  },
  
  hidePane: function (pane) {
    if (this.get('paneIsSplit')) { 
      if (pane === 'top') {
        this.set('topPaneNowShowing', null);
        return YES;
      }
    
      if (pane === 'bottom') {  
        this.set('bottomPaneNowShowing', null);
        return YES;
      }
    }
    else {
      this.set('singlePaneNowShowing', null);
      return YES;
    }
    return NO;
  },
  
  clear: function () {
    if (!this.hidePane()) {
      this.hidePane('top');
      this.hidePane('bottom');
    }
  }

}) ;
