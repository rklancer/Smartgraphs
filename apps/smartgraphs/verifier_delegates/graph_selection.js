// ==========================================================================
// Project:   Smartgraphs.GraphSelectionVerifierDelegate
// Copyright: ©2010 Concord Consortium
// ==========================================================================
/*globals Smartgraphs */

sc_require('verifier_delegates/verifier_delegate');

Smartgraphs.GraphSelectionVerifierDelegate = Smartgraphs.VerifierDelegate.extend({

  checkResponse: function () {
    // note that we'll need to find some way to tell the delegate *which* dataseries to observe

    if (this.get('responseIsIncomplete')) return;
    if (this.get('responseIsMalformed')) return;

    var expectedXValue;
    var configString = this.get('configString');

    // for now configString just specifies x-value

    if (configString.indexOf('x:') === 0) {
      expectedXValue = parseFloat(configString.substring(2));
    }
    else {
      throw "GraphSelectionVerifierDelegate received a configString that didn't start with 'x:'";
    }

    var selectedPoint = this.get('selectedPoint');
    
    //  this could be a computed property
    this.set('responseAsString', 'the point (' + selectedPoint.get('x') + ', ' + selectedPoint.get('y') + ')');
    
    this.set('responseIsMalformed', NO);
    var responseXValue = selectedPoint.get('x');
    
    this.set('responseIsCorrect', responseXValue === expectedXValue);     
  },

  // note you can't have a Binding object here, because each object created from this class needs its own Binding object
  graphSelectionBinding: 'Smartgraphs.dataSeriesController.selection',

  responseIsReady: function () {
    var selection = this.get('graphSelection');
    var ret = (!!selection && selection.get('length') === 1);
    console.log('calculating responseIsReady: ' + ret);
    return ret;
  }.property('graphSelection').cacheable(),
    
  responseIsIncomplete: function () {
    var ret = !this.get('responseIsReady');
    console.log('calculating responseIsIncomplete: ' + ret);
    return ret;
  }.property('graphSelection').cacheable(),
  
  responseIsMalformed: function () {
    var selection = this.get('graphSelection');
    var ret = (selection && selection.get('length') > 1);
    console.log('calculating responseIsMalformed: ' + ret);
    return ret;
  }.property('graphSelection').cacheable(),
  
  selectedPoint: function () {
    var selection = this.get('graphSelection');
    var ret = ((selection && selection.get('length') === 1) ? selection.toArray().objectAt(0) : undefined);
    console.log('calculating selectedPoint: ');
    console.log(ret);
    return ret;
  }.property('graphSelection').cacheable()
});
