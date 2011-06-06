// ==========================================================================
// Project:   Smartgraphs.GraphableObject
// Copyright: ©2011 Concord Consortium
// Author:    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  @extends SC.Object
  @version 0.1
*/
Smartgraphs.GraphableObject = SC.Object.extend(
/** @scope Smartgraphs.GraphableObject.prototype */ {

  // the dataRepresentation this belongs to.
  dataRepresentation: null,
  colorBinding: '*dataRepresentation.color'
  
});
