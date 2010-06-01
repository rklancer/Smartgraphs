// ==========================================================================
// Project:   Smartgraphs.StaticAnnotationList
// Copyright: ©2010 Concord Consortium
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Smartgraphs.StaticAnnotationList = SC.Record.extend(
/** @scope Smartgraphs.StaticAnnotationList.prototype */ {

  annotations: SC.Record.toMany('Smartgraphs.StaticAnnotation', {
    inverse: 'list'
  })

}) ;
