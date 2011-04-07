// ==========================================================================
// Project:   Smartgraphs.labelTool
// Copyright: ©2011 Concord Consortium
// Author:    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

sc_require('tools/tool');

/** @class

  @extends SC.Object
*/
Smartgraphs.labelTool = Smartgraphs.Tool.create(
/** @scope Smartgraphs.labelTool.prototype */ {

  name: 'label',
  state: 'LABEL_TOOL'
  
});