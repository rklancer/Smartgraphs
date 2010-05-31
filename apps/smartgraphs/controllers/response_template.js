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

  // corresponding views are dynamically created, so instead of binding to a property on the controller, they'll call
  // updateResponse()
  
  updateResponse: function (index, value) {
    var responseArray = this.get('responseArray');
    responseArray.replace(index, 1, [value]);
  },

  contentDidChange: function () {
    var templateString = this.get('templateString');
    
    // TODO:
    // parse template string
    // update fieldValues and fieldTypes accordingly
    
    // for now:
    
    var fieldTypes = [];
    var fieldValues = [];
    var responseArray =[];
    
    // for now:
    if (this.get('content')) {      
      fieldTypes = ['textarea'];
      fieldValues = [''];
      responseArray = [undefined];
    }

    this.beginPropertyChanges();
    this.set('fieldTypes',  fieldTypes);
    this.set('fieldValues', fieldValues);
    this.set('responseArray', responseArray);
    this.endPropertyChanges();

  }.observes('content')
  
}) ;
