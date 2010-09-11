// ==========================================================================
// Project:   Smartgraphs.ResponseFieldsInspector
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

sc_require('inspectors/inspector');

Smartgraphs.ResponseFieldsInspector = Smartgraphs.Inspector.extend({
  
  value: null,
  fieldIndex: null,
  
  configure: function (args) {
    this.set('fieldIndex', args.fieldIndex);
  },
  
  inspect: function () {
    var value = Smartgraphs.responseTemplateController.get('values');

    // FIXME error check the fieldIndex value!
    var fieldIndex = this.get('fieldIndex');
    if (fieldIndex) value = value[fieldIndex];
    this.set('value', value);
    
    console.log('value changed to: ' + value);
    return value;
  },
  
  watch: function () {
    Smartgraphs.responseTemplateController.addObserver('values.[]', this, this.inspect);
  },
  
  stopWatching: function () {
    Smartgraphs.responseTemplateController.removeObserver('values.[]', this, this.inspect);
  }
  
});