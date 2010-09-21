// ==========================================================================
// Project:   Smartgraphs.sensorController
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
Smartgraphs.sensorController = SC.ObjectController.create(
/** @scope Smartgraphs.sensorController.prototype */ {

  sensorIsReady: NO,
  appletIsAppended: NO,
  _inputStarted: NO,
  _pane: null,
  _series: null,
  
  register: function (pane, series) {
    pane = Smartgraphs.activityViewController.validPaneFor(pane);
    
    if (pane && series && series.get('isExample') === NO) {
      this._pane = pane;
      this._series = series;
      return YES;
    }
    return NO;
  },
  
  startInput: function () {
    if (this._inputStarted || !this._pane || !this._series) {
      return NO;
    }
    this._inputStarted = YES;
    
    if ( !this.get('appletIsAppended') ) {
      Smartgraphs.mainPage.get('mainPane').appendChild( Smartgraphs.appletPage.sensorAppletView.create() );
      this.set('appletIsAppended', YES);
    }

    if (this.get('sensorIsReady')) {
      Smartgraphs.activityViewController.showControls(this._pane);
    }
    else {
      Smartgraphs.activityViewController.showSensorLoadingView(this._pane);
    }
    
    return YES;
  },
  
  endInput: function () {
    Smartgraphs.activityViewController.hideControls();
    this._inputStarted = NO;
    this._series = null;
    this._pane = null;
  },
  
  sensorsReady: function () {
    SC.RunLoop.begin();
    this.set('sensorIsReady', YES);

    if (this._inputStarted) {
      Smartgraphs.activityViewController.showControls(this._pane) ;
    }
    SC.RunLoop.end();
  },
  
  sensorDataReceived: function (type, numPoints, data) {
  }

}) ;
