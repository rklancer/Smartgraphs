// ==========================================================================
// Project:   Smartgraphs.StaticAnnotation
// Copyright: ©2010 Concord Consortium
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
  
  // a string specifying an annotation command (HighlightRegion)
  type: SC.Record.attr(String),
  
  // a string that can be eval'ed (?) to generate an argument list for the annotation command.
  args: SC.Record.attr(String)
  
}) ;
