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
    this.notifyPropertyChange('responseArray');
  },

  contentDidChange: function () {
    if (!this.get('content')) return;     // nothing to do.

    var templateString = this.get('templateString');
    
    // TODO:
    // parse template string
    // update fieldValues and fieldTypes accordingly
    // use FlowLayout from quilmes?
    
    // for now:
    
    this.beginPropertyChanges();
    this.set('fieldTypes',  ['(a textarea)']);
    this.set('fieldValues', ['']);
    this.set('responseArray', [undefined]);
    this.endPropertyChanges();
  }.observes('content')
  
}) ;
