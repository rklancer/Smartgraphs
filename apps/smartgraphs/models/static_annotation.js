// ==========================================================================
// Project:   Smartgraphs.StaticAnnotation
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Smartgraphs.StaticAnnotation = SC.Record.extend(
/** @scope Smartgraphs.StaticAnnotation.prototype */ {
  
  list: SC.Record.toOne('Smartgraphs.StaticAnnotationList', {
    inverse: 'annotations'
  }),
  
  type: SC.Record.attr(String),
  
  args: SC.Record.attr(String)
  
}) ;
