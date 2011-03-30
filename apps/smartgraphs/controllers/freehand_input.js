// ==========================================================================
// Project:   Smartgraphs.freehandInputController
// Copyright: ©2010 Concord Consortium
// Author:    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
Smartgraphs.freehandInputController = SC.Object.create(
/** @scope Smartgraphs.freehandInputController.prototype */ {
  
  _inputIsEnabled: NO,
  _isRecording: NO,
  
  pane: function () {
    return Smartgraphs.activityViewController.paneForController(this._graphController);
  }.property(),

  register: function (controller, sketchName) {
    // guard against accidentally swapping the input controller during freehand input. Guarantee that a controller
    // will always receive endFreehandInput after receiving startFreehandInput
  
    if (this._inputIsEnabled) return NO;
    
    var annotation = controller ? controller.findAnnotationByName(sketchName) : NO;
    if (annotation && SC.kindOf(annotation, Smartgraphs.FreehandSketch)) {      
      this._graphController = controller;
      this._sketch = annotation;
      return YES;
    }
    return NO;
  },
  
  enableInput: function () {
    if (!this._sketch) return NO;

    this._inputIsEnabled = YES;
    this._graphController.startFreehandInput();

    this._graphController.get('eventQueue').addObserver('[]', this, this.graphObserver);
    return YES;
  },
  
  disableInput: function () {
    this.graphObserver();
    this._graphController.get('eventQueue').removeObserver('[]', this, this.graphObserver);
    this._graphController.endFreehandInput();
    this._graphController = null;
    this._sketch = null;
    this._inputIsEnabled = NO;
    this._pane = null;
    this._isRecording = NO;
  },
  
  graphObserver: function () {
    var strokeEvt, 
        queue = this._graphController.get('eventQueue');

    while ((strokeEvt = queue.shiftObject())) {
      switch (strokeEvt.type) {
        case this.CONTINUE:
          this.continueAt(strokeEvt.x, strokeEvt.y);
          break;
        case this.START:
          this.startAt(strokeEvt.x, strokeEvt.y);
          break;
        case this.END:
          this.endAt(strokeEvt.x, strokeEvt.y);
          break;
      }
    }
  },
  
  startAt: function (x, y) {
    if (this._isRecording && this._inputIsEnabled && !this._sketch.getPath('points.length')) {
      this._sketch.set('points', [{x: x, y: y}]);
    }
  },
  
  continueAt: function (x, y) {
    if (this._isRecording && this._inputIsEnabled) {    
      this._sketch.get('points').pushObject({x: x, y: y});
    }
  },
  
  endAt: function (x, y) {
    if (this._isRecording && this._inputIsEnabled) {
      this._sketch.get('points').pushObject({x: x, y: y});
      Smartgraphs.statechart.sendAction('freehandSketchCompleted');
    }
  },
  
  startRecording: function () {
    this._isRecording = YES;
  },
  
  stopRecording: function () {
    this._isRecording = NO;
  },
  
  clearSketch: function () {
    if ( !this._isRecording && this._inputIsEnabled ) {
      this._sketch.set('points', []);
    }
  }

}) ;

Smartgraphs.freehandInputController.START = 1;
Smartgraphs.freehandInputController.CONTINUE = 2;
Smartgraphs.freehandInputController.END = 3;
