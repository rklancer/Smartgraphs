// ==========================================================================
// Project:   Smartgraphs.GUIDE_PAGE_DONE
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  State representing a finished guide page. The user should be able to proceed to the next guide page from here.

  @extends SC.Responder
  @version 0.1
*/
Smartgraphs.GUIDE_PAGE_DONE = SC.Responder.create(
/** @scope Smartgraphs.GUIDE_PAGE_DONE.prototype */ {

  nextResponder: Smartgraphs.GUIDE,
  
  didBecomeFirstResponder: function() {
    if (Smartgraphs.guideController.get('isLastPage')) {
      Smartgraphs.makeFirstResponder(Smartgraphs.GUIDE_DONE);
    }
    else {
      Smartgraphs.guideController.set('canOpenNextPage', YES);
    }
  },
  
  willLoseFirstResponder: function() {
    Smartgraphs.guideController.set('canOpenNextPage', NO);
  },
  
  // ..........................................................
  // ACTIONS
  //

  openNextGuidePage: function () {
    Smartgraphs.guideController.openNextPage();
  }
  
}) ;
