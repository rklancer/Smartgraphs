// ==========================================================================
// Project:   Smartgraphs.responseTemplateController
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
Smartgraphs.responseTemplateController = SC.ObjectController.create(
/** @scope Smartgraphs.responseTemplate.prototype */ {

  contentBinding: 'Smartgraphs.guideStepController.responseTemplate',
  
  contentDidChange: function () {
    this.invokeOnce(this._initializeValues);
  }.observes('content'),
  
  _initializeValues: function () {
    this.set('values', this.get('initialValues').copy());
  }

}) ;
