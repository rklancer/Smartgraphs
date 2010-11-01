// ==========================================================================
// Project:   Smartgraphs.SessionStep
// Copyright: ©2010 Concord Consortium
// Author:    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Smartgraphs.SessionStep = SC.Record.extend(
/** @scope Smartgraphs.SessionStep.prototype */ {

  values: SC.Record.attr(Array),
  dataset: SC.Record.toOne('Smartgraphs.Dataset')

}) ;
