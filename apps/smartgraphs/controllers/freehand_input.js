// ==========================================================================
// Project:   Smartgraphs.freehandInputController
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
Smartgraphs.freehandInputController = SC.ObjectController.create(
/** @scope Smartgraphs.freehandInputController.prototype */ {
  
  _inputStarted: NO,

  register: function (controller, traceName) {
    // guard against accidentally swapping the input controller during freehand input. Guarantee that a controller
    // will always receive endFreehandInput after receiving startFreehandInput
  
    if (this._inputStarted) return NO;
    
    var trace = controller ? controller.findAnnotationByName(traceName) : NO;
    if (trace && SC.kindOf(trace, Smartgraphs.TraceAnnotation)) {      
      this._graphController = controller;
      this._trace = trace;
      return YES;
    }
    return NO;
  },
  
  startInput: function () {
    if (!this._trace) return NO;

    this._inputStarted = YES;
    this._graphController.startFreehandInput();

    this._graphController.get('eventQueue').addObserver('[]', this, this.graphObserver);
    return YES;
  },
  
  endInput: function () {
    this.graphObserver();
    this._graphController.get('eventQueue').removeObserver('[]', this, this.graphObserver);
    this._graphController.endFreehandInput();
    this._graphController = null;
    this._trace = null;
    this._inputStarted = NO;
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
    this._trace.set('points', []);
  },
  
  continueAt: function (x, y) {
    this._trace.get('points').pushObject({x: x, y: y});
  },
  
  endAt: function (x, y) {
    this._trace.get('points').pushObject({x: x, y: y});
  }

}) ;

Smartgraphs.freehandInputController.START = 1;
Smartgraphs.freehandInputController.CONTINUE = 2;
Smartgraphs.freehandInputController.END = 3;
