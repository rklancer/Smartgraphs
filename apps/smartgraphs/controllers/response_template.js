// ==========================================================================
// Project:   Smartgraphs.responseTemplateController
// Copyright: ©2010 Concord Consortium
// Author:    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
Smartgraphs.responseTemplateController = SC.ObjectController.create(
/** @scope Smartgraphs.responseTemplate.prototype */ {

  editingShouldBeEnabled: NO,
  viewShouldReset: NO,

  setTemplate: function (newTemplate) {
    this.set('content', newTemplate);

    var initialValues = this.get('initialValues');
    if (initialValues) this.set('values', initialValues.copy());
    this.set('viewShouldReset', YES);   // any bound view will unset this
  }

}) ;
