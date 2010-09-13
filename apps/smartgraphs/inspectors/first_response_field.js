// ==========================================================================
// Project:   Smartgraphs.FirstResponseFieldInspector
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

sc_require('inspectors/response_fields');

Smartgraphs.FirstResponseFieldInspector = Smartgraphs.ResponseFieldsInspector.extend({
  
  configure: function (config) {
    config.fieldIndex = 0;
    sc_super();
  }
  
});
