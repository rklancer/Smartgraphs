// ==========================================================================
// Project:   Smartgraphs.GraphSelectionVerifierDelegate
// Copyright: ©2010 Concord Consortium
// ==========================================================================
/*globals Smartgraphs */

sc_require('verifier_delegates/verifier_delegate');

Smartgraphs.GraphSelectionVerifierDelegate = Smartgraphs.VerifierDelegate.create({

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

  graphSelectionBinding: SC.Binding.oneWay('Smartgraphs.dataSeriesController.selection'),

  responseIsReady: function () {
    var selection = this.get('graphSelection');
    return (!!selection && selection.get('length') === 1);
  }.property('graphSelection').cacheable(),
    
  responseIsIncomplete: function () {
    return !this.get('responseIsReady');
  }.property('responseIsReady').cacheable(),
  
  responseIsMalformed: function () {
    var selection = this.get('graphSelection');
    return (selection && selection.get('length') > 1);
  }.property('graphSelection').cacheable(),
  
  selectedPoint: function () {
    var selection = this.get('graphSelection');
    return ((selection && selection.get('length') === 1) ? selection.toArray().objectAt(0) : undefined);
  }.property('graphSelection').cacheable()
});
