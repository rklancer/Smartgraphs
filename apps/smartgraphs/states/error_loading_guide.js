// ==========================================================================
// Project:   Smartgraphs.ERROR_LOADING_GUIDE
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  State representing that we attempted to load a Guide but encountered an error. Trivial implementation for now.

  @extends SC.Responder
  @version 0.1
*/

sc_require('states/ready');

Smartgraphs.ERROR_LOADING_GUIDE = SC.Responder.create(
/** @scope Smartgraphs.LOADING_GUIDE.prototype */ {

  nextResponder: Smartgraphs.READY,

  didBecomeFirstResponder: function() {    
    Smartgraphs.appWindowController.showGuideLoadingErrorView();
  },
  
  willLoseFirstResponder: function() {
  }
  
  // ..........................................................
  // ACTIONS
  //
  
}) ;
