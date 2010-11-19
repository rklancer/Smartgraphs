// ==========================================================================
// Project:   Smartgraphs.ACTIVITY_STEP_LOADING
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

sc_require('states/activity');
sc_require('states/mixins/resource_loader');

/** @class
  
  State that represents that the ActivityStep is being loaded. If all ActivitySteps are preloaded when the activity
  loads, then this state can be considered to be the transient 'start' state of the activity step.
  
  @extends SC.Responder
  @extends Smartgraphs.ResourceLoader
  @version 0.1
*/

Smartgraphs.ACTIVITY_STEP_LOADING = SC.Responder.create(Smartgraphs.ResourceLoader,
/** @scope Smartgraphs.ACTIVITY_STEP_LOADING.prototype */ {
  
  nextResponder: Smartgraphs.ACTIVITY,
  
  masterResource: {
    load: function () { return Smartgraphs.activityStepController.get('content'); }
  },
  
  subordinateResources: [],    
  
  didBecomeFirstResponder: function() {
    this.loadResources();
  },
  
  willLoseFirstResponder: function () {
    this.cancelLoading();
  },
  
  resourcesDidLoad: function () {
    Smartgraphs.makeFirstResponder(Smartgraphs.ACTIVITY_STEP);
  },
  
  resourceLoadingError: function () {
    console.error('Error status loading subordinate resource for %s', this.get('masterResource').record.get('id'));
  }
  
  // ..........................................................
  // ACTIONS
  //
  
}) ;
