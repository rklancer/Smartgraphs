// ==========================================================================
// Project:   Smartgraphs.responseTemplateController
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
Smartgraphs.responseTemplateController = SC.ObjectController.create(
/** @scope Smartgraphs.responseTemplate.prototype */ {

  // // TODO bind values to SessionStep model
  // contentBinding: 'Smartgraphs.activityStepController.responseTemplate',
  
  contentDidChange: function () {
    this.invokeOnce(this._initializeValues);
  }.observes('content'),
  
  _initializeValues: function () {
    var initialValues = this.get('initialValues');
    if (initialValues) this.set('values', initialValues.copy());
  },
  
  editingShouldBeEnabled: NO

}) ;
