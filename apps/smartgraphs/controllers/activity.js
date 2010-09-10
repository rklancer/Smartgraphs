// ==========================================================================
// Project:   Smartgraphs.activityController
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  The Activity controller represents the currently open Activity.

  @extends SC.Object
*/
Smartgraphs.activityController = SC.ObjectController.create(
/** @scope Smartgraphs.activityController.prototype */ {
  
  // return the context variable's value from the activity context
  lookup: function (key) {
    var context = this.get('context');
    return (context.hasOwnProperty(key) ? context[key] : undefined);
  },
  
  /** Whatever needs to be done to clean up state when leaving an activity */
  cleanup: function () {
    Smartgraphs.activityPageController.cleanup();
    Smartgraphs.activityStepController.cleanup();
  },
  
  // let buttons know.
  canOpenNextPage: NO
    
}) ;
