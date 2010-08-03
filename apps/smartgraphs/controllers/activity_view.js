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
  firstPaneNowShowing: null,
  secondPaneNowShowing: null,
  firstImageValue: null,
  secondImageValue: null,
  
  showSinglePane: function () {
    this.set('dataViewNowShowing', 'Smartgraphs.activityPage.singlePaneDataView');
  },
  
  showSplitPane: function () {
    this.set('dataViewNowShowing', 'Smartgraphs.activityPage.splitPaneDataView');    
  },
  
  showImage: function (pane, path) {
    if (pane === 'first') {
      this.set('firstImageValue', path);
      this.set('firstPaneNowShowing', 'Smartgraphs.activityPage.firstImageView');
      return YES;
    }
    
    if (pane === 'second') {
      this.set('secondImageValue', path);
      this.set('secondPaneNowShowing', 'Smartgraphs.activityPage.secondImageView');
      return YES;
    }
    
    return NO;
  },
  
  showGraph: function (pane, graphId) {
    if (pane === 'first') {
      Smartgraphs.firstGraphController.openGraph(graphId);
      this.set('firstPaneNowShowing', 'Smartgraphs.activityPage.firstGraphView');
      return YES;
    }
    
    if (pane === 'second') {
      Smartgraphs.secondGraphController.openGraph(graphId);      
      this.set('secondPaneNowShowing', 'Smartgraphs.activityPage.secondGraphView');
      return YES;
    }
    
    return NO;
  },
  
  hidePane: function (pane) {
    if (pane === 'first') {
      this.set('firstPaneNowShowing', null);
      return YES;
    }
    
    if (pane === 'second') {  
      this.set('secondPaneNowShowing', null);
      return YES;
    }
    
    return NO;
  },
  
  // for graphViewController
  createSeriesView: function (series) {    
  },
  
  removeSeriesView: function (series) {
  }

}) ;
