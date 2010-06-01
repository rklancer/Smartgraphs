// ==========================================================================
// Project:   Smartgraphs.responseTemplateController
// Copyright: ©2010 Concord Consortium
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/

Smartgraphs.responseTemplateController = SC.ObjectController.create(
/** @scope Smartgraphs.responseTemplateController.prototype */ {
  
  contentBinding: 'Smartgraphs.dialogTurnController.responseTemplate',

  // after parse, the controller sets these fields to correspond the the type of fields that need to be shown.
  // (some fields may be label fields)
  // for now, every ResponseTemplate will have the same values

  fieldTypes: null,
  fieldValues: null,
  responseArray: null,
  
  contentDidChange: function () {
    console.log('responseTemplateController observed content');
    this.invokeOnce(this._parseTemplateString);
  }.observes('content'),

  _parseTemplateString: function () {
    console.log('_parseTemplateString');
    var templateString = this.get('templateString');
    
    if (templateString) {
      this.set('fieldTypes', ['(a textarea)']);
      this.set('fieldValues', ['']);
      this.set('responseArray', [undefined]);
    }
    else {
      this.set('fieldTypes', null);
      this.set('fieldValues', null);
      this.set('responseArray', null);
    }
  },

  // an unknown number of fields will be generated, so instead of creating a dynamically expanding and contracting list
  // of properties which can be bound, we'll accept a simple 'updateResponse' message from the field with index 'index'
  
  updateResponse: function (index, value) {
    var responseArray = this.get('responseArray');
    responseArray.replace(index, 1, [value]);
  }
}) ;
