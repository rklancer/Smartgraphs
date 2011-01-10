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
  
  canGotoNextPage: NO,
  
  /** 
    Whatever needs to be done to clean up state when leaving an activity 
  */
  cleanup: function () {
    Smartgraphs.activityPageController.cleanup();
    Smartgraphs.activityStepController.cleanup();
  },
  
  activityRecordInCurrentStore: function () {
    var content = this.get('content');
    return content ? Smartgraphs.store.find(content) : null;
  }.property(),
  
  /**
    YES if the activity record itself (which including its dependent child records) needs to be saved
  */
  isDirty: function () {
    return !!(this.get('status') & SC.Record.DIRTY);
  }.property('status')
    
}) ;
